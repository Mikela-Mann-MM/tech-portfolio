# GitHub Push Instructions

Since we're having issues with the automated script, here are manual instructions to push your portfolio to GitHub:

## Step 1: Create a Repository on GitHub

1. Go to GitHub.com and log in with your username (mayfair73)
2. Click the "+" icon in the top-right corner of the page
3. Select "New repository" from the dropdown menu
4. For Repository name, enter: `tech-portfolio`
5. Make it Public (so you can share it easily with your friend)
6. Do NOT check "Add a README file" or any other initialization options
7. Click the green "Create repository" button

## Step 2: Get Your Personal Access Token

1. Go to GitHub.com → Your profile (top right) → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "Portfolio Push"
4. Select at least the "repo" scope
5. Click "Generate token"
6. Copy the token (you'll only see it once)

## Step 3: Set Up the Remote for Your Repository

Open Terminal and run the following command (replace YOUR_TOKEN with your actual token):

```bash
git remote set-url my-github https://mayfair73:YOUR_TOKEN@github.com/mayfair73/tech-portfolio.git
```

## Step 4: Push Your Code

Then push your code with:

```bash 
git push -u my-github main
```

## Alternative: Using SSH (if you prefer)

If you'd rather use SSH authentication:

1. Check if you have an SSH key: `ls -la ~/.ssh`
2. If not, generate one: `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
3. Add it to GitHub: GitHub.com → Settings → SSH and GPG keys → New SSH key
4. Change your remote: `git remote set-url my-github git@github.com:mayfair73/tech-portfolio.git`
5. Push: `git push -u my-github main`

## After Pushing

Once pushed, your friend can access your improved version at:
https://github.com/mayfair73/tech-portfolio

They can clone it with:
```bash
git clone https://github.com/mayfair73/tech-portfolio.git
```

All documentation will be in the `docs` folder.