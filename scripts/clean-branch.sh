#!/bin/bash

branch=$1

if [ -z "$branch" ]; then
  echo "❌ Please provide a branch name."
  echo "Usage: ./scripts/clean-branch.sh your-branch-name"
  exit 1
fi

echo "🧼 Cleaning up branch: $branch..."

git checkout main && git pull

if git branch --merged | grep -q "$branch"; then
  git branch -d "$branch"
  git push origin --delete "$branch"
  echo "✅ Branch $branch cleaned up."
else
  echo "❌ Branch $branch is not merged into main. Aborting."
fi
