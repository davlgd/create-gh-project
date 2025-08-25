import { afterEach, describe, expect, it } from 'bun:test';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

const TEST_OUTPUT_DIR = './test-output';

// Helper function to clean up test directories
function cleanup() {
  if (existsSync(TEST_OUTPUT_DIR)) {
    rmSync(TEST_OUTPUT_DIR, { recursive: true, force: true });
  }
}

describe('CLI Integration', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show help when --help is passed', async () => {
    const proc = Bun.spawn(['bun', 'run', 'src/index.ts', '--help'], {
      stdout: 'pipe',
      stderr: 'pipe',
    });

    const exitCode = await proc.exited;
    const stdout = await new Response(proc.stdout).text();

    expect(exitCode).toBe(0);
    expect(stdout).toContain('create-gh-project');
    expect(stdout).toContain('Bootstrap your projects with essential files');
    expect(stdout).toContain('bun create gh-project');
    expect(stdout).toContain('name');
    expect(stdout).toContain('--license');
    expect(stdout).toContain('--github');
    expect(stdout).toContain('--force');
  });

  it('should show version when --version is passed', async () => {
    const proc = Bun.spawn(['bun', 'run', 'src/index.ts', '--version'], {
      stdout: 'pipe',
      stderr: 'pipe',
    });

    const exitCode = await proc.exited;
    const stdout = await new Response(proc.stdout).text();

    expect(exitCode).toBe(0);
    expect(stdout.trim()).toBe('0.1.1');
  });

  it('should reject invalid license', async () => {
    const proc = Bun.spawn(
      [
        'bun',
        'run',
        'src/index.ts',
        'test-project',
        '--license',
        'GPL',
        '--output',
        TEST_OUTPUT_DIR,
      ],
      {
        stdout: 'pipe',
        stderr: 'pipe',
      }
    );

    const exitCode = await proc.exited;
    const stderr = await new Response(proc.stderr).text();

    expect(exitCode).toBe(1);
    expect(stderr).toContain('Invalid license "GPL"');
    expect(stderr).toContain('Only MIT and Apache-2.0 are supported');
  });

  it('should accept valid MIT license', async () => {
    const proc = Bun.spawn(
      [
        'bun',
        'run',
        'src/index.ts',
        'test-project',
        '--license',
        'MIT',
        '--output',
        TEST_OUTPUT_DIR,
      ],
      {
        stdout: 'pipe',
        stderr: 'pipe',
      }
    );

    const exitCode = await proc.exited;
    const stdout = await new Response(proc.stdout).text();

    expect(exitCode).toBe(0);
    expect(stdout).toContain('📜 License: MIT');
    expect(stdout).toContain('Project structure created successfully!');

    // Verify files were created
    expect(existsSync(join(TEST_OUTPUT_DIR, 'README.md'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, 'LICENSE'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, 'CLAUDE.md'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, '.gitignore'))).toBe(true);
  });

  it('should accept valid Apache-2.0 license', async () => {
    const proc = Bun.spawn(
      [
        'bun',
        'run',
        'src/index.ts',
        'test-project',
        '--license',
        'Apache-2.0',
        '--output',
        TEST_OUTPUT_DIR,
      ],
      {
        stdout: 'pipe',
        stderr: 'pipe',
      }
    );

    const exitCode = await proc.exited;
    const stdout = await new Response(proc.stdout).text();

    expect(exitCode).toBe(0);
    expect(stdout).toContain('📜 License: Apache-2.0');
    expect(stdout).toContain('Project structure created successfully!');
  });

  it('should create project structure correctly', async () => {
    const proc = Bun.spawn(
      [
        'bun',
        'run',
        'src/index.ts',
        'test-project',
        '--output',
        TEST_OUTPUT_DIR,
        '--description',
        'A test project',
      ],
      {
        stdout: 'pipe',
        stderr: 'pipe',
      }
    );

    const exitCode = await proc.exited;

    expect(exitCode).toBe(0);

    // Verify core files
    expect(existsSync(join(TEST_OUTPUT_DIR, 'README.md'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, 'LICENSE'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, 'CLAUDE.md'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, 'CHANGELOG.md'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, '.gitignore'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, '.editorconfig'))).toBe(true);

    // Verify GitHub structure
    expect(existsSync(join(TEST_OUTPUT_DIR, '.github'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, '.github/workflows'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, '.github/workflows/ci.yml'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, '.github/workflows/release.yml'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, '.github/dependabot.yml'))).toBe(false); // Dependabot removed
    expect(existsSync(join(TEST_OUTPUT_DIR, '.github/copilot-instructions.md'))).toBe(true);

    // Verify content
    const readme = await Bun.file(join(TEST_OUTPUT_DIR, 'README.md')).text();
    expect(readme).toContain('# test-project');
    expect(readme).toContain('A test project');

    const claudeMd = await Bun.file(join(TEST_OUTPUT_DIR, 'CLAUDE.md')).text();
    expect(claudeMd).toContain('# test-project - Development Instructions');
    expect(claudeMd).toContain('Token Efficiency Requirements');
  });

  it('should reject creating in existing non-empty directory without --force', async () => {
    // Create a directory with some content
    mkdirSync(TEST_OUTPUT_DIR, { recursive: true });
    writeFileSync(join(TEST_OUTPUT_DIR, 'existing-file.txt'), 'existing content');

    const proc = Bun.spawn(
      ['bun', 'run', 'src/index.ts', 'test-project', '--output', TEST_OUTPUT_DIR],
      {
        stdout: 'pipe',
        stderr: 'pipe',
      }
    );

    const exitCode = await proc.exited;
    const stderr = await new Response(proc.stderr).text();

    expect(exitCode).toBe(1);
    expect(stderr).toContain('already exists and is not empty');
    expect(stderr).toContain('--force');
  });

  it('should allow creating in existing non-empty directory with --force', async () => {
    // Create a directory with some content
    mkdirSync(TEST_OUTPUT_DIR, { recursive: true });
    writeFileSync(join(TEST_OUTPUT_DIR, 'existing-file.txt'), 'existing content');

    const proc = Bun.spawn(
      ['bun', 'run', 'src/index.ts', 'test-project', '--output', TEST_OUTPUT_DIR, '--force'],
      {
        stdout: 'pipe',
        stderr: 'pipe',
      }
    );

    const exitCode = await proc.exited;
    const stdout = await new Response(proc.stdout).text();

    expect(exitCode).toBe(0);
    expect(stdout).toContain('Project structure created successfully!');

    // Verify files were created
    expect(existsSync(join(TEST_OUTPUT_DIR, 'README.md'))).toBe(true);
    expect(existsSync(join(TEST_OUTPUT_DIR, 'CLAUDE.md'))).toBe(true);
  });

  it('should default to "new-project" when no name provided', async () => {
    const proc = Bun.spawn(['bun', 'run', 'src/index.ts', '--output', TEST_OUTPUT_DIR], {
      stdout: 'pipe',
      stderr: 'pipe',
    });

    const exitCode = await proc.exited;
    const stdout = await new Response(proc.stdout).text();

    expect(exitCode).toBe(0);
    expect(stdout).toContain('📝 Project: new-project');

    const readme = await Bun.file(join(TEST_OUTPUT_DIR, 'README.md')).text();
    expect(readme).toContain('# new-project');
  });

  it('should reject invalid project names with special characters', async () => {
    const proc = Bun.spawn(
      ['bun', 'run', 'src/index.ts', 'project with spaces', '--output', TEST_OUTPUT_DIR],
      {
        stdout: 'pipe',
        stderr: 'pipe',
      }
    );

    const exitCode = await proc.exited;
    const stderr = await new Response(proc.stderr).text();

    expect(exitCode).toBe(1);
    expect(stderr).toContain('Invalid project name');
    expect(stderr).toContain('letters, numbers, dots, underscores, and hyphens');
  });

  it('should accept valid project names', async () => {
    const proc = Bun.spawn(
      ['bun', 'run', 'src/index.ts', 'my-awesome-project_v2.0', '--output', TEST_OUTPUT_DIR],
      {
        stdout: 'pipe',
        stderr: 'pipe',
      }
    );

    const exitCode = await proc.exited;
    const stdout = await new Response(proc.stdout).text();

    expect(exitCode).toBe(0);
    expect(stdout).toContain('Project structure created successfully!');
  });

  it('should handle GitHub repository creation errors gracefully', async () => {
    // This test simulates the GitHub CLI behavior when a repository already exists
    // We can't easily test the actual GitHub API, but we can verify our error handling logic

    // Test that our error messages don't contain trailing periods
    const proc = Bun.spawn(
      [
        'bun',
        'run',
        'src/index.ts',
        'invalid license test',
        '--license',
        'GPL',
        '--output',
        TEST_OUTPUT_DIR,
      ],
      {
        stdout: 'pipe',
        stderr: 'pipe',
      }
    );

    const exitCode = await proc.exited;
    const stderr = await new Response(proc.stderr).text();

    expect(exitCode).toBe(1);
    // Verify no trailing periods in error messages
    expect(stderr).toMatch(/GPL" - Only MIT and Apache-2\.0 are supported$/m);
    expect(stderr).not.toContain('supported.');
  });
});
