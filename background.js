// GitHub OAuth configuration
// You'll need to create a GitHub OAuth App and replace these values
const GITHUB_CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID';
const REDIRECT_URI = chrome.identity.getRedirectURL();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'authenticate') {
    authenticateWithGitHub()
      .then(token => sendResponse({ success: true, token }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep channel open for async response
  }
});

// Authenticate with GitHub
async function authenticateWithGitHub() {
  // GitHub OAuth URL
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.append('scope', 'read:org,repo');

  try {
    // Launch OAuth flow
    const responseUrl = await chrome.identity.launchWebAuthFlow({
      url: authUrl.toString(),
      interactive: true
    });

    // Extract code from redirect URL
    const url = new URL(responseUrl);
    const code = url.searchParams.get('code');

    if (!code) {
      throw new Error('No authorization code received');
    }

    // Note: In production, you should exchange the code for a token on your backend
    // For simplicity, this example uses Personal Access Token workflow
    // You'll need to manually create a token and use it
    
    // Since we can't exchange the code without exposing client_secret in the extension,
    // we'll use a different approach: Personal Access Token
    throw new Error('OAuth flow requires a backend server. Please use Personal Access Token instead.');
    
  } catch (error) {
    throw error;
  }
}

// Alternative: Direct token input (more secure for extensions)
// This would be handled in the popup UI
