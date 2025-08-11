import { describe, expect, it } from 'bun:test';

import { generateChangelog } from '../src/templates/changelog';
import { generateClaudeAgents } from '../src/templates/claude-agents';
import { generateClaudeMd } from '../src/templates/claude-md';
import { generateEditorconfig } from '../src/templates/editorconfig';
import { generateGitHubWorkflows } from '../src/templates/github-workflows';
import { generateGitignore } from '../src/templates/gitignore';
import { generateLicense } from '../src/templates/license';
import { generateReadme } from '../src/templates/readme';

const mockConfig = {
  name: 'test-project',
  description: 'A test project',
  author: 'Test Author',
  githubUsername: 'testauthor',
  license: 'MIT' as const,
  outputDir: './test-project',
};

describe('Template Generation', () => {
  describe('generateReadme', () => {
    it('should generate a valid README with project information', () => {
      const readme = generateReadme(mockConfig);

      expect(readme).toContain('# test-project');
      expect(readme).toContain('A test project');
      expect(readme).toContain('github.com/testauthor/test-project');
      expect(readme).toContain('MIT');
      expect(readme).toContain('[![CI]');
      expect(readme).toContain('[![License]');
    });

    it('should handle different GitHub usernames', () => {
      const configWithDifferentUsername = { ...mockConfig, githubUsername: 'different-user' };
      const readme = generateReadme(configWithDifferentUsername);

      expect(readme).toContain('github.com/different-user/test-project');
      expect(readme).toContain('Made with ❤️ for the Open Source Community');
    });

    it('should generate correct project name kebab case', () => {
      const configWithSpaces = { ...mockConfig, name: 'My Awesome Project' };
      const readme = generateReadme(configWithSpaces);

      expect(readme).toContain('# My Awesome Project');
      expect(readme).toContain('/my-awesome-project/');
    });
  });

  describe('generateLicense', () => {
    it('should generate MIT license correctly', () => {
      const license = generateLicense(mockConfig);
      const currentYear = new Date().getFullYear();

      expect(license).toContain('MIT License');
      expect(license).toContain(`Copyright (c) ${currentYear} Test Author`);
      expect(license).toContain('Permission is hereby granted');
    });

    it('should generate Apache 2.0 license correctly', () => {
      const apacheConfig = { ...mockConfig, license: 'Apache-2.0' as const };
      const license = generateLicense(apacheConfig);
      const currentYear = new Date().getFullYear();

      expect(license).toContain('Apache License');
      expect(license).toContain('Version 2.0');
      expect(license).toContain(`Copyright ${currentYear} Test Author`);
    });

    it('should throw error for unsupported license', () => {
      const invalidConfig = { ...mockConfig, license: 'GPL' as 'MIT' | 'Apache-2.0' };

      expect(() => generateLicense(invalidConfig)).toThrow('Unsupported license: GPL');
    });
  });

  describe('generateChangelog', () => {
    it('should generate changelog with correct structure', () => {
      const changelog = generateChangelog(mockConfig);

      expect(changelog).toContain('# Changelog');
      expect(changelog).toContain('All notable changes to test-project');
      expect(changelog).toContain('[Unreleased]');
      expect(changelog).toContain('[0.1.0]');
      expect(changelog).toContain('### Added');
      expect(changelog).toContain('Initial release');
    });

    it('should include current date', () => {
      const changelog = generateChangelog(mockConfig);
      const today = new Date().toISOString().split('T')[0];

      expect(changelog).toContain(`[0.1.0] - ${today}`);
    });
  });

  describe('generateClaudeMd', () => {
    it('should generate comprehensive AI instructions', () => {
      const claudeMd = generateClaudeMd(mockConfig);

      expect(claudeMd).toContain('# test-project - Development Instructions');
      expect(claudeMd).toContain('KISS (Keep It Simple, Stupid)');
      expect(claudeMd).toContain("DRY (Don't Repeat Yourself)");
      expect(claudeMd).toContain('SOLID Principles');
      expect(claudeMd).toContain('Token Efficiency Requirements');
      expect(claudeMd).toContain('User Experience & Interface Design');
      expect(claudeMd).toContain('Documentation Excellence');
    });

    it('should include project-specific information', () => {
      const claudeMd = generateClaudeMd(mockConfig);

      expect(claudeMd).toContain('**License**: MIT | **Author**: Test Author');
      expect(claudeMd).toContain('This project is **test-project**');
    });
  });

  describe('generateGitignore', () => {
    it('should generate comprehensive gitignore', () => {
      const gitignore = generateGitignore();

      expect(gitignore).toContain('node_modules/');
      expect(gitignore).toContain('.env');
      expect(gitignore).toContain('dist/');
      expect(gitignore).toContain('.DS_Store');
      expect(gitignore).toContain('.claude/');
      expect(gitignore).toContain('claude-conversations/');
    });
  });

  describe('generateEditorconfig', () => {
    it('should generate valid editorconfig', () => {
      const editorconfig = generateEditorconfig();

      expect(editorconfig).toContain('root = true');
      expect(editorconfig).toContain('charset = utf-8');
      expect(editorconfig).toContain('end_of_line = lf');
      expect(editorconfig).toContain('indent_style = space');
      expect(editorconfig).toContain('indent_size = 2');
    });
  });

  describe('generateGitHubWorkflows', () => {
    it('should generate CI and release workflows', () => {
      const workflows = generateGitHubWorkflows(mockConfig);

      expect(Object.keys(workflows)).toContain('ci.yml');
      expect(Object.keys(workflows)).toContain('release.yml');
      expect(Object.keys(workflows)).not.toContain('dependabot.yml'); // Dependabot removed
    });

    it('should include modern action versions', () => {
      const workflows = generateGitHubWorkflows(mockConfig);

      expect(workflows['ci.yml']).toContain('actions/checkout@v4');
      expect(workflows['ci.yml']).toContain('actions/setup-node@v4');
      expect(workflows['ci.yml']).toContain("node-version: '22'");
      expect(workflows['ci.yml']).toContain('npm ci');
      expect(workflows['ci.yml']).toContain('npm run lint');
      expect(workflows['ci.yml']).toContain('npm run typecheck');
    });
  });

  describe('generateClaudeAgents', () => {
    it('should generate all three Claude agent files', () => {
      const agents = generateClaudeAgents(mockConfig);

      const keys = Object.keys(agents);
      expect(keys).toHaveLength(3);
      expect(keys).toContain('code-quality-reviewer.md');
      expect(keys).toContain('documentation-maintainer.md');
      expect(keys).toContain('release-preparation-validator.md');
    });

    it('should include proper YAML frontmatter for each agent', () => {
      const agents = generateClaudeAgents(mockConfig);

      // Check code-quality-reviewer
      expect(agents['code-quality-reviewer.md']).toContain('name: code-quality-reviewer');
      expect(agents['code-quality-reviewer.md']).toContain('model: sonnet');
      expect(agents['code-quality-reviewer.md']).toContain('color: green');

      // Check documentation-maintainer
      expect(agents['documentation-maintainer.md']).toContain('name: documentation-maintainer');
      expect(agents['documentation-maintainer.md']).toContain('model: sonnet');
      expect(agents['documentation-maintainer.md']).toContain('color: cyan');

      // Check release-preparation-validator
      expect(agents['release-preparation-validator.md']).toContain(
        'name: release-preparation-validator'
      );
      expect(agents['release-preparation-validator.md']).toContain('model: sonnet');
      expect(agents['release-preparation-validator.md']).toContain('color: green');
    });

    it('should include specific functionality descriptions', () => {
      const agents = generateClaudeAgents(mockConfig);

      // Code quality reviewer should mention DRY/KISS/SOLID
      expect(agents['code-quality-reviewer.md']).toContain('DRY/KISS/SOLID');
      expect(agents['code-quality-reviewer.md']).toContain('Code Quality Architect');

      // Documentation maintainer should mention README
      expect(agents['documentation-maintainer.md']).toContain('README.md');
      expect(agents['documentation-maintainer.md']).toContain(
        'Documentation Maintenance Specialist'
      );

      // Release validator should mention version
      expect(agents['release-preparation-validator.md']).toContain('semantic version');
      expect(agents['release-preparation-validator.md']).toContain(
        'Release Preparation Specialist'
      );
    });
  });
});
