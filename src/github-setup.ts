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
      try {
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
          { cwd: projectPath, interactive: true }
        );
      } catch (error) {
        if (error instanceof Error && error.message === 'REPOSITORY_EXISTS') {
          console.warn(`⚠️ Repository "${config.name}" already exists on GitHub`);
          console.log('💡 You can rename your local project or use a different name');
          return; // Exit gracefully without throwing
        }
        throw error; // Re-throw other errors
      }

      // Set main as default branch
      console.log('🌿 Setting up main branch...');
      await runCommand(['git', 'branch', '-M', 'main'], { cwd: projectPath });

      // Push to GitHub
      console.log('🚀 Pushing to GitHub...');
      await runCommand(['git', 'push', '-u', 'origin', 'main'], {
        cwd: projectPath,
        interactive: true,
      });

      console.log('✅ GitHub repository created and pushed successfully!');
      console.log(
        `🌐 Repository URL: https://github.com/${await getGitHubUsername()}/${config.name}`
      );
    } else {
      console.log('ℹ️ Skipping GitHub repository creation');
      console.log('💡 You can create it later with: gh repo create');
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'REPOSITORY_EXISTS') {
      // Already handled above, don't re-throw
      return;
    }

    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('GitHub setup failed:', errorMessage);

    // Check if gh CLI is installed
    try {
      await runCommand(['gh', '--version']);
    } catch (ghError) {
      if (ghError instanceof Error && ghError.message === 'COMMAND_NOT_FOUND') {
        console.log('💡 GitHub CLI (gh) is not installed');
        console.log('   Install: https://cli.github.com/');
        console.log('   Then authenticate: gh auth login');
      }
    }

    throw error;
  }
}

async function runCommand(
  command: string[],
  options: { cwd?: string; interactive?: boolean } = {}
): Promise<string> {
  const spawnOptions = {
    cwd: options.cwd || process.cwd(),
    ...(options.interactive
      ? {
          // For interactive commands, inherit stdio to allow keyboard input
          stdout: 'inherit' as const,
          stderr: 'inherit' as const,
          stdin: 'inherit' as const,
        }
      : {
          // For non-interactive commands, pipe output for processing
          stdout: 'pipe' as const,
          stderr: 'pipe' as const,
        }),
  };

  const proc = Bun.spawn(command, spawnOptions);
  const exitCode = await proc.exited;

  if (exitCode !== 0) {
    if (options.interactive) {
      // For interactive commands, we can't read stderr/stdout since they're inherited
      // Check for common error patterns based on command and exit code
      if (command.includes('gh') && command.includes('create')) {
        throw new Error('REPOSITORY_EXISTS');
      }
      throw new Error(`Command failed: ${command.join(' ')}`);
    }

    const stderr = await new Response(proc.stderr!).text();
    const stdout = await new Response(proc.stdout!).text();

    // Better error handling with specific cases
    if (stderr.includes('Name already exists on this account')) {
      throw new Error('REPOSITORY_EXISTS');
    }

    if (stderr.includes('not found') || stderr.includes('command not found')) {
      throw new Error('COMMAND_NOT_FOUND');
    }

    throw new Error(`Command failed: ${command.join(' ')}\nOutput: ${stdout}\nError: ${stderr}`);
  }

  // For interactive commands, we can't return stdout content
  return options.interactive ? '' : await new Response(proc.stdout!).text();
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
