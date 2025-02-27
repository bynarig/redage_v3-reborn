import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import globals from 'globals';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/node_modules', '**/dist'],
  },
  {
    plugins: {
      prettier,
      react
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  ...compat.extends('plugin:cypress/recommended').map((config) => ({
    ...config,
    files: ['./cypress/**'],
  })),
  {
    files: ['./cypress/**'],

    plugins: [
      'cypress',
    ],

    languageOptions: {
      globals: {
        context: 'readonly',
        before: 'readonly',
        cy: 'readonly',
        it: 'readonly',
      },
    },

    rules: {
      'class-methods-use-this': 'off',
      'no-return-assign': 'off',
    },
  },
  ...compat
    .extends(
      'prettier',
      'eslint:recommended',
      'plugin:import/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
    )
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
    })),
  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: './tsconfig.json',
        'ecmaFeatures': {
          'jsx': true,
        },
      },
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },

    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'jsx-a11y/control-has-associated-label': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'class-methods-use-this': 'warn',
      'consistent-return': 'warn',
      'import/no-default-export': 'warn',
      'import/no-extraneous-dependencies': 'warn',
      'import/prefer-default-export': 'off',
      'jsx-a11y/label-has-associated-control': 'warn',
      'no-nested-ternary': 'warn',
      'no-underscore-dangle': 'warn',
      'react/function-component-definition': 'off',
      'react/jsx-props-no-spreading': 'warn',
      'react/no-unescaped-entities': 'warn',
      'react/prop-types': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',

      'react/no-unstable-nested-components': [
        'warn',
        {
          allowAsProps: true,
        },
      ],

      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
        },
      ],
    },
  },
  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
  },
  {
    files: ['**/vite.config.js'],

    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
