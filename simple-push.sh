#!/bin/bash

# Super Simple GitHub Push Script

# INSTRUCTIONS:
# 1. Create a repository named 'tech-portfolio' on GitHub.com (don't initialize with README)
# 2. Generate a personal access token on GitHub: Settings > Developer settings > Personal access tokens
# 3. Run this script and paste your token when prompted
# 4. That's it!

echo "==============================================="
echo "Simple GitHub Push Script for Tech Portfolio"
echo "==============================================="
echo ""

# Set GitHub username
USERNAME="mayfair73"
REPO="tech-portfolio"

echo "Going to push to https://github.com/$USERNAME/$REPO"
echo ""

# Ask for token
echo "Enter your GitHub personal access token:"
echo "(Get one from GitHub.com → Settings → Developer settings → Personal access tokens)"
read -s TOKEN
echo ""

if [ -z "$TOKEN" ]; then
  echo "Error: No token provided. Cannot continue."
  exit 1
fi

# Configure the remote
echo "Setting up GitHub remote..."
git remote remove my-github 2>/dev/null || true
git remote add my-github "https://$USERNAME:$TOKEN@github.com/$USERNAME/$REPO.git"

# Push to GitHub
echo "Pushing to GitHub..."
git push -u my-github main

# Check result
if [ $? -eq 0 ]; then
  echo ""
  echo "🎉 SUCCESS! Your tech portfolio is now on GitHub!"
  echo ""
  echo "Your repository URL: https://github.com/$USERNAME/$REPO"
  echo "Share this with your friend for her to see all the improvements."
  echo ""
  echo "She can clone it with:"
  echo "git clone https://github.com/$USERNAME/$REPO.git"
else
  echo ""
  echo "⚠️ Something went wrong. Please check the error message above."
fi

# Clear token from memory
TOKEN=""