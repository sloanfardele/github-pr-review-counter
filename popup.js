// DOM Elements
const authSection = document.getElementById('auth-section');
const configSection = document.getElementById('config-section');
const loadingSection = document.getElementById('loading-section');
const resultsSection = document.getElementById('results-section');
const errorSection = document.getElementById('error-section');

const connectBtn = document.getElementById('connect-btn');
const saveConfigBtn = document.getElementById('save-config-btn');
const refreshBtn = document.getElementById('refresh-btn');
const logoutBtn = document.getElementById('logout-btn');
const retryBtn = document.getElementById('retry-btn');

const orgInput = document.getElementById('org-input');
const teamInput = document.getElementById('team-input');
const statsContainer = document.getElementById('stats-container');
const errorText = document.getElementById('error-text');

// State
let accessToken = null;
let config = null;

// Initialize
document.addEventListener('DOMContentLoaded', init);

async function init() {
  const stored = await chrome.storage.local.get(['accessToken', 'config']);
  accessToken = stored.accessToken;
  config = stored.config;

  if (!accessToken) {
    showSection('auth');
  } else if (!config || !config.org || !config.team) {
    showSection('config');
    if (config) {
      orgInput.value = config.org || '';
      teamInput.value = config.team || '';
    }
  } else {
    orgInput.value = config.org;
    teamInput.value = config.team;
    loadData();
  }
}

// Event Listeners
connectBtn.addEventListener('click', authenticate);
saveConfigBtn.addEventListener('click', saveConfig);
refreshBtn.addEventListener('click', loadData);
logoutBtn.addEventListener('click', logout);
retryBtn.addEventListener('click', init);

// Authentication
async function authenticate() {
  const token = document.getElementById('token-input').value.trim();
  
  if (!token) {
    showError('Please enter a GitHub Personal Access Token');
    return;
  }

  try {
    showSection('loading');
    
    // Verify token works by fetching user info
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!response.ok) {
      throw new Error('Invalid token or insufficient permissions');
    }

    accessToken = token;
    await chrome.storage.local.set({ accessToken: token });
    showSection('config');
  } catch (error) {
    showError('Failed to authenticate: ' + error.message);
  }
}

// Save configuration
async function saveConfig() {
  const org = orgInput.value.trim();
  const team = teamInput.value.trim();

  if (!org || !team) {
    showError('Please enter both organization and team name');
    return;
  }

  config = { org, team };
  await chrome.storage.local.set({ config });
  loadData();
}

// Load PR review data
async function loadData() {
  try {
    showSection('loading');

    // Get team members
    const members = await fetchTeamMembers(config.org, config.team);
    
    if (members.length === 0) {
      showError('No team members found. Check your organization and team name.');
      return;
    }

    // Get pending reviews for each member
    const reviewCounts = await Promise.all(
      members.map(member => getPendingReviewCount(config.org, member.login))
    );

    // Combine data
    const memberStats = members.map((member, index) => ({
      ...member,
      pendingReviews: reviewCounts[index]
    }));

    // Sort by pending reviews (descending)
    memberStats.sort((a, b) => b.pendingReviews - a.pendingReviews);

    displayResults(memberStats);
  } catch (error) {
    showError(error.message);
  }
}

// Fetch team members
async function fetchTeamMembers(org, team) {
  const response = await githubAPI(`/orgs/${org}/teams/${team}/members`);
  return response;
}

// Get pending review count for a user
async function getPendingReviewCount(org, username) {
  try {
    // Search for PRs where the user is requested as a reviewer
    const query = `type:pr state:open org:${org} review-requested:${username}`;
    const searchResults = await githubAPI(`/search/issues?q=${encodeURIComponent(query)}&per_page=100`);
    
    const prs = searchResults.items || [];
    
    // Filter out PRs where the user has already approved
    const pendingPRs = await Promise.all(
      prs.map(async (pr) => {
        const reviews = await githubAPI(pr.pull_request.url.replace('https://api.github.com', '') + '/reviews');
        
        // Check if user has already approved
        const userReviews = reviews.filter(r => r.user.login === username);
        const hasApproved = userReviews.some(r => r.state === 'APPROVED');
        
        return hasApproved ? null : pr;
      })
    );

    return pendingPRs.filter(pr => pr !== null).length;
  } catch (error) {
    console.error(`Error fetching reviews for ${username}:`, error);
    return 0;
  }
}

// GitHub API helper
async function githubAPI(endpoint) {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication expired. Please reconnect.');
    } else if (response.status === 404) {
      throw new Error('Resource not found. Check your organization and team name.');
    } else {
      const error = await response.json();
      throw new Error(error.message || `GitHub API error: ${response.status}`);
    }
  }

  return response.json();
}

// Display results
function displayResults(memberStats) {
  statsContainer.innerHTML = ''; // Clear previous content

  if (memberStats.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    
    const p = document.createElement('p');
    p.textContent = 'No team members found';
    
    const small = document.createElement('small');
    small.textContent = 'Check your organization and team configuration';
    
    emptyState.appendChild(p);
    emptyState.appendChild(small);
    statsContainer.appendChild(emptyState);
  } else {
    memberStats.forEach(member => {
      const countClass = member.pendingReviews === 0 ? 'zero' : 
                        member.pendingReviews >= 5 ? 'high' : '';
      
      const card = document.createElement('div');
      card.className = 'member-card';
      
      const info = document.createElement('div');
      info.className = 'member-info';
      
      const img = document.createElement('img');
      img.src = member.avatar_url;
      img.alt = member.login;
      img.className = 'member-avatar';
      
      const nameDivWrapper = document.createElement('div');
      const nameDiv = document.createElement('div');
      nameDiv.className = 'member-name';
      nameDiv.textContent = member.login;
      nameDivWrapper.appendChild(nameDiv);
      
      info.appendChild(img);
      info.appendChild(nameDivWrapper);
      
      const countDiv = document.createElement('div');
      countDiv.className = `review-count ${countClass}`;
      countDiv.textContent = member.pendingReviews;
      
      card.appendChild(info);
      card.appendChild(countDiv);
      
      statsContainer.appendChild(card);
    });
  }

  showSection('results');
}

// Logout
async function logout() {
  await chrome.storage.local.clear();
  accessToken = null;
  config = null;
  showSection('auth');
}

// Show specific section
function showSection(section) {
  authSection.classList.add('hidden');
  configSection.classList.add('hidden');
  loadingSection.classList.add('hidden');
  resultsSection.classList.add('hidden');
  errorSection.classList.add('hidden');

  switch (section) {
    case 'auth':
      authSection.classList.remove('hidden');
      break;
    case 'config':
      configSection.classList.remove('hidden');
      break;
    case 'loading':
      loadingSection.classList.remove('hidden');
      break;
    case 'results':
      resultsSection.classList.remove('hidden');
      break;
    case 'error':
      errorSection.classList.remove('hidden');
      break;
  }
}

// Show error
function showError(message) {
  errorText.textContent = message;
  showSection('error');
}
