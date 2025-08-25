# Changelog

All notable changes to create-gh-project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2025-08-24

### Fixed

- **SSH Authentication**: Fixed SSH passphrase input for GitHub repository creation
  - Added interactive mode for `gh repo create` and `git push` commands  
  - Enabled stdin inheritance for SSH key authentication prompts
  - Resolved blocking issue for users with SSH key passphrases

- **Error Handling**: Improved GitHub repository creation error management
  - Better handling of "repository already exists" errors with graceful user messages
  - Proper stderr/stdout stream usage following Unix conventions
  - Removed trailing periods from error messages for better UX

### Changed

- **CLI Documentation**: Updated help examples and documentation
  - Added proper npm/bun create syntax with "--" separator in help output
  - Aligned CLI help examples with README documentation
  - Improved package manager usage clarity

### Technical

- Enhanced `runCommand` function with interactive mode support
- Maintained 100% test coverage (29 tests)
- No breaking changes - full backward compatibility preserved

## [0.1.0] - 2025-08-24

### Added

- **CLI Tool**: Complete project scaffolding tool with Commander.js interface
- **Project Structure**: Automated generation of essential project files:
  - README.md with comprehensive documentation and CI badges
  - CLAUDE.md with AI development context and instructions
  - CHANGELOG.md following semantic versioning standards
  - LICENSE file (MIT or Apache-2.0 options)
  - .gitignore with comprehensive rules for Node.js projects
  - .editorconfig for consistent code formatting
  - TypeScript configuration (tsconfig.json) with strict mode
  - ESLint configuration with quality and security rules
- **GitHub Integration**:
  - Automated repository creation with public/private options
  - GitHub Actions workflows for CI/CD pipeline
  - Automatic release workflow with semantic versioning
- **Command Options**:
  - Project name and description configuration
  - Custom output directory specification
  - License type selection (MIT/Apache-2.0)
  - Force overwrite protection with `--force` flag
- **AI-Ready Setup**:
  - Comprehensive CLAUDE.md with development context
  - GitHub Copilot instructions (symlinked to CLAUDE.md)
  - Specialized Claude agents for code quality, documentation, and releases
  - Optimized for Claude Code, Cursor, and other AI assistants
- **Security Features**:
  - Input validation for GitHub-compatible project names
  - Command injection prevention using parameter arrays
  - Directory protection against accidental overwrites
  - Fast local validation before external API calls
- **Quality Assurance**:
  - Comprehensive test suite with 28+ tests
  - TypeScript strict mode compliance
  - ESLint rules for code quality
  - Template system with consistent patterns and validation

### Technical Details

- **Runtime**: Node.js >= 22 or Bun >= 1.2
- **Language**: TypeScript with strict mode and security best practices
- **CLI Framework**: Commander.js for argument parsing and help generation
- **Package Manager**: Works with npm, yarn, pnpm, and bun
- **Testing**: Comprehensive test suite with edge cases and security scenarios
- **Linting**: ESLint with TypeScript support and quality rules
- **Package Distribution**: Available via `npm create gh-project@latest` and `bun create gh-project`

---

**Note**: This project follows [Semantic Versioning](https://semver.org/) and dates are in YYYY-MM-DD format.
