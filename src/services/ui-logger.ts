/**
 * User Interface Logger Service
 * Handles all console output with consistent styling and UX principles
 */

export class UILogger {
  /**
   * Log a step in the process with emoji and clear messaging
   */
  static step(message: string): void {
    console.log(message);
  }

  /**
   * Log success message
   */
  static success(message: string): void {
    console.log(`✅ ${message}`);
  }

  /**
   * Log warning message
   */
  static warning(message: string): void {
    console.warn(`⚠️ ${message}`);
  }

  /**
   * Log error message
   */
  static error(message: string): void {
    console.error(`❌ ${message}`);
  }

  /**
   * Log info message
   */
  static info(message: string): void {
    console.log(`ℹ️ ${message}`);
  }

  /**
   * Log project configuration summary
   */
  static projectSummary(config: {
    name: string;
    outputDir: string;
    description: string;
    author: string;
    license: string;
  }): void {
    console.log(`📝 Project: ${config.name}`);
    console.log(`📁 Output directory: ${config.outputDir}`);
    console.log(`📄 Description: ${config.description}`);
    console.log(`👤 Author: ${config.author}`);
    console.log(`📜 License: ${config.license}\n`);
  }

  /**
   * Log project summary with files created
   */
  static projectComplete(): void {
    console.log('📁 Files created:');
    console.log('   ├── README.md          # Project documentation');
    console.log('   ├── LICENSE            # License file');
    console.log('   ├── CHANGELOG.md       # Version history');
    console.log('   ├── CLAUDE.md          # AI development instructions');
    console.log('   ├── .gitignore         # Git ignore rules');
    console.log('   ├── .editorconfig      # Editor configuration');
    console.log('   ├── .claude/           # Claude Code agents');
    console.log(
      '   │   └── agents/        # Specialized AI agents for code quality, docs, releases'
    );
    console.log('   └── .github/           # GitHub workflows & config');
    console.log('       ├── workflows/     # CI/CD workflows');
    console.log('       └── copilot-instructions.md # GitHub Copilot AI context');
    console.log('');
  }

  /**
   * Log next steps for user
   */
  static nextSteps(outputDir: string): void {
    console.log('Next steps:');
    if (outputDir !== '.') {
      console.log(`  cd ${outputDir}`);
    }
    console.log('  git init               # Initialize git repository');
    console.log('  git add .              # Stage all files');
    console.log('  git commit -m "🎉 Initial commit"');
    console.log('  # Start coding! 🎉');
  }

  /**
   * Start process with clear header
   */
  static startProcess(): void {
    console.log('🚀 Starting project initialization...\n');
  }
}
