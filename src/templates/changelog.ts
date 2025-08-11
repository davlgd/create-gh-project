import { ProjectConfig } from '../types.js';

export function generateChangelog(config: ProjectConfig): string {
  const today = new Date().toISOString().split('T')[0];

  return `# Changelog

All notable changes to ${config.name} will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup
- Basic project structure
- TypeScript configuration
- ESLint and formatting setup
- Testing framework setup
- CI/CD pipeline configuration

### Changed
- Nothing yet

### Deprecated
- Nothing yet

### Removed
- Nothing yet

### Fixed
- Nothing yet

### Security
- Nothing yet

## [0.1.0] - ${today}

### Added
- Initial release of ${config.name}
- Core functionality implementation
- Basic project structure
- Comprehensive documentation
- Test suite setup
- CI/CD integration
- ${config.license} license

---

**Note**: This project follows [Semantic Versioning](https://semver.org/) and dates are in YYYY-MM-DD format.
`;
}
