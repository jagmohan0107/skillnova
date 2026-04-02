import requests
import json
import sys

try:
    resp = requests.post('http://127.0.0.1:8000/api/generate-quiz', json={'subject':'Python', 'difficulty':'Hard'})
    with open("test_api_out.json", "w") as f:
        f.write(resp.text)
    print("Done")
except Exception as e:
    print(e)
