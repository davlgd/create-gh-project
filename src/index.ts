#!/usr/bin/env bun
import { Command } from 'commander';
import { existsSync, readdirSync } from 'fs';
import { resolve } from 'path';

import { setupGitHub } from './github-setup.js';
import { createProjectStructure } from './project-creator.js';
import { UILogger } from './services/ui-logger.js';
import { ProjectConfig, SupportedLicense } from './types.js';

const program = new Command();

program
  .name('create-gh-project')
  .description('🚀 Bootstrap your projects with essential files')
  .version('0.1.2')
  .argument('[name]', 'Project name', 'new-project')
  .option('-o, --output <directory>', 'Output directory (default: project name)')
  .option('-d, --description <desc>', 'Project description')
  .option('-l, --license <license>', 'License type (MIT or Apache-2.0)', 'Apache-2.0')
  .option('-g, --github', 'Create GitHub repository', false)
  .option('-p, --private', 'Create private repository (only with --github)', false)
  .option('-f, --force', 'Overwrite existing directory without confirmation', false)
  .addHelpText(
    'after',
    `
Examples:
  # Basic usage
  create-gh-project my-project

  # With custom output directory
  create-gh-project my-project --output ./custom-dir

  # Create with GitHub repository
  create-gh-project my-project --github

  # Using via package managers (recommended)
  npm create gh-project -- my-project --github --private --license MIT
  bun create gh-project -- my-project --output ./custom-dir
  `
  );

program.parse(process.argv);
const options = program.opts();
const args = program.args;

async function getGitHubInfo(): Promise<{ name: string; username: string }> {
  try {
    // Get both name and username in parallel
    const [nameProc, usernameProc] = [
      Bun.spawn(['gh', 'api', 'user', '--jq', '.name'], { stdout: 'pipe', stderr: 'pipe' }),
      Bun.spawn(['gh', 'api', 'user', '--jq', '.login'], { stdout: 'pipe', stderr: 'pipe' }),
    ];

    const [nameExit, usernameExit] = await Promise.all([nameProc.exited, usernameProc.exited]);

    if (nameExit !== 0 || usernameExit !== 0) {
      console.warn('⚠️ Could not get user info from GitHub API');
      return { name: 'Your Name', username: 'yourusername' };
    }

    const [nameResult, usernameResult] = await Promise.all([
      new Response(nameProc.stdout).text(),
      new Response(usernameProc.stdout).text(),
    ]);

    return {
      name: nameResult.trim() || 'Your Name',
      username: usernameResult.trim() || 'yourusername',
    };
  } catch {
    console.warn('⚠️ GitHub CLI not available or not authenticated');
    return { name: 'Your Name', username: 'yourusername' };
  }
}

async function main() {
  try {
    // Validate inputs first (fast validation before slow operations)
    const projectName = args[0] || 'new-project';

    // Validate license with type safety
    const validLicenses: SupportedLicense[] = ['MIT', 'Apache-2.0'];
    if (!validLicenses.includes(options.license as SupportedLicense)) {
      UILogger.error(
        `Invalid license "${options.license}" - Only MIT and Apache-2.0 are supported`
      );
      process.exit(1);
    }

    // Validate project name for GitHub compatibility
    if (!/^[a-zA-Z0-9._-]+$/.test(projectName)) {
      UILogger.error(`Invalid project name "${projectName}".`);
      UILogger.error(
        '  Project names must contain only letters, numbers, dots, underscores, and hyphens.'
      );
      UILogger.error('  Example: --name my-awesome-project');
      process.exit(1);
    }

    const description =
      options.description || `${projectName} - A project bootstrapped with create-gh-project`;

    // Determine output directory
    let outputDir: string;
    if (options.output) {
      outputDir = options.output;
    } else {
      outputDir = projectName; // Always create in new directory, never current directory
    }

    // Security check: Ensure we don't overwrite existing directories (before GitHub API call)
    const absoluteOutputDir = resolve(outputDir);
    if (existsSync(absoluteOutputDir)) {
      const dirContents = readdirSync(absoluteOutputDir);
      if (dirContents.length > 0) {
        if (!options.force) {
          UILogger.error(`Directory "${outputDir}" already exists and is not empty.`);
          UILogger.error(
            '  Use --force to overwrite existing files or choose a different directory.'
          );
          UILogger.error(
            `  Example: create-gh-project --name ${projectName} --output ./my-${projectName}`
          );
          process.exit(1);
        } else {
          UILogger.step(
            `⚠️ Directory "${outputDir}" exists and will be overwritten (--force specified)`
          );
        }
      }
    }

    // All validations passed, start the process
    UILogger.startProcess();

    // Get author info from GitHub API (slow operation after all validations)
    UILogger.step('🔍 Getting author information from GitHub…');
    const githubInfo = await getGitHubInfo();

    UILogger.projectSummary({
      name: projectName,
      outputDir,
      description,
      author: githubInfo.name,
      license: options.license,
    });

    const config: ProjectConfig = {
      name: projectName,
      description,
      author: githubInfo.name,
      githubUsername: githubInfo.username,
      license: options.license as SupportedLicense,
      outputDir,
    };

    await createProjectStructure(config);

    let githubRepoUrl: string | null = null;
    if (options.github) {
      UILogger.step('\n🐙 Setting up GitHub repository…');
      githubRepoUrl = await setupGitHub({
        name: projectName,
        description,
        isPrivate: options.private,
        outputDir,
      });
    }

    UILogger.projectComplete();

    // Show GitHub success message after project structure, before next steps
    if (githubRepoUrl) {
      console.log('✅ GitHub repository created and pushed successfully!');
      console.log(`🌐 Repository URL: ${githubRepoUrl}\n`);
    }

    UILogger.nextSteps(outputDir);
  } catch (error) {
    UILogger.error(`Error: ${error}`);
    process.exit(1);
  }
}

main();
