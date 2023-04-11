import requests
import json

def get_gh_score(github_url):
    response = requests.get(f"https://api.github.com/users/{github_url}")

    # Convert the response content to JSON format
    json_response = json.loads(response.content)

    # Retrieve the relevant parameters from the JSON response
    num_repos = json_response['public_repos']
    num_followers = json_response['followers']
    num_stars = 0

    # Retrieve the number of stars from each repository owned by the user or organization
    repos = json.loads(requests.get(f"https://api.github.com/users/{github_url}/repos").content)
    for repo in repos:
        num_stars += repo['stargazers_count']

    # Calculate the score based on the parameters
    score = num_repos * 10 + num_followers * 5 + num_stars
    score = 100 * score/(1000+1000+10000)
    return score