# create-gh-project

[![CI](https://github.com/davlgd/create-gh-project/actions/workflows/ci.yml/badge.svg)](https://github.com/davlgd/create-gh-project/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/create-gh-project?color=red)](https://www.npmjs.com/package/create-gh-project)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**Bootstrap production-ready projects in seconds.** Complete setup with AI context, quality tools, and GitHub workflows - skip hours of tedious configuration.

## 🌟 Features

- **🚀 Ready-to-use project structure** for professional development
- **🤖 Automated GitHub repository creation** with proper settings with `gh` CLI
- **⚙️ Pre-configured quality tools**: ESLint, Prettier, TypeScript
- **🧠 AI development context**: CLAUDE.md and specialized Claude agents
- **🔄 GitHub Actions workflows** for CI/CD pipelines
- **📚 Comprehensive documentation** templates
- **📄 License options**: MIT or Apache-2.0

## 🚀 Usage Examples

### Quick Start

```bash
# Basic project
npm create gh-project my-app
```

### Advanced Usage

```bash
# With custom description and MIT license
npm create gh-project my-app -- -d "My awesome application" -l MIT

# Create GitHub repository automatically
npm create gh-project my-app -- --github

# Private GitHub repository
npm create gh-project my-app -- --github --private
```

### What You Get

Your project includes everything for professional development:

- **Project structure** with proper organization
- **AI development context** (CLAUDE.md + specialized Claude agents)
- **Quality tools** (ESLint, Prettier, TypeScript) pre-configured
- **GitHub workflows** for automated CI/CD
- **Documentation templates** ready to customize
- **Proper licensing** and gitignore files

Perfect for prototypes, professional projects, and AI-assisted development.

### Explore Your Project

```bash
# See what was created
ls -lah
# You'll find: README.md, CLAUDE.md, .github/, and more!

# Open in your editor - AI assistants will understand your project immediately
code .
```

## 📋 Command Reference

```bash
npm create gh-project <name> -- [options]
# or
bun create gh-project <name> --
[options]

Arguments:
  name                      Project name (default: "new-project")

Options:
  -o, --output <directory>  Output directory (default: project name)
  -d, --description <desc>  Project description
  -l, --license <license>   License type (MIT or Apache-2.0) (default: "Apache-2.0")
  -g, --github              Create GitHub repository (default: false)
  -p, --private             Create private repository (only with --github) (default: false)
  -f, --force               Overwrite existing directory without confirmation (default: false)
  -h, --help                Display help for command
  -V, --version             Display version number
```

## 📁 What's Generated

Your generated project includes comprehensive AI context:

- **CLAUDE.md**: Complete development guidelines and project context
- **copilot-instructions.md**: GitHub Copilot optimization (symlinked to CLAUDE.md)
- **Claude agents**: Specialized agents for code review, documentation, and releases

AI assistants immediately understand your project structure, coding standards, and development workflow without additional context.

## Advanced Features

- **Smart validation** - Project names checked for GitHub compatibility
- **Directory protection** - Safe overwrites with `--force` flag
- **GitHub integration** - Automatic repository creation with real username detection
- **Security focused** - Input validation and safe command execution

File and directory structure will look like this:

```
my-project/
├── README.md                           # Comprehensive project documentation
├── CLAUDE.md                           # AI development instructions & context
├── CHANGELOG.md                        # Semantic versioning changelog
├── LICENSE                             # MIT or Apache-2.0 license
├── .gitignore                          # Comprehensive gitignore rules
├── .editorconfig                       # Editor configuration
├── tsconfig.json                       # TypeScript configuration
├── .eslintrc.json                      # ESLint configuration with quality rules
├── .claude/                            # Claude AI agents for development tasks
│   ├── agents/
│   │   ├── code-quality-reviewer.md    # Agent for code quality reviews
│   │   ├── doc-writer.md               # Agent for writing documentation
│   │   └── release-manager.md          # Agent for managing releases
└── .github/
    ├── workflows/
    │   ├── ci.yml           # Automated CI pipeline
    │   └── release.yml      # Automated releases
    └── copilot-instructions.md  # GitHub Copilot AI instructions (links to CLAUDE.md)
```

## 🛠️ Development

### Prerequisites

Make sure you have the following installed:

- Git for version control
- GitHub CLI for repository management
- Node.js >= 22 or Bun >= 1.2 to run the CLI

```bash
# Clone and setup
git clone https://github.com/davlgd/create-gh-project.git
cd create-gh-project
bun install  # or npm install

# Test the CLI locally
bun run src/index.ts test-project --output /tmp/test-project

# Run full validation suite
bun run validate  # typecheck + lint + test
# Fix lint and format issues automatically
bun run fix
```

### Development Workflow

- **Check CI status**: The workflows in \`.github/workflows/\` provide automated testing
- **Follow conventions**: See \`CLAUDE.md\` for coding standards and best practices
- **Update documentation**: Keep README and other docs current with changes
- **Test thoroughly**: Ensure quality before committing

Use available Claude Agents to help: @code-quality-reviewer, @documentation-maintainer, @release-preparation-validator.

## 🤝 Contributing

Contributions are welcome! Just follow these steps:

1. Fork the repository
2. Create a feature branch: \`git checkout -b user/your-feature\`
3. Make your changes following the project's conventions
4. Test your changes thoroughly
5. Update documentation if needed
6. Commit with clear, descriptive messages
7. Push to your branch: \`git push origin feature/your-feature\`
8. Open a Pull Request

You can edit and enhance templates through `src/templates/` and `src/services/template-generator.ts`.

## 📄 License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Bun](https://bun.sh) - Fast JS/TS runtime
- CLI powered by [Commander.js](https://github.com/tj/commander.js)

---

⭐ Found this useful? Give it a star [on GitHub](https://github.com/davlgd/create-gh-project) and share it with others!

Made with ❤️ for the Open Source Community
