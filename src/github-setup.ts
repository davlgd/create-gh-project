// GitHub repository setup functionality

export interface GitHubConfig {
  name: string;
  description: string;
  isPrivate: boolean;
  outputDir: string;
}

export async function setupGitHub(config: GitHubConfig) {
  const projectPath = config.outputDir;

  try {
    // Initialize git repository if not already done
    console.log('🔄 Initializing Git repository...');
    await runCommand(['git', 'init'], { cwd: projectPath });

    // Add all files
    console.log('📦 Adding files to Git...');
    await runCommand(['git', 'add', '.'], { cwd: projectPath });

    // Create initial commit
    console.log('💾 Creating initial commit...');
    await runCommand(['git', 'commit', '-m', 'Initial commit by create-gh-project'], {
      cwd: projectPath,
    });

    // Ask user if they want to create GitHub repository
    const shouldCreateRepo = await askUser(`Create GitHub repository "${config.name}"? (y/N): `);

    if (shouldCreateRepo.toLowerCase() === 'y' || shouldCreateRepo.toLowerCase() === 'yes') {
      const visibility = config.isPrivate ? '--private' : '--public';

      console.log(`🐙 Creating ${config.isPrivate ? 'private' : 'public'} GitHub repository...`);

      // Create GitHub repository using gh CLI
      await runCommand(
        [
          'gh',
          'repo',
          'create',
          config.name,
          '--description',
          config.description,
          visibility,
          '--source',
          '.',
        ],
        { cwd: projectPath }
      );

      // Set main as default branch
      console.log('🌿 Setting up main branch...');
      await runCommand(['git', 'branch', '-M', 'main'], { cwd: projectPath });

      // Push to GitHub
      console.log('🚀 Pushing to GitHub...');
      await runCommand(['git', 'push', '-u', 'origin', 'main'], { cwd: projectPath });

      console.log('✅ GitHub repository created and pushed successfully!');
      console.log(
        `🌐 Repository URL: https://github.com/${await getGitHubUsername()}/${config.name}`
      );
    } else {
      console.log('ℹ️ Skipping GitHub repository creation');
      console.log('💡 You can create it later with: gh repo create');
    }
  } catch (error) {
    console.error('❌ GitHub setup failed:', error);

    // Check if gh CLI is installed
    try {
      await runCommand(['gh', '--version']);
    } catch {
      console.error('💡 Make sure GitHub CLI (gh) is installed and authenticated:');
      console.error('   - Install: https://cli.github.com/');
      console.error('   - Login: gh auth login');
    }

    throw error;
  }
}

async function runCommand(command: string[], options: { cwd?: string } = {}): Promise<string> {
  const proc = Bun.spawn(command, {
    cwd: options.cwd || process.cwd(),
    stdout: 'pipe',
    stderr: 'pipe',
  });

  const exitCode = await proc.exited;

  if (exitCode !== 0) {
    const stderr = await new Response(proc.stderr).text();
    throw new Error(`Command failed: ${command}\nError: ${stderr}`);
  }

  return await new Response(proc.stdout).text();
}

async function getGitHubUsername(): Promise<string> {
  try {
    const result = await runCommand(['gh', 'api', 'user', '--jq', '.login']);
    return result.trim();
  } catch {
    // Fallback to git config
    try {
      const result = await runCommand(['git', 'config', 'user.name']);
      return result.trim();
    } catch {
      return 'username';
    }
  }
}

function askUser(question: string): Promise<string> {
  return new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.once('data', (data) => {
      resolve(data.toString().trim());
    });
  });
}
