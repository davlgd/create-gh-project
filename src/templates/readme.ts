import { ProjectConfig } from '../types.js';

export function generateReadme(config: ProjectConfig): string {
  const projectNameKebab = config.name.toLowerCase().replace(/\s+/g, '-');
  const githubUsername = config.githubUsername;

  // Format license for URL (Apache-2.0 needs to be encoded as Apache--2.0)
  const licenseUrlEncoded = config.license.replace(/-/g, '--');

  return `# ${config.name}

[![CI](https://github.com/${githubUsername}/${projectNameKebab}/actions/workflows/ci.yml/badge.svg)](https://github.com/${githubUsername}/${projectNameKebab}/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-${licenseUrlEncoded}-blue.svg)](https://opensource.org/licenses/${config.license})

${config.description}

## 🌟 Features

- 🚀 Add a short list of main features here

## 📦 Installation

### Package manager

\`\`\`bash
# Instructions
\`\`\`

### Pre-compiled Binaries

Download from [releases page](https://github.com/${githubUsername}/${projectNameKebab}/releases) for Linux, macOS, or Windows.

## 🚀 Usage Examples

### Quick Start

\`\`\`bash
# Example command to run the project
\`\`\`

### Advanced Usage

\`\`\`bash
# Example command with advanced options
\`\`\`

## 📋 Command Reference

If it's a CLI tool, provide a brief command reference here. For example:

| Option    | Alias | Description               | Example                |
|-----------|-------|---------------------------|------------------------|
| --help.   | -h    | Show help information     | \`tool --help\`        |
| --version | -v    | Show version information  | \`tool --version\`     |

## 🎯 Use Cases

Describe the main use cases for your project here, with examples if possible.

### Example Use Case 1

\`\`\`bash
# Command or code snippet for use case 1
\`\`\`

## 📝 Detail some features

Describe some of the key features of your project in more detail.

## 🛠️ Development

### Prerequisites

Make sure you have the following installed:
- Git for version control
- The package manager
- Any additional tools specific to your tech stack

This repository comes pre-configured with:

- 📁 **Project Structure**: Organized and scalable directory layout
- 🔧 **Development Tools**: Linting, formatting, and quality checks
- 🧪 **Testing Setup**: Testing framework configuration and examples
- 🚀 **CI/CD Pipeline**: Automated workflows for testing and deployment
- 📚 **Documentation**: This README plus AI-friendly development guides
- 🤖 **AI Integration**: \`CLAUDE.md\` and \`copilot-instructions.md\` for AI assistants

### Project Architecture

- Describe the overall architecture of the project here, with file tree if helpful

\`\`\`
${projectNameKebab}/
├── file1
├── directory1/
|   └── file2
└── ...
\`\`\`

### Building

\`\`\`bash
git clone https://github.com/${githubUsername}/${projectNameKebab}.git
cd ${projectNameKebab}

# adapt to your technology stack
\`\`\`

### Development Workflow

- **Check CI status**: The workflows in \`.github/workflows/\` provide automated testing
- **Follow conventions**: See \`CLAUDE.md\` for coding standards and best practices
- **Update documentation**: Keep README and other docs current with changes
- **Test thoroughly**: Ensure quality before committing

Use available Claude Agents to help: @code-quality-reviewer, @documentation-maintainer, @release-preparation-validator.

### Quality standards

This project adheres to high-quality standards, including:
- Code quality: Follow DRY/KISS/SOLID principles
- Format and lint: use dedicated tools for consistent code style
- Testing: Comprehensive unit and integration tests, run and adapt them
- Documentation: Clear and thorough documentation for users and developers

## 🤝 Contributing

Contributions are welcome! Just follow these steps:

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/your-feature\`
3. Make your changes following the project's conventions
4. Test your changes thoroughly
5. Update documentation if needed
6. Commit with clear, descriptive messages
7. Push to your branch: \`git push origin feature/your-feature\`
8. Open a Pull Request

Here you can add steps more specific to your project if users can only provide help for documentations, parts of code, templates, etc.

## 🙏 Acknowledgments

- Built with [create-gh-project](https://github.com/davlgd/create-gh-project)
- Add your own acknowledgments here

## 📄 License

This project is licensed under the ${config.license} License - see the [LICENSE](LICENSE) file for details.

---

⭐ Found this useful? Give it a star [on GitHub](https://github.com/${githubUsername}/${projectNameKebab}) and share it with others!

Made with ❤️ for the Open Source Community
`;
}
