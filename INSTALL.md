# Installation Guide - GitHub PR Review Counter

Follow these steps to install and use the Chrome extension.

## Step 1: Create a GitHub Personal Access Token

1. **Go to GitHub Token Settings**
   - Visit: https://github.com/settings/tokens/new
   - Or navigate: GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Configure the Token**
   - **Note**: Enter a descriptive name like "PR Review Counter Extension"
   - **Expiration**: Choose your preferred expiration (30, 60, 90 days, or no expiration)
   
3. **Select Permissions (Scopes)**
   - ✅ `repo` - Full control of private repositories
     - This includes access to pull requests
   - ✅ `read:org` - Read org and team membership, read org projects

4. **Generate and Copy**
   - Click "Generate token" at the bottom
   - **IMPORTANT**: Copy the token immediately (starts with `ghp_`)
   - You won't be able to see it again!

## Step 2: Install the Extension in Chrome

1. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in the address bar
   - Or: Chrome Menu → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to the folder containing the extension files
   - Select the folder and click "Open"

4. **Verify Installation**
   - You should see "GitHub PR Review Counter" in your extensions list
   - The extension icon should appear in your Chrome toolbar
   - Pin it for easy access by clicking the puzzle icon → pin

## Step 3: Configure the Extension

1. **Click the Extension Icon**
   - A popup window will appear

2. **Enter Your GitHub Token**
   - Paste the Personal Access Token you created in Step 1
   - Click "Connect GitHub"

3. **Enter Organization Details**
   - **Organization**: Your GitHub organization name
     - Example: `microsoft`, `google`, `facebook`
     - This is the name in your org URL: `github.com/orgs/YOUR-ORG`
   
   - **Team Slug**: Your team's slug (URL-friendly name)
     - Example: `developers`, `frontend-team`, `platform`
     - Find this in your team URL: `github.com/orgs/ORG/teams/TEAM-SLUG`
     - Note: Team slug is usually lowercase with hyphens

4. **Load Data**
   - Click "Save & Load Data"
   - The extension will fetch and display PR review counts

## Step 4: Using the Extension

### Understanding the Display

- **Team members** are listed by username
- **Numbers** show pending PR reviews (reviews not yet approved)
- **Color coding**:
  - 🟢 Green = 0 pending reviews
  - 🔵 Blue = 1-4 pending reviews  
  - 🔴 Red = 5+ pending reviews

### Refreshing Data

- Click the "🔄 Refresh" button to update counts
- Useful after team members complete reviews

### Disconnecting

- Click "Disconnect GitHub" to remove your token
- You'll need to re-enter it to use the extension again

## Troubleshooting

### "Invalid token or insufficient permissions"
**Solution**: 
- Verify you copied the entire token (starts with `ghp_`)
- Ensure you selected both `repo` and `read:org` scopes
- Generate a new token if needed

### "Resource not found"
**Solution**:
- Double-check your organization name (case-sensitive)
- Verify the team slug is correct (check the team URL)
- Ensure you have access to the team (you must be a member or org owner)

### "No team members found"
**Solution**:
- Verify the team exists and has members
- Check that you spelled the team slug correctly
- Ensure your token has `read:org` permission

### Extension loads slowly
**Explanation**:
- Large teams or many open PRs take longer to process
- The extension checks each PR for approval status
- This is normal for teams with 10+ members or 50+ open PRs

### API Rate Limiting
**GitHub allows**:
- 5,000 API requests per hour for authenticated users
- Each refresh uses ~1-5 requests per team member
- Limit is rarely reached in normal usage

## Tips for Best Results

1. **Team Slug Format**
   - Use the exact slug from your GitHub team URL
   - It's usually lowercase with hyphens
   - Example URL: `github.com/orgs/acme/teams/backend-devs`
   - Team slug: `backend-devs`

2. **Token Security**
   - Keep your token private and secure
   - Don't share it with others
   - Rotate tokens periodically (every 60-90 days)
   - Revoke old tokens you're not using

3. **Performance**
   - First load may take 10-30 seconds for large teams
   - Subsequent refreshes are faster (data is cached briefly)
   - Close and reopen the popup to force a fresh load

4. **Multiple Teams**
   - To check different teams, just change the org/team fields
   - Click "Save & Load Data" again
   - Previous config is remembered per browser session

## Need Help?

If you encounter issues:
1. Check the browser console for errors (F12 → Console tab)
2. Verify your GitHub token permissions
3. Test your org/team names in GitHub's web interface first
4. Make sure you're a member of the team you're trying to view

## Security & Privacy

- Your token is stored locally in Chrome's secure storage
- No data is sent to external servers (only GitHub)
- The extension only reads data (never writes or modifies)
- You can revoke the token anytime at: https://github.com/settings/tokens

Enjoy tracking your team's PR reviews! 🚀
