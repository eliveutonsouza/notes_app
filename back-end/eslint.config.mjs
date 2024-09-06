import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

const compat = new FlatCompat();

export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
            parser: parser,
        },
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
        rules: {
            semi: ['error', 'always'],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/consistent-type-assertions': 'warn',
            '@typescript-eslint/no-empty-function': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            'prefer-const': 'warn',
            'no-var': 'error',
            'no-console': 'warn',
            eqeqeq: ['error', 'always'],
        },
    },
];
