/**
 * Template generation service
 * Centralized template generation with consistent file structure
 */
import { join } from 'path';

import { generateChangelog } from '../templates/changelog.js';
import { generateClaudeAgents } from '../templates/claude-agents.js';
import { generateClaudeMd } from '../templates/claude-md.js';
import { generateEditorconfig } from '../templates/editorconfig.js';
import { generateGitHubWorkflows } from '../templates/github-workflows.js';
import { generateGitignore } from '../templates/gitignore.js';
import { generateLicense } from '../templates/license.js';
// Template imports
import { generateReadme } from '../templates/readme.js';
import { ProjectConfig } from '../types.js';
import { FileGeneratorOptions } from '../types.js';

export class TemplateGeneratorService {
  /**
   * Generate all core project files
   */
  static generateCoreFiles(config: ProjectConfig): FileGeneratorOptions[] {
    const { outputDir } = config;

    return [
      {
        outputPath: join(outputDir, 'README.md'),
        content: generateReadme(config),
      },
      {
        outputPath: join(outputDir, 'CLAUDE.md'),
        content: generateClaudeMd(config),
      },
      {
        outputPath: join(outputDir, 'CHANGELOG.md'),
        content: generateChangelog(config),
      },
      {
        outputPath: join(outputDir, 'LICENSE'),
        content: generateLicense(config),
      },
      {
        outputPath: join(outputDir, '.gitignore'),
        content: generateGitignore(),
      },
      {
        outputPath: join(outputDir, '.editorconfig'),
        content: generateEditorconfig(),
      },
    ];
  }

  /**
   * Generate GitHub workflow files
   */
  static generateWorkflowFiles(config: ProjectConfig): FileGeneratorOptions[] {
    const workflowsDir = join(config.outputDir, '.github', 'workflows');
    const workflows = generateGitHubWorkflows(config);

    return Object.entries(workflows).map(([filename, content]) => ({
      outputPath: join(workflowsDir, filename),
      content,
    }));
  }

  /**
   * Generate Claude agent files
   */
  static generateClaudeAgentFiles(config: ProjectConfig): FileGeneratorOptions[] {
    const claudeAgentsDir = join(config.outputDir, '.claude', 'agents');
    const agents = generateClaudeAgents();

    return Object.entries(agents).map(([filename, content]) => ({
      outputPath: join(claudeAgentsDir, filename),
      content,
    }));
  }

  /**
   * Generate all project files
   */
  static generateAllFiles(config: ProjectConfig): FileGeneratorOptions[] {
    return [
      ...this.generateCoreFiles(config),
      ...this.generateWorkflowFiles(config),
      ...this.generateClaudeAgentFiles(config),
    ];
  }
}
