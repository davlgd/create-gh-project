import { join } from 'path';

import { FileSystemService } from './services/file-system.js';
import { TemplateGeneratorService } from './services/template-generator.js';
import { UILogger } from './services/ui-logger.js';
import { ProjectConfig } from './types.js';

/**
 * Create complete project structure with all files and directories
 * Following Single Responsibility Principle - orchestrates the process
 */
export async function createProjectStructure(config: ProjectConfig): Promise<void> {
  const projectPath = config.outputDir;

  // Step 1: Create directory structure
  UILogger.step(`📁 Creating project directory: ${projectPath}`);
  createProjectDirectories(projectPath);

  // Step 2: Generate and write all files
  UILogger.step('📝 Generating core files…');
  const allFiles = TemplateGeneratorService.generateAllFiles(config);
  FileSystemService.writeFiles(allFiles);

  // Step 3: Create symbolic link for GitHub Copilot
  UILogger.step('🔗 Creating symbolic link for GitHub Copilot…');
  await createCopilotSymlink(projectPath);

  UILogger.success('Project structure created successfully!');
}

/**
 * Create required directory structure
 * Separated for better testability and single responsibility
 */
function createProjectDirectories(projectPath: string): void {
  // Create main project directory if needed
  if (projectPath !== '.' && !FileSystemService.directoryExists(projectPath)) {
    FileSystemService.createDirectories({
      basePath: '.',
      directories: [projectPath],
    });
  }

  // Create GitHub-specific directories
  FileSystemService.createDirectories({
    basePath: projectPath,
    directories: ['.github', '.github/workflows'],
  });
}

/**
 * Create symbolic link for GitHub Copilot instructions
 * Separated for better error handling and testability
 */
async function createCopilotSymlink(projectPath: string): Promise<void> {
  const claudeSymlinkPath = join(projectPath, '.github', 'copilot-instructions.md');
  const claudeRelativePath = '../CLAUDE.md';

  const success = await FileSystemService.createSymlink(claudeRelativePath, claudeSymlinkPath);

  if (success) {
    UILogger.success('Symbolic link created successfully');
  } else {
    UILogger.warning('Could not create symbolic link for GitHub Copilot');
  }
}
