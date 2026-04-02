import re
import codecs

with codecs.open('ai_backend/main.py', 'r', 'utf-8') as f:
    content = f.read()

new_default = '''    "DEFAULT": [
        {"question": "What is the core operational principle of this subject?", "options": ["Scalability and Efficiency", "Documentation and Formatting", "Latency Scaling", "Hardware Redundancy"], "answer": "Scalability and Efficiency"},
        {"question": "Which optimization technique is standard in this subject?", "options": ["Caching and Memoization", "Code Duplication", "Overhead Injection", "Synchronous Blocking"], "answer": "Caching and Memoization"},
        {"question": "What is typically the primary focus during debugging in this subject?", "options": ["State and Variable Memory", "Hard drive limits", "Monitor refresh rate", "Keyboard layout"], "answer": "State and Variable Memory"},
        {"question": "How are architectural patterns applied in this subject?", "options": ["By separating concerns and modularizing logic", "By writing everything in one file", "By deleting old variables", "By bypassing security limits"], "answer": "By separating concerns and modularizing logic"},
        {"question": "Why is version control critical when working with this subject?", "options": ["To track project history and async collaboration", "To make the application run faster", "To reduce binary file size", "To increase RAM allocations"], "answer": "To track project history and async collaboration"},
        {"question": "Which of these represents a memory leak risk in this subject?", "options": ["Unreferenced active listeners and open sockets", "Printing to the console", "Using too many comments", "Writing functional tests"], "answer": "Unreferenced active listeners and open sockets"},
        {"question": "What is the primary advantage of strict typing in this subject?", "options": ["Compilation-time error catching", "Faster runtime execution", "No need for documentation", "Unlimited variable scopes"], "answer": "Compilation-time error catching"},
        {"question": "How should secrets and credentials be handled in this subject?", "options": ["Environment variables and Vaults", "Hardcoded into constants", "Written in public documentation", "Stored in local text files"], "answer": "Environment variables and Vaults"},
        {"question": "What is the best approach for horizontal scaling in this subject?", "options": ["Stateless instances with load balancing", "Buying a much larger single server", "Storing all sessions in memory", "Disabling network firewalls"], "answer": "Stateless instances with load balancing"},
        {"question": "Which paradigm is highly effective for I/O operations in this subject?", "options": ["Asynchronous Non-Blocking Event Loops", "Single-threaded synchronous locks", "Manual memory deallocation", "Infinite recursive states"], "answer": "Asynchronous Non-Blocking Event Loops"},
        {"question": "What is the purpose of CI/CD pipelines when integrating with this subject?", "options": ["Automated testing and continuous delivery", "To write code automatically", "To encrypt user passwords directly", "To bypass code reviews"], "answer": "Automated testing and continuous delivery"},
        {"question": "How is technical debt typically mitigated in this subject?", "options": ["Refactoring and comprehensive test coverage", "Waiting for the compiler to fix it", "Ignoring old modules", "Deploying more servers"], "answer": "Refactoring and comprehensive test coverage"}
    ]'''

content = re.sub(r'    "DEFAULT": \[.*?\](?=\n\})', new_default, content, flags=re.DOTALL)

with codecs.open('ai_backend/main.py', 'w', 'utf-8') as f:
    f.write(content)

print("Updated DEFAULT quizzes successfully.")
