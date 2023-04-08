import PyPDF2
import pdfplumber
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from utils.cf_score import cf_score
from utils.gh_score import get_gh_score
from utils.leet_score import get_leetcode_score
import os
import sys


def find_score(cv, req):
    CV_File = open(cv, 'rb')
    CV_FileReader = PyPDF2.PdfReader(CV_File)
    len_cv = len(CV_FileReader.pages)

    cv_script = []
    with pdfplumber.open(cv) as pdf:
        for i in range(len_cv):
            page = pdf.pages[i]
            text = page.extract_text()
            cv_script.append(text)

    cv_clear = ''.join(cv_script)
    cv_clear = cv_clear.lower()
    cv_clear = cv_clear.replace('\n', '')

    req_script = open(req,'r').read().split(' ')

    req_clear = ''.join(req_script)
    req_clear = req_clear.lower()
    req_clear = req_clear.replace('\n', '')

    Match_Test = [cv_clear, req_clear]

    cv = CountVectorizer()
    count_matrix = cv.fit_transform(Match_Test)

    MatchPercentage = cosine_similarity(count_matrix)[0][1]*100
    MatchPercentage = round(MatchPercentage, 2)
    return float(MatchPercentage)*100

def final_score(cv, req, github, cf, leetcode):
    score = 0
    try:
        score += find_score(cv, req)
    except Exception as e:
        print(e.with_traceback())
        pass
    try:
        score += get_gh_score(github)*0.4
    except:
        pass
    try:
        score += cf_score(cf)*0.35
    except:
        pass
    try:
        score += get_leetcode_score(leetcode)*0.3
    except:
        pass
    return score


# from flask import Flask, request

# app = Flask(__name__)


# @app.route('/')
# def index():
#     return "Hello World"

# @app.route('/upload', methods=['POST'])
# def upload():
#     file1 = request.files['description']
#     file2 = request.files['cv']
#     gh = request.form['github']
#     cf = request.form['codeforces']
#     lc = request.form['leetcode']

#     if not os.path.exists('uploads'):
#         os.makedirs('uploads')

#     # Save files to uploads folder if they exist delete them

#     file1.save(os.path.join('uploads', file1.filename))
#     file2.save(os.path.join('uploads', file2.filename))

#     # Do something with the files and variables here
#     os.remove(os.path.join('uploads', file1.filename))
#     os.remove(os.path.join('uploads', file2.filename))
#     return str(final_score(file1.filename, file2.filename, gh, cf, lc))

if __name__ == "__main__":
    # app.run(host='0.0.0.0', port=5000, debug=True)
    args = sys.argv
    des_path = args[1]
    cv_path = args[2]
    gh = args[3]
    cf = args[4]
    lc = args[5]
    print(final_score(cv_path, des_path, gh, cf, lc))
