import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules', 'migrations'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      indent: ['error', 2]
    },
  }
);