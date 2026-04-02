import requests

data = {
    "text": "Passionate Computer Science student with a strong foundation in Python and React-based frontend development. I have hands-on experience building responsive interfaces using Tailwind CSS and managing source code with Git/GitHub. I am highly familiar with fundamental Data Structures and Algorithms. Currently, I am eager to expand my technical stack into Cloud Infrastructure (AWS/Azure) and DevOps (Docker/Kubernetes) to build and deploy scalable, production-ready AI applications."
}

try:
    response = requests.post("http://localhost:8000/api/v1/analyze/text", json=data)
    print("ROADMAP:", response.json().get("roadmap"))
except Exception as e:
    print("ERROR:", e)
