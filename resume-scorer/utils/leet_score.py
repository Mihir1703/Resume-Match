import requests


def get_leetcode_score(username):
    """
    Retrieve LeetCode user's score using official API.
    Returns user's score or None if user is not found.
    """
    url = f"https://leetcode.com/graphql"

    query = """
    query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
  }
}

    """

    variables = {
        "username": username
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(
        url, json={"query": query, "variables": variables}, headers=headers)
    # print(response.json())
    if response.status_code == 200:
        # User found, extract score from API response
        data = response.json()[
            "data"]["matchedUser"]["submitStats"]['acSubmissionNum'][1:]
        score = 0
        for idx, i in enumerate(data):
            score += i['count'] * 10 * (1 + idx)
            score += (i['submissions']-i['count']) * 1 * (1 + idx)
        return score
    else:
        # User not found
        return 0
