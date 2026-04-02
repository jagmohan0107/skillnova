import subprocess
import os
import signal
import sys
import time

# SkillNova Unified Master Launcher
# This script launches Frontend (5173), Auth Server (5001), and AI Engine (8000)

class Colors:
    FRONTEND = '\033[94m[FRONTEND]\033[0m'
    AUTH_SERVER = '\033[92m[AUTH-SERVER]\033[0m'
    AI_ENGINE = '\033[95m[AI-ENGINE]\033[0m'
    INFO = '\033[96m[MASTER-INFO]\033[0m'

def run_process(cmd, cwd, label):
    print(f"{label} Launching command: {cmd}")
    return subprocess.Popen(
        cmd, 
        cwd=cwd, 
        shell=True,
        creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if os.name == 'nt' else 0
    )

def main():
    print(f"\n{Colors.INFO} === SkillNova Unified System Launch ===\n")
    
    # 1. Start AI Engine (FastAPI)
    ai_process = run_process("py -m uvicorn main:app --port 8000 --reload", "./ai_backend", Colors.AI_ENGINE)
    
    # 2. Start Auth Backend (Node)
    auth_process = run_process("node server.js", "./server", Colors.AUTH_SERVER)
    
    # 3. Start Frontend (Vite)
    web_process = run_process("npm run dev", "./", Colors.FRONTEND)

    print(f"\n{Colors.INFO} ALL NODES ACTIVE. Access UI at http://localhost:5173")
    print(f"{Colors.INFO} Press CTRL+C to terminate all services safely.\n")
    
    try:
        while True:
            time.sleep(1)
            if ai_process.poll() is not None:
                print(f"{Colors.AI_ENGINE} AI Engine stopped unexpectedly.")
                break
            if auth_process.poll() is not None:
                print(f"{Colors.AUTH_SERVER} Auth Server stopped unexpectedly.")
                break
            if web_process.poll() is not None:
                print(f"{Colors.FRONTEND} Frontend stopped unexpectedly.")
                break
    except KeyboardInterrupt:
        print(f"\n{Colors.INFO} Shutting down SkillNova ecosystem...")
        
        # Kill process groups on Windows
        if os.name == 'nt':
            subprocess.call(['taskkill', '/F', '/T', '/PID', str(ai_process.pid)])
            subprocess.call(['taskkill', '/F', '/T', '/PID', str(auth_process.pid)])
            subprocess.call(['taskkill', '/F', '/T', '/PID', str(web_process.pid)])
        else:
            os.killpg(os.getpgid(ai_process.pid), signal.SIGTERM)
            os.killpg(os.getpgid(auth_process.pid), signal.SIGTERM)
            os.killpg(os.getpgid(web_process.pid), signal.SIGTERM)
            
        print(f"{Colors.INFO} Shutdown sequence complete. Systems offline.")
        sys.exit(0)

if __name__ == "__main__":
    main()
