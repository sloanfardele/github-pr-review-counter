# Quick Start Guide

## 🚀 Get Started in 3 Minutes

### 1️⃣ Create GitHub Token (2 minutes)
1. Go to https://github.com/settings/tokens/new
2. Name it: "PR Review Counter"
3. Select scopes: ✅ `repo` + ✅ `read:org`
4. Click "Generate token" and copy it (starts with `ghp_`)

### 2️⃣ Install Extension (30 seconds)
1. Open `chrome://extensions/`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select the folder with these files
5. Pin the extension icon to your toolbar

### 3️⃣ Configure & Use (30 seconds)
1. Click the extension icon
2. Paste your GitHub token
3. Enter your org name (e.g., `microsoft`)
4. Enter your team slug (e.g., `developers`)
5. Click "Save & Load Data"

**Done!** 🎉 You'll see each teammate's pending PR review count.

---

## 📋 Finding Your Team Slug

Your team URL looks like:
```
https://github.com/orgs/YOUR-ORG/teams/YOUR-TEAM-SLUG
                            ^^^^^^^^           ^^^^^^^^^^^^^^^
```

Example:
- URL: `github.com/orgs/acme-corp/teams/backend-engineers`
- Org: `acme-corp`
- Team Slug: `backend-engineers`

---

## 🎯 What It Shows

- **Username**: Team member's GitHub handle
- **Number**: How many PRs they need to review
- **Colors**: 
  - Green (0) = All caught up! ✅
  - Blue (1-4) = Normal workload 📝
  - Red (5+) = Heavy review load 🔥

---

## 🔄 Refreshing

Click the "🔄 Refresh" button anytime to update the counts.

---

## ❓ Quick Troubleshooting

**"Resource not found"**
→ Check your org name and team slug (case-sensitive!)

**"Invalid token"**
→ Make sure you selected `repo` and `read:org` scopes

**Numbers seem wrong?**
→ The extension only counts PRs where the reviewer hasn't approved yet

---

Need detailed help? See **INSTALL.md** for complete instructions.
