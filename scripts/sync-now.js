import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

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
      // Continue
    }
  }
  return 'git';
}

const GIT = getGitCommand();

function runGit(cmd) {
  return execSync(`${GIT} ${cmd}`, { cwd: projectRoot, encoding: 'utf-8' });
}

console.log('🔄 Checking for changes...');
try {
  const status = runGit('status --porcelain').trim();
  if (!status) {
    console.log('✅ Working tree clean! No changes to push.');
    process.exit(0);
  }

  const branch = runGit('rev-parse --abbrev-ref HEAD').trim() || 'main';
  console.log(`Changes detected. Staging all files...`);
  runGit('add .');

  const customMsg = process.argv.slice(2).join(' ');
  const now = new Date();
  const commitMsg = customMsg || `Update: ${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString()}`;

  console.log(`Committing with message: "${commitMsg}"...`);
  runGit(`commit -m "${commitMsg}"`);

  console.log(`Pushing to origin/${branch}...`);
  runGit(`push origin ${branch}`);

  console.log('🚀 Successfully pushed changes to GitHub!');
} catch (error) {
  console.error('❌ Push failed:', error.message);
  process.exit(1);
}
