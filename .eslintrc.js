module.exports = {
    // Specifying the environments where your code will run (e.g., browser, node).
    env: {
      browser: true,
      node: true,
    },
    // Specifying the parser options for TypeScript.
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    // Adding plugins for TypeScript rules.
    plugins: ['@typescript-eslint'],
    // Defining your ESLint rules here, including any TypeScript-specific ones.
    rules: {
      // Example rule: to turn off the "no-console" rule.
      'no-console': 'off',
    },
  };
  