import subprocess
import os

def run_git_cmd(cmd):
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    print(f"STDOUT: {result.stdout}")
    print(f"STDERR: {result.stderr}")
    return result.returncode == 0

os.chdir(r"c:\Users\USER\Downloads\Telegram Desktop\blendify\blendify")

if run_git_cmd(["git", "add", "."]):
    if run_git_cmd(["git", "commit", "-m", "Done"]):
        run_git_cmd(["git", "push", "origin", "main"])
    else:
        print("Commit failed (likely nothing to commit)")
else:
    print("Add failed")
