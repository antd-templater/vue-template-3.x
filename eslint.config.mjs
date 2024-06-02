import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import templater from '@antd-templater/eslint-config'

const flatArray = options => {
  return !Array.isArray(options)
    ? [options]
    : options
}

export default tseslint.config(
  {
    ignores: [
      'components.d.ts',
      'auto-imports.d.ts',
      'node_modules/**/*',
      'dist/**/*',
    ],
  },
  {
    files: [
      '**/*.vue',
      '**/*.mts',
      '**/*.mjs',
      '**/*.cjs',
      '**/*.tsx',
      '**/*.jsx',
      '**/*.ts',
      '**/*.js',
    ],
    extends: [
      ...flatArray(eslint.configs.recommended),
      ...flatArray(tseslint.configs.recommended),
      ...flatArray(stylistic.configs['recommended-flat']),
      ...flatArray(pluginVue.configs['flat/recommended']),
      ...flatArray(templater.configs['flat/recommended']),
    ],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        Window: 'readonly',
        window: 'readonly',
        console: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        define: 'readonly',
        module: 'readonly',
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/brace-style': ['error', '1tbs', {
        allowSingleLine: true,
      }],
      '@stylistic/indent-binary-ops': 'off',
      '@stylistic/max-statements-per-line': ['error', {
        max: 3,
      }],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true,
        },
        multilineDetection: 'brackets',
      }],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/no-mixed-operators': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/space-before-function-paren': ['error', {
        named: 'never',
        anonymous: 'never',
        asyncArrow: 'never',
      }],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': ['error', {
        allowDeclarations: true,
        allowDefinitionFiles: true,
      }],
      '@typescript-eslint/no-unused-vars': ['error', {
        vars: 'all',
        args: 'none',
        caughtErrors: 'all',
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
      '@typescript-eslint/no-var-requires': 'off',
      'no-empty': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/attribute-hyphenation': ['error', 'never', {
        ignore: ['vcoder-*'],
      }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false,
        ignores: [],
      }],
      'vue/multi-word-component-names': ['error', {
        ignores: ['index', 'Index', 'login', 'Login'],
      }],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/v-on-event-hyphenation': ['error', 'never'],
    },
  },
  {
    files: ['**/*.{test,spec,cy}.ts'],
    rules: {
      '@stylistic/no-multiple-empty-lines': ['error', {
        max: 2,
        maxEOF: 0,
        maxBOF: 0,
      }],
      'no-empty': 'off',
      'no-undef': 'off',
    },
  },
)
