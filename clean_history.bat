@echo off
echo Rewriting history to "Done"...
git checkout --orphan temp_branch
git add -A
git commit -m "Done"
git branch -D main
git branch -m main
echo Force pushing to GitHub...
git push -f origin main
echo History rewritten successfully.
