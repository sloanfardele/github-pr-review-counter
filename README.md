# GitHub PR Review Counter - Chrome Extension

A Chrome extension that helps you track pending PR reviews for your GitHub team members.

## Features

- 🔐 Secure GitHub authentication
- 👥 View all team members and their pending review counts
- 🔄 Real-time refresh capability
- 📊 Visual sorting by review load
- 🎨 Clean, GitHub-inspired UI

---

## 🚀 Quick Start (3 Minutes)

### 1️⃣ Create GitHub Token
1. Go to [GitHub Tokens](https://github.com/settings/tokens/new)
2. Name it: "PR Review Counter"
3. Select scopes: ✅ `repo` + ✅ `read:org`
4. Click "Generate token" and copy it (starts with `ghp_`)

### 2️⃣ Install Extension
1. Open `chrome://extensions/`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select the folder with these files

### 3️⃣ Configure & Use
1. Click the extension icon
2. Paste your GitHub token
3. Enter your org name (e.g., `microsoft`)
4. Enter your team slug (e.g., `developers`)
5. Click "Save & Load Data"

**Done!** 🎉 You'll see each teammate's pending PR review count.

---

## 📖 Detailed Installation Guide

If you need more help than the Quick Start provides, follow these detailed steps.

### Step 1: Create a GitHub Personal Access Token

Since Chrome extensions can't securely handle OAuth without a backend server, we'll use a Personal Access Token:

1. **Go to GitHub Token Settings**
   - Visit: https://github.com/settings/tokens/new
   - Or navigate: GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Configure the Token**
   - **Note**: Enter a descriptive name like "PR Review Counter Extension"
   - **Expiration**: Choose your preferred expiration (30, 60, 90 days, or no expiration)
   
3. **Select Permissions (Scopes)**
   - ✅ `repo` - Full control of private repositories (includes access to pull requests)
   - ✅ `read:org` - Read org and team membership

4. **Generate and Copy**
   - Click "Generate token" at the bottom
   - **IMPORTANT**: Copy the token immediately (starts with `ghp_`). You won't see it again!

### Step 2: Install the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the folder containing your extension files
5. The extension icon should appear in your toolbar (Pin it for easy access!)

### Step 3: Create Simple Icons (Optional)

You can create simple placeholder icons or use the extension without them:

```bash
# Create simple colored squares as placeholders
convert -size 16x16 xc:#2da44e icon16.png
convert -size 48x48 xc:#2da44e icon48.png
convert -size 128x128 xc:#2da44e icon128.png
```

Or download GitHub logo icons from a site like [icons8.com](https://icons8.com)

---

## ⚙️ Configuration & Usage

### Finding Your Team Slug

Your team URL looks like:
```
https://github.com/orgs/YOUR-ORG/teams/YOUR-TEAM-SLUG
                            ^^^^^^^^           ^^^^^^^^^^^^^^^
```

Example:
- URL: `github.com/orgs/acme-corp/teams/backend-engineers`
- Org: `acme-corp`
- Team Slug: `backend-engineers` (usually lowercase with hyphens)

### Understanding the Display

- **Username**: Team member's GitHub handle
- **Number**: How many PRs they need to review (reviews not yet approved)
- **Colors**: 
  - 🟢 Green (0) = All caught up! ✅
  - 🔵 Blue (1-4) = Normal workload 📝
  - 🔴 Red (5+) = Heavy review load 🔥

### Refreshing Data

- Click the "🔄 Refresh" button anytime to update the counts.
- Useful after team members complete reviews.

### Disconnecting

- Click "Disconnect GitHub" to remove your token.
- You'll need to re-enter it to use the extension again.

---

## 🛠 Troubleshooting

### Common Issues

**"Resource not found"**
- Verify your organization name is correct (case-sensitive)
- Check that the team slug matches exactly (check the team URL)
- Ensure you have access to the team (you must be a member or org owner)

**"Invalid token" or "Authentication expired"**
- Make sure you selected `repo` and `read:org` scopes
- Verify you copied the entire token (starts with `ghp_`)
- Your token may have been revoked; generate a new one

**"No team members found"**
- Verify the team exists and has members
- Check that you spelled the team slug correctly
- Ensure your token has `read:org` permission

**Numbers seem wrong?**
- The extension only counts PRs where the reviewer hasn't approved yet.
- Ensure team members are actually assigned as reviewers.

### Performance & Rate Limiting

- **Slow Loading**: For teams with many members (10+) or open PRs (50+), initial load may take 10-30 seconds. This is normal.
- **Rate Limits**: GitHub allows 5,000 requests/hour. Each refresh uses ~1-5 requests per team member. This limit is rarely reached in normal usage.

---

## ℹ️ How It Works

The extension:
1. Fetches all members of your specified GitHub team
2. For each member, searches for open PRs where they're requested as a reviewer
3. Checks if they've already approved the PR
4. Counts only PRs that are still awaiting their review
5. Displays the results sorted by review count (highest first)

## 🔒 Security & Privacy

- **Local Storage**: Your Personal Access Token is stored locally in Chrome's secure storage.
- **No External Servers**: No data is sent to external servers (only GitHub).
- **Read-Only**: The extension only reads data (never writes or modifies).
- **Best Practices**: 
  - Never share your token with others.
  - Consider creating a token with minimal required permissions.
  - Revoke tokens you're no longer using.

## License

MIT License - feel free to modify and use as needed!
