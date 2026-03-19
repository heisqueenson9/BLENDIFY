import subprocess
import os

os.chdir(r"c:\Users\USER\Downloads\Telegram Desktop\blendify\blendify")

with open("git_output.txt", "w") as f:
    f.write("--- GIT ADD ---\n")
    res1 = subprocess.run(["git", "add", "."], capture_output=True, text=True)
    f.write(res1.stdout + "\n" + res1.stderr + "\n")
    
    f.write("--- GIT COMMIT ---\n")
    res2 = subprocess.run(["git", "-c", "user.name=User", "-c", "user.email=user@example.com", "commit", "-m", "Done"], capture_output=True, text=True)
    f.write(res2.stdout + "\n" + res2.stderr + "\n")
    
    f.write("--- GIT PUSH ---\n")
    res3 = subprocess.run(["git", "push", "origin", "main"], capture_output=True, text=True)
    f.write(res3.stdout + "\n" + res3.stderr + "\n")
