# GitHub PR Review Counter - Chrome Extension

A Chrome extension that helps you track pending PR reviews for your GitHub team members.

## Features

- 🔐 Secure GitHub authentication
- 👥 View all team members and their pending review counts
- 🔄 Real-time refresh capability
- 📊 Visual sorting by review load
- 🎨 Clean, GitHub-inspired UI

## Setup Instructions

### 1. Create a GitHub Personal Access Token

Since Chrome extensions can't securely handle OAuth without a backend server, we'll use a Personal Access Token:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "PR Review Counter Extension"
4. Select these scopes:
   - `repo` (Full control of private repositories)
   - `read:org` (Read org and team membership)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

### 2. Install the Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the folder containing your extension files
5. The extension icon should appear in your toolbar

### 3. Create Simple Icons (Optional)

You can create simple placeholder icons or use the extension without them:

```bash
# Create simple colored squares as placeholders
convert -size 16x16 xc:#2da44e icon16.png
convert -size 48x48 xc:#2da44e icon48.png
convert -size 128x128 xc:#2da44e icon128.png
```

Or download GitHub logo icons from a site like [icons8.com](https://icons8.com)

### 4. Use the Extension

1. Click the extension icon in your toolbar
2. Enter your GitHub Personal Access Token
3. Click "Connect GitHub"
4. Enter your organization name (e.g., `microsoft`)
5. Enter your team slug (e.g., `developers`)
   - Find this in your team URL: `github.com/orgs/ORG/teams/TEAM-SLUG`
6. Click "Save & Load Data"

## How It Works

The extension:

1. Fetches all members of your specified GitHub team
2. For each member, searches for open PRs where they're requested as a reviewer
3. Checks if they've already approved the PR
4. Counts only PRs that are still awaiting their review
5. Displays the results sorted by review count (highest first)

## Limitations

- GitHub API rate limits: 5,000 requests/hour for authenticated requests
- For teams with many members or PRs, initial load may take a few seconds
- Personal Access Tokens should be kept secure and rotated regularly

## Troubleshooting

**"Resource not found" error:**
- Verify your organization name is correct
- Check that the team slug matches exactly (it's case-sensitive)
- Ensure your token has the required permissions

**"Authentication expired" error:**
- Your token may have been revoked
- Generate a new token and reconnect

**No data showing:**
- Ensure your team has members
- Check that there are open PRs in your organization
- Verify team members are actually assigned as reviewers

## Security Notes

- Your Personal Access Token is stored locally in Chrome's secure storage
- Never share your token with others
- Consider creating a token with minimal required permissions
- Revoke tokens you're no longer using

## License

MIT License - feel free to modify and use as needed!
