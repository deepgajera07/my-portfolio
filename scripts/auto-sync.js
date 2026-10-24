import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Find git executable
function getGitCommand() {
  const possiblePaths = [
    'git',
    'C:\\Program Files\\Git\\cmd\\git.exe',
    'C:\\Program Files\\Git\\bin\\git.exe'
  ];

  for (const gitPath of possiblePaths) {
    try {
      execSync(`"${gitPath}" --version`, { stdio: 'ignore' });
      return gitPath.includes(' ') ? `"${gitPath}"` : gitPath;
    } catch {
      // Continue to next path
    }
  }
  return 'git';
}

const GIT = getGitCommand();

// ANSI color helpers
const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  dim: '\x1b[2m',
  bold: '\x1b[1m'
};

function log(msg, color = colors.reset) {
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${color}${msg}${colors.reset}`);
}

function runGit(cmd) {
  return execSync(`${GIT} ${cmd}`, { cwd: projectRoot, encoding: 'utf-8' });
}

// Ignore files and directories
const ignoredPatterns = [
  '.git',
  'node_modules',
  'dist',
  'dist-ssr',
  '.env',
  '.env.local',
  '.env.production',
  'package-lock.json',
  '.oxlintrc.json'
];

function shouldIgnore(filePath) {
  if (!filePath) return true;
  const normalized = filePath.replace(/\\/g, '/');
  return ignoredPatterns.some(pattern => 
    normalized === pattern || 
    normalized.startsWith(`${pattern}/`) || 
    normalized.includes(`/${pattern}/`) ||
    normalized.endsWith(`/${pattern}`)
  );
}

let debounceTimer = null;
let isSyncing = false;
let pendingChanges = false;
const DEBOUNCE_DELAY_MS = 6000; // Wait 6 seconds after last change before pushing

function syncToGitHub() {
  if (isSyncing) {
    pendingChanges = true;
    return;
  }

  isSyncing = true;
  pendingChanges = false;

  try {
    const status = runGit('status --porcelain').trim();
    if (!status) {
      isSyncing = false;
      return;
    }

    // Get current branch
    const branch = runGit('rev-parse --abbrev-ref HEAD').trim() || 'main';

    log('Changes detected! Preparing auto-sync...', colors.yellow);

    const changedFiles = status
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    log(`Changed files (${changedFiles.length}):\n${changedFiles.map(f => `  • ${f}`).join('\n')}`, colors.dim);

    // Stage changes
    runGit('add .');

    // Create commit message with current timestamp
    const now = new Date();
    const dateStr = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });
    const commitMsg = `Auto-sync: update ${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString()}`;

    runGit(`commit -m "${commitMsg}"`);
    log(`Committed: "${commitMsg}"`, colors.cyan);

    // Push to GitHub
    log(`Pushing to origin/${branch}...`, colors.yellow);
    runGit(`push origin ${branch}`);

    log(`Successfully pushed to GitHub repository! (origin/${branch})`, colors.green);
  } catch (error) {
    log(`Error during auto-sync: ${error.message}`, colors.red);
  } finally {
    isSyncing = false;
    if (pendingChanges) {
      log('Additional changes occurred during push. Scheduling next sync...', colors.yellow);
      triggerSync();
    }
  }
}

function triggerSync() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    syncToGitHub();
  }, DEBOUNCE_DELAY_MS);
}

// Start file watcher
console.log('\n=============================================');
log('GitHub Auto-Sync Watcher is active!', colors.green + colors.bold);
log(`Watching directory: ${projectRoot}`, colors.cyan);
log('Whenever you modify and save files, changes will automatically be committed and pushed to GitHub.', colors.dim);
log('Press Ctrl+C to stop.\n', colors.dim);
console.log('=============================================\n');

try {
  fs.watch(projectRoot, { recursive: true }, (eventType, filename) => {
    if (!filename || shouldIgnore(filename)) {
      return;
    }
    triggerSync();
  });
} catch (err) {
  log(`Failed to start file watcher: ${err.message}`, colors.red);
}
