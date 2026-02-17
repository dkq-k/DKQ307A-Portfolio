#!/bin/bash

# Deployment Helper Script
# This script helps fix the git remote URL and deploy changes.

echo "============================================"
echo "      Portfolio Deployment Helper"
echo "============================================"
echo ""

# 1. Open the GitHub token page
echo "[1/3] Opening GitHub page to create a new token..."
if [[ "$OSTYPE" == "darwin"* ]]; then
  open "https://github.com/settings/tokens/new?scopes=repo&description=PortfolioDeployment"
else
  echo "Please open this URL in your browser:"
  echo "https://github.com/settings/tokens/new?scopes=repo&description=PortfolioDeployment"
fi

echo ""
echo "-------------------------------------------------------"
echo "INSTRUCTIONS:"
echo "1. On the web page that just opened:"
echo "   - Scroll to the bottom."
echo "   - Click the green 'Generate token' button."
echo "2. Copy the token code (it starts with 'ghp_')."
echo "-------------------------------------------------------"
echo ""

# 2. Prompt for token
echo "[2/3] Paste your token below and press ENTER:"
read -p "> " TOKEN

# Validate token
if [ -z "$TOKEN" ]; then
  echo "Error: Token cannot be empty."
  exit 1
fi

if [[ "$TOKEN" == *"YOUR_TOKEN"* ]]; then
  echo "Error: You pasted the placeholder text 'YOUR_TOKEN'!"
  echo "Please run this script again and paste the actual token code."
  exit 1
fi

# 3. Update Remote and Push
echo ""
echo "[3/3] Updating git configuration..."
git remote set-url origin https://$TOKEN@github.com/dkq-k/DKQ307A-Portfolio.git

echo "Pushing changes to GitHub..."
git push

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ SUCCESS! Your changes have been deployed."
else
  echo ""
  echo "❌ Push failed. Please check if the token is correct and try again."
fi
