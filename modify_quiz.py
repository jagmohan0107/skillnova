import re
import json

with open("ai_backend/main.py", "r", encoding="utf-8") as f:
    text = f.read()

# Add a function to utilize Gemini
gemini_func = """async def synthesize_ai_mission(subject, difficulty):
    if not model:
        return None
    
    prompt = f\"\"\"You are the SkillNova AI Quiz Engine. Generate a set of 5 multiple-choice questions for the subject: {subject}.
DifficultyLevel: {difficulty}
Instruction: Ensure the following:
- Exactly 5 questions
- Exactly 4 options per question
- Exact string matching for the answer with one of the options
- Do not include old microservices content. Ensure questions differ based on DifficultyLevel.
Return strictly valid JSON format:
{{
  "questions": [
    {{
      "question": "question text",
      "options": ["opt1", "opt2", "opt3", "opt4"],
      "answer": "opt1",
      "explanation": "brief explanation"
    }}
  ]
}}
\"\"\"
    try:
        response = model.generate_content(prompt)
        match = re.search(r'\{.*\}', response.text, re.DOTALL)
        if match:
            return json.loads(match.group(0))
    except Exception as e:
        print("Gemini error:", e)
    return None

@app.post("/api/generate-quiz")"""

text = text.replace("@app.post(\"/api/generate-quiz\")", gemini_func)

# modify generate_quiz_universal
old_func = """async def generate_quiz_universal(data: QuizRequest):
    subject_upper = data.subject.strip().upper() if getattr(data, 'subject', None) else "UNKNOWN"
    
    print(f"🔥 SUBJECT RECEIVED: {data.subject} | DIFFICULTY: {data.difficulty}")
    
    if subject_upper in FALLBACK_QUIZZES:
        questions = FALLBACK_QUIZZES[subject_upper]
    else:
        questions = [
            dict(q) for q in FALLBACK_QUIZZES["DEFAULT"]
        ]
        questions[0]["question"] = f"What is a core concept in {data.subject}?"
        questions[0]["answer"] = "Building scalable systems"
        questions[0]["options"] = ["Building scalable systems", "Writing documents", "Browsing the web", "Playing games"]
        
    return {"questions": questions}"""

new_func = """async def generate_quiz_universal(data: QuizRequest):
    subject_upper = data.subject.strip().upper() if getattr(data, 'subject', None) else "UNKNOWN"
    
    print(f"🔥 SUBJECT RECEIVED: {data.subject} | DIFFICULTY: {data.difficulty}")
    
    # Try generative AI first
    ai_questions = await synthesize_ai_mission(data.subject, data.difficulty)
    if ai_questions and "questions" in ai_questions and len(ai_questions["questions"]) > 0:
        return ai_questions
        
    print("⚠️ Falling back to Lexicon Hub.")
    if subject_upper in FALLBACK_QUIZZES:
        questions = [dict(q) for q in FALLBACK_QUIZZES[subject_upper]]
        # Tweak fallback based on difficulty just to show variation if AI fails
        if data.difficulty == "Hard":
            questions[0]["question"] = f"Hard: {questions[0]['question']}"
        elif data.difficulty == "Easy":
            questions[0]["question"] = f"Easy: {questions[0]['question']}"
    else:
        questions = [dict(q) for q in FALLBACK_QUIZZES["DEFAULT"]]
        questions[0]["question"] = f"What is a core concept in {data.subject}?"
        questions[0]["answer"] = "Building scalable systems"
        questions[0]["options"] = ["Building scalable systems", "Writing documents", "Browsing the web", "Playing games"]
        
    return {"questions": questions}"""

text = text.replace(old_func, new_func)

with open("ai_backend/main.py", "w", encoding="utf-8") as f:
    f.write(text)
print("done")
