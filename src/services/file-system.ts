/**
 * File system operations service
 * Handles all file and directory creation operations
 */
import { existsSync, mkdirSync, symlinkSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

import { DirectoryOptions, FileGeneratorOptions } from '../types.js';

export class FileSystemService {
  /**
   * Create directories if they don't exist
   */
  static createDirectories({ basePath, directories }: DirectoryOptions): void {
    for (const dir of directories) {
      const fullPath = join(basePath, dir);
      if (!existsSync(fullPath)) {
        mkdirSync(fullPath, { recursive: true });
      }
    }
  }

  /**
   * Write a file to the file system
   */
  static writeFile({ outputPath, content }: FileGeneratorOptions): void {
    // Ensure parent directory exists
    const parentDir = dirname(outputPath);
    if (!existsSync(parentDir)) {
      mkdirSync(parentDir, { recursive: true });
    }
    writeFileSync(outputPath, content);
  }

  /**
   * Write multiple files to the file system
   */
  static writeFiles(files: FileGeneratorOptions[]): void {
    for (const file of files) {
      this.writeFile(file);
    }
  }

  /**
   * Create a symbolic link
   */
  static async createSymlink(targetPath: string, linkPath: string): Promise<boolean> {
    try {
      if (existsSync(linkPath)) {
        // Remove existing symlink or file (cross-platform)
        const { unlinkSync } = await import('fs');
        unlinkSync(linkPath);
      }
      symlinkSync(targetPath, linkPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if a directory exists
   */
  static directoryExists(path: string): boolean {
    return existsSync(path);
  }
}
