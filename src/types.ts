/**
 * Core type definitions for the project creator
 */

export type SupportedLicense = 'MIT' | 'Apache-2.0';

export interface ProjectConfig {
  name: string;
  description: string;
  author: string;
  githubUsername: string;
  license: SupportedLicense;
  outputDir: string;
}

export interface FileGeneratorOptions {
  /** Path where the file will be created */
  outputPath: string;
  /** File content */
  content: string;
}

export interface DirectoryOptions {
  /** Base directory path */
  basePath: string;
  /** Directories to create relative to basePath */
  directories: string[];
}
