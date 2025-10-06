import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // Add ignore patterns first
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/sw.js',
      '**/*.d.ts',
      'out/**',
      'build/**',
      'dist/**',
      '*.js.map',
      '*.config.js',
      'next.config.js',
      'postcss.config.js',
      'tailwind.config.ts',
    ],
  },
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next/typescript'),
  {
    rules: {
      // Critical errors only - warnings don't break builds
      '@typescript-eslint/no-unused-vars': 'off', // Too many false positives
      'prefer-const': 'off', // Let TypeScript handle this
      'no-console': 'off', // Console logs are needed for debugging
      '@typescript-eslint/no-explicit-any': 'off', // Needed for dynamic types
      'react-hooks/exhaustive-deps': 'warn', // Important but not critical
      'react/no-unescaped-entities': 'off', // Allow quotes and apostrophes
      '@typescript-eslint/no-empty-object-type': 'off', // Common pattern
      '@typescript-eslint/triple-slash-reference': 'off', // Next.js uses these
      '@typescript-eslint/ban-ts-comment': 'off', // Sometimes necessary
      '@typescript-eslint/no-require-imports': 'off', // webpack config needs require
      'jsx-a11y/alt-text': 'warn', // Accessibility is important but not breaking
      '@next/next/no-img-element': 'warn', // Performance warning, not error
      'prefer-rest-params': 'off', // Legacy code compatibility
      '@typescript-eslint/no-unsafe-function-type': 'off', // Generic function types
    },
  },
]

export default eslintConfig