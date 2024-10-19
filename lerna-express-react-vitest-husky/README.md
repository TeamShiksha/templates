# Monorepo Overview

Welcome to the **Monorepo Project**! This repository is structured using a monorepo approach to manage multiple packages under a single codebase efficiently.

## Table of Contents

- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Package Management](#package-management)
- [Linting and Formatting](#linting-and-formatting)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm start
   ```

## Folder Structure

The monorepo contains the following primary folders:

```
.
├── packages
│   ├── ui           # Frontend UI package
│   └── app          # Backend application package
├── package.json      # Root package.json
└── lerna.json        # Lerna configuration
```

## Available Scripts

The following scripts are available for managing the monorepo:

- **Build**: Build all packages

  ```bash
  npm run build
  ```

- **Start**: Start all packages in parallel

  ```bash
  npm start
  ```

- **Test**: Run tests with coverage for all packages

  ```bash
  npm test
  ```

- **Linting**: Check and fix linting issues

  - For the UI package:
    ```bash
    npm run lint:ui
    ```
  - For the App package:
    ```bash
    npm run lint:app
    ```
  - For all packages:
    ```bash
    npm run lint
    ```

- **Format**: Format code across all packages

  ```bash
  npm run format
  ```

- **Lint Check**: Check linting and formatting
  ```bash
  npm run lint:check
  ```

## Package Management

This project uses [Lerna](https://lerna.js.org/) to manage packages in the monorepo. Lerna enables you to run commands across multiple packages seamlessly.

## Linting and Formatting

We use ESLint for linting and Prettier for code formatting. The configuration files are set up in each package, ensuring consistency across the codebase.

## Testing

Testing is integrated into the monorepo using the script:

```bash
npm test
```

Tests are run with coverage reports for better insight into code quality.

## Contributing

We welcome contributions! If you'd like to contribute to the project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
