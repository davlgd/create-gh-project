import { ProjectConfig } from '../types.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export function generateGitHubWorkflows(config: ProjectConfig): Record<string, string> {
  const workflows: Record<string, string> = {};

  // Main CI workflow - Generic template
  workflows['ci.yml'] = `name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  # TODO: Customize this workflow for your technology stack
  # This is a generic template - adapt the steps below to your project needs
  
  test:
    name: Test Suite
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      # Example: Node.js setup (remove if not using Node.js)
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      # Example: Python setup (uncomment if using Python)
      # - name: Setup Python
      #   uses: actions/setup-python@v4
      #   with:
      #     python-version: '3.11'

      # Example: Go setup (uncomment if using Go)
      # - name: Setup Go
      #   uses: actions/setup-go@v4
      #   with:
      #     go-version: '1.21'

      # Adapt these steps to your project's needs
      - name: Install dependencies
        run: |
          # Examples - use what fits your project:
          npm ci                    # Node.js with npm
          # yarn install --frozen-lockfile  # Node.js with yarn
          # pip install -r requirements.txt # Python
          # go mod download          # Go

      # Add your quality checks here
      - name: Run quality checks
        run: |
          # Examples - adapt to your tools:
          # npm run lint            # Linting
          # npm run typecheck       # Type checking
          # pytest                  # Python tests
          # go test ./...           # Go tests
          echo "Add your quality checks here"

      - name: Run tests
        run: |
          # Examples - use what fits your project:
          # npm test                # Node.js
          # pytest                  # Python
          # go test -v ./...        # Go
          echo "Add your test commands here"

      # Optional: Build step
      - name: Build project
        run: |
          # Examples - use what fits your project:
          # npm run build           # Node.js build
          # python -m build         # Python build
          # go build -o app ./cmd/  # Go build
          echo "Add your build commands here"
`;

  // Release workflow - Generic template
  workflows['release.yml'] = `name: Release

on:
  push:
    tags:
      - 'v*'

permissions:
  contents: write

jobs:
  # TODO: Customize this release workflow for your project
  release:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      # TODO: Add your project setup here (same as in ci.yml)
      # Example for Node.js (adapt to your tech stack):
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci  # Adapt to your package manager

      - name: Run tests
        run: npm test  # Adapt to your test command

      - name: Build project
        run: npm run build  # Adapt to your build command

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true
          draft: false
          prerelease: false
`;

  return workflows;
}
