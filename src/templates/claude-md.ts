import { ProjectConfig } from '../types.js';

export function generateClaudeMd(config: ProjectConfig): string {
  return `# ${config.name} - Development Instructions

## Project Overview

This project is **${config.name}**, ${config.description}

**License**: ${config.license} | **Author**: ${config.author}

## Core Development Principles

### 🎯 KISS (Keep It Simple, Stupid)
- **Simplicity over cleverness**: Write code that is easy to understand and maintain
- **Minimal dependencies**: Only add dependencies when absolutely necessary
- **Clear naming**: Use descriptive names for variables, functions, and classes
- **Avoid over-engineering**: Solve the current problem, not all possible future problems

### 🔄 DRY (Don't Repeat Yourself)
- **Extract common functionality**: Create reusable functions, classes, and modules
- **Configuration centralization**: Keep configuration in dedicated files
- **Template reuse**: Use templates and generators for repetitive code patterns
- **Documentation consistency**: Maintain consistent documentation patterns

### 🏗️ SOLID Principles
- **Single Responsibility**: Each class/function should have one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Derived classes must be substitutable for their base classes
- **Interface Segregation**: Many specific interfaces are better than one general-purpose interface
- **Dependency Inversion**: Depend on abstractions, not concretions

## Code Quality Standards (NON-NEGOTIABLE)

### 🧪 Testing Requirements
- **100% test coverage** for core business logic
- **Integration tests** for all public APIs and critical paths
- **No mocking shortcuts** - tests must verify actual behavior
- **Test-first approach** - write tests before implementation when possible
- **All tests must pass** - no exceptions, no workarounds
- **Performance tests** for critical operations
- **Edge case coverage** - test boundary conditions and error scenarios

### 🔍 Quality Gates
Before any commit or merge:
1. **All tests pass** (using your project's test runner)
2. **Linting passes** (using your project's linter)
3. **Code formatting is applied** (using your project's formatter)
4. **Type checking passes** (if applicable to your language)
5. **Security audit clean** (using your language's security tools)
6. **Documentation is updated** for any public API changes

### 📝 Documentation Requirements
- **README.md**: Always current with installation, usage, and examples
- **API documentation**: Document all public interfaces with examples
- **CHANGELOG.md**: Document ALL changes following semantic versioning
- **Code comments**: Explain WHY, not what - focus on business logic and complex decisions
- **Architecture decisions**: Document significant design choices and trade-offs

## Development Workflow (MANDATORY)

### 🔀 Feature Development Process
1. **Create feature branch** from main/master
2. **Write tests first** that describe the expected behavior
3. **Implement the minimum code** needed to make tests pass
4. **Refactor** while maintaining passing tests
5. **Update documentation** (README, API docs, CHANGELOG)
6. **Run all quality checks** - must pass 100%
7. **Code review** - at least one other developer must approve
8. **Merge only after** all checks pass and documentation is complete

### 🐛 Bug Fix Process
1. **Write a failing test** that reproduces the bug
2. **Fix the code** to make the test pass
3. **Ensure no regressions** - all existing tests still pass
4. **Update documentation** if the bug revealed incorrect documentation
5. **Add to CHANGELOG.md** as a fix

## Architecture Guidelines

### 📁 Code Organization
- **Separation of concerns**: Each module has a single, well-defined responsibility
- **Layered architecture**: Clear separation between presentation, business logic, and data layers
- **Dependency injection**: Use DI containers or manual injection for testability
- **Configuration externalization**: Environment-specific settings in config files
- **Error handling**: Consistent error handling patterns throughout the application

### 🔄 Maintainability Requirements
- **Modular design**: Code organized into logical, reusable modules
- **Clear interfaces**: Well-defined contracts between components
- **Minimal coupling**: Reduce dependencies between modules
- **High cohesion**: Related functionality grouped together
- **Extensible design**: Easy to add new features without breaking existing code

## AI Assistant Guidelines (CRITICAL)

### 🎯 Token Efficiency Requirements

**ALWAYS prioritize local tools and commands to minimize token usage:**

1. **Use local tools first**: Always prefer Read, LS, Grep, Glob, Bash tools over asking for information
2. **Batch operations**: Use multiple tool calls in single responses when possible
3. **Avoid redundant searches**: If you just read a file, don't search for the same information again
4. **Use specific searches**: Prefer targeted Grep/Glob over broad searches
5. **Cache information**: Remember what you've already discovered in the conversation
6. **Efficient exploration**: Use LS to understand directory structure before deep searches
7. **Direct file access**: Use Read tool for specific files rather than asking for file contents

**Examples of efficient patterns:**
- Use Grep to find functions instead of asking "where is function X?"
- Use LS to explore directory structure instead of asking "what files are in this project?"
- Use Read to examine specific files instead of asking for explanations
- Use Bash for quick checks instead of lengthy discussions

When working on this project, you MUST:

### ✅ Before Making ANY Changes
1. **Read and understand** existing code patterns and architecture
2. **Run existing tests** to ensure current functionality works
3. **Check code coverage** to understand what's already tested
4. **Review recent commits** to understand recent changes and patterns
5. **Check for framework/language updates**: Verify you're using latest stable versions
6. **Consult official documentation** for the technologies being used
7. **Ask user for clarification** when requirements or implementation approach is unclear

### ✅ During Development
1. **Write tests FIRST** - no exceptions
2. **Follow existing code style** and patterns consistently
3. **Use meaningful names** that express intent, not implementation
4. **Keep functions small** - single responsibility only
5. **Document complex logic** with clear comments explaining WHY
6. **Use latest stable versions** of all dependencies and frameworks
7. **Reference official documentation** when implementing new features or APIs
8. **Ask for user input** when making architectural decisions or choosing between approaches
9. **Prioritize UX in interface design** - consider color psychology, accessibility, and user flow
10. **Validate UX decisions with experts** before implementation
11. **Write documentation without redundancy** - ensure each piece of information appears only once

### ✅ Before Submitting Changes
1. **All tests pass** - run the full test suite
2. **Code coverage maintained** or improved
3. **Linting and formatting applied** - no style violations
4. **Documentation updated** - README, API docs, CHANGELOG
5. **Performance impact assessed** - no significant regressions
6. **Security review** - no new vulnerabilities introduced
7. **Dependencies are up-to-date** - ensure latest compatible versions are used
8. **Breaking changes documented** - if any, with migration guide

### ❌ NEVER Do This
- Skip writing tests ("I'll add them later")
- Commit code that doesn't pass quality checks
- Use \`any\` types in TypeScript without justification
- Copy-paste code without creating reusable functions
- Ignore linting errors or warnings
- Break backward compatibility without major version bump
- Commit secrets, API keys, or sensitive data
- Use deprecated APIs or libraries
- Write code without considering error scenarios
- **Use outdated versions** of frameworks or packages without justification
- **Implement without consulting documentation** of the relevant technology
- **Make assumptions** about user requirements instead of asking for clarification
- **Create interfaces without considering UX principles** (color, accessibility, user flow)
- **Overuse emojis** or use them without clear purpose in interfaces
- **Implement UX changes without expert validation**
- **Write duplicate documentation** or repeat information across files
- **Create verbose documentation** when concise information would suffice
- **Ask for information instead of using local tools** (wastes tokens)
- **Make multiple searches for the same information** (inefficient)
- **Use verbose responses when concise ones suffice** (token waste)

## 🧪 User Experience Testing (ESSENTIAL)

**Before any release or significant change, test as a real user:**

### Testing Process
1. **Fresh Perspective**: Act as someone discovering the project for the first time
2. **Documentation First**: Can a newcomer understand the project's value in 30 seconds?
3. **Setup Experience**: Follow the README from scratch - does it actually work?
4. **Error Scenarios**: Try breaking things - are error messages helpful?
5. **End-to-End Flows**: Test complete user journeys, not just code functionality

### Key Questions
- [ ] Is the project's purpose immediately clear?
- [ ] Can someone get started without prior knowledge?
- [ ] Are installation/setup instructions accurate and complete?
- [ ] Do error messages help users fix problems?
- [ ] Are examples realistic and working?
- [ ] Does the tool behave predictably?

### Beginner-Friendly Documentation Requirements
- **30-second value proposition**: What problem does this solve?
- **2-minute quickstart**: Working example that demonstrates core value
- **Progressive disclosure**: Essential info first, detailed options later
- **Visual feedback**: Show what success/failure looks like
- **Clear next steps**: What to do after initial setup

## Common Development Tasks

### Adding a New Feature
1. **Create feature branch**: \`git checkout -b feature/feature-name\`
2. **Write acceptance tests**: Define what success looks like
3. **Write unit tests**: Cover all code paths and edge cases
4. **Implement feature**: Minimal viable implementation
5. **Refactor and optimize**: Improve code quality while maintaining tests
6. **Update documentation**: README, API docs, examples
7. **Update CHANGELOG.md**: Document new functionality
8. **Code review**: Get feedback and approval
9. **Merge**: Only after all checks pass

### Refactoring Existing Code
1. **Ensure test coverage**: Add tests if missing
2. **Refactor in small steps**: Maintain green tests throughout
3. **Verify performance**: No significant regressions
4. **Update documentation**: Reflect any API changes
5. **Update examples**: Ensure they still work

### Performance Optimization
1. **Measure first**: Profile to identify actual bottlenecks
2. **Set performance targets**: Define acceptable performance metrics
3. **Implement optimizations**: Focus on measured bottlenecks
4. **Add performance tests**: Prevent future regressions
5. **Document trade-offs**: Explain optimization decisions

## Technology-Specific Guidelines

### 🔄 Version Management & Dependencies
- **Always use latest stable versions**: Prioritize the most recent stable releases of frameworks, languages, and packages
- **Stay current with LTS**: When available, prefer Long Term Support (LTS) versions for production stability
- **Regular dependency updates**: Schedule weekly/monthly dependency updates with thorough testing
- **Lock file management**: Always commit lock files (package-lock.json, yarn.lock, etc.)
- **Security audits**: Regular security scans and vulnerability fixes
- **Unused dependencies**: Regularly clean up unused packages
- **Documentation first**: Always consult official project documentation before implementation
- **Version compatibility**: Check compatibility matrices when updating major versions

### 📚 Research and Documentation Guidelines
- **Official documentation priority**: Always start with official project documentation
- **Release notes review**: Read release notes and migration guides for major updates
- **Community resources**: Use Stack Overflow, GitHub discussions, and community forums
- **Best practices**: Follow framework-specific best practices and coding standards
- **Performance benchmarks**: Check performance implications of version updates
- **Breaking changes**: Document and plan for breaking changes in major updates

### 🤖 LLM Collaboration Best Practices

#### **🎯 Project Structure & Organization**
- **Explicit file naming**: Use highly descriptive file names (user-authentication-service.ts vs auth.ts)
- **README-driven development**: Write comprehensive README before coding to clarify intentions
- **Component documentation**: Each module must have a MODULE.md explaining its role and usage
- **Decision log**: Maintain DECISIONS.md with architectural choices and their business rationale

#### **🗣️ Communication & Context Preservation**
- **User story format**: Structure requests as user stories with clear acceptance criteria
- **Context documentation**: Maintain CONTEXT.md with important decision history
- **Dependency mapping**: Document component dependencies and their relationships explicitly
- **Performance requirements**: Specify performance criteria upfront with measurable targets

#### **🧪 Testing & Validation Strategy**
- **Plain English test scenarios**: Write test cases in natural language before implementation
- **Integration test priority**: Focus on integration tests over unit tests for LLM-generated code
- **User acceptance testing**: Include tests based on real user scenarios and workflows
- **Error scenario coverage**: Explicitly test all identified error conditions and edge cases

#### **🔄 Iterative Development Patterns**
- **Small testable increments**: Each PR addresses single functionality with clear scope
- **Feature flags**: Enable progressive development with feature toggles
- **Rollback strategy**: Document rollback plans for every major change
- **Validation checkpoints**: Define clear validation criteria at each development stage

#### **📊 Metrics & Risk Management**
- **Success metrics definition**: Define measurable success criteria for each feature
- **Performance baselines**: Establish performance benchmarks before modifications
- **Assumption validation**: List and validate all technical and business assumptions
- **Technical debt tracking**: Monitor and prioritize accumulated technical debt

#### **🎨 User Experience & Interface Design**
- **UX-first approach**: Prioritize user experience in every interface design decision
- **Color psychology**: Apply color theory principles for CLI, TUI, GUI, and Web UI interfaces
- **Visual hierarchy**: Establish clear information hierarchy through typography, spacing, and color
- **Message clarity**: Craft clear, actionable messages for errors, warnings, and success states
- **Emoji usage**: Use emojis sparingly and meaningfully to enhance, not clutter, the interface
- **Accessibility compliance**: Ensure color contrast, keyboard navigation, and screen reader compatibility
- **Cross-interface consistency**: Maintain consistent design patterns across CLI, TUI, GUI, and Web
- **Expert validation**: Subject all UX/UI decisions to critical analysis by domain experts before implementation

#### **📚 Documentation Excellence**
- **Zero redundancy**: Eliminate duplicate information across all documentation
- **Information hierarchy**: Organize content by user needs and task completion priority
- **Concise clarity**: Deliver only strictly necessary information in the most efficient format
- **Scannable format**: Use headings, bullet points, and visual breaks for easy scanning
- **User-focused language**: Write for the intended audience's skill level and context
- **Actionable content**: Every piece of documentation should enable the user to accomplish something
- **Regular audits**: Periodically review and eliminate outdated or redundant documentation
- **Single source of truth**: Maintain one authoritative source for each piece of information

### Package Management
- **Clean builds**: Always run clean before production builds
- **Dependency audit**: Regular cleanup of unused dependencies
- **Cache management**: Clear package manager caches when needed
- **Lock files**: Keep lock files updated and committed

### Project Hygiene (CRITICAL)
- **Clean command**: MANDATORY - Every project must have \`npm run clean\` or equivalent
- **Clean targets**: Remove dist/, coverage/, logs, temp files, .DS_Store, editor backups
- **Clean all**: Separate command for full reset including node_modules/
- **Regular cleanup**: Run clean commands before builds, commits, and releases
- **Gitignore maintenance**: Keep .gitignore updated with all generated/temp file patterns
- **No committed artifacts**: Never commit build outputs, logs, or temporary files

### Version Control
- **Commit messages**: Follow conventional commits format
- **Atomic commits**: One logical change per commit
- **Branch naming**: Use descriptive branch names (feature/, fix/, docs/)
- **Merge strategy**: Prefer merge commits for traceability
- **Pre-commit hygiene**: Always run clean and quality checks before commits

## Troubleshooting Guide

### Build Issues
- Run \`npm run clean\` or equivalent before rebuilding
- Check dependency versions and compatibility
- Clear node_modules and reinstall: \`npm run clean:all && npm install\`
- Verify environment variables and configuration
- Clear build caches and temporary files

### Test Failures
- Run tests in isolation to identify interdependencies
- Check for timing issues in async tests
- Verify test data setup and cleanup

### Performance Issues
- Profile memory usage and CPU consumption
- Check for memory leaks in long-running processes
- Review database query performance and indexing

---

## Remember: Quality is Non-Negotiable

This project maintains high standards because:
- **Reliability matters**: Users depend on this software
- **Maintenance cost**: Poor code is expensive to maintain
- **Team productivity**: Good code makes everyone more productive
- **Professional standards**: We deliver professional-quality software

**When in doubt, prefer correctness and maintainability over speed of delivery.**
`;
}
