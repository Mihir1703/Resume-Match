import requests
import json


def cf_score(username):
    response = requests.get(
        f"https://codeforces.com/api/user.info?handles={username}")
    json_response = json.loads(response.content)
    # Retrieve the relevant parameters from the JSON response
    max_rating = json_response['result'][0]['maxRating']
    json_response = json.loads(requests.get(
        f"https://codeforces.com/api/user.rating?handle={username}").content)
    contest_count = len(json_response['result'])
    json_response = json.loads(requests.get(
        f"https://codeforces.com/api/user.status?handle={username}").content)

    submission_count = len(json_response['result'])

    # Calculate the score based on the parameters
    score = max_rating * 2 + contest_count * 10 + submission_count * 0.5
    score = 100 * score/(6000+1000+10000)
    return score
