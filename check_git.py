import shutil
import os
import subprocess

print(f"Current Directory: {os.getcwd()}")
git_path = shutil.which("git")
print(f"Git Path: {git_path}")

if git_path:
    try:
        result = subprocess.run(["git", "status"], capture_output=True, text=True)
        print("Git Status Output:")
        print(result.stdout)
        print(result.stderr)
    except Exception as e:
        print(f"Error running git: {e}")
else:
    print("Git not found in PATH")
