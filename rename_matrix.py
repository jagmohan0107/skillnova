import re

with open("ai_backend/main.py", "r", encoding="utf-8") as f:
    text = f.read()

replacements = {
    '"Production Scaling (Cloud)"': '"Cloud Computing Fundamentals"',
    '"App Architecture (System Design)"': '"Software Architecture Basics"',
    '"Reliable Software Testing (TDD)"': '"Software Testing (QA)"',
    '"Modern Project Workflow (Agile)"': '"Agile Project Management"',
    '"Collaborative Development (Git/GitHub)"': '"Version Control (Git & GitHub)"',
    '"API Architecture (REST)"': '"REST API Development"',
    '"Container Orchestration (Kubernetes)"': '"Docker Containerization"',
    '"Advanced Microservices Architecture"': '"Backend FrameWorks & Routing"',
    '"Zero Trust Security"': '"Cybersecurity Fundamentals"',
    '"Service Mesh"': '"Microservices Basics"'
}

for k, v in replacements.items():
    text = text.replace(k, v)

with open("ai_backend/main.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated lexicons.")
