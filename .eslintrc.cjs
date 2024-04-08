module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    defineOptions: 'readonly'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    './node_modules/@antd-templater/library-3.x/library-eslintrc.json',
    '.eslintrc-auto-import.json'
  ],
  rules: {
    'accessor-pairs': ['error', { setWithoutGet: true }],
    'array-bracket-spacing': ['error', 'never'],
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'consistent'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', {
      before: true,
      after: true
    }],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'camelcase': ['error', {
      properties: 'never',
      ignoreImports: false,
      ignoreDestructuring: false
    }],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', {
      before: false,
      after: true
    }],
    'comma-style': ['error', 'last'],
    'constructor-super': 'error',
    'curly': ['error', 'multi-line'],
    'dot-location': ['error', 'property'],
    'eol-last': ['error', 'always'],
    'eqeqeq': ['error', 'always'],
    'func-call-spacing': 'error',
    'function-paren-newline': ['error', 'consistent'],
    'generator-star-spacing': ['error', {
      before: false,
      after: true
    }],
    'handle-callback-err': ['error', '^(err|error)$'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'jsx-quotes': ['error', 'prefer-single'],
    'key-spacing': ['error', {
      beforeColon: false,
      afterColon: true
    }],
    'keyword-spacing': ['error', {
      before: true,
      after: true
    }],
    'new-cap': ['error', {
      newIsCap: true,
      capIsNew: false,
      properties: true
    }],
    'new-parens': ['error', 'always'],
    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-class-assign': 'error',
    'no-cond-assign': 'error',
    'no-const-assign': 'error',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-empty': 'off',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-parens': ['error', 'functions'],
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-func-assign': 'error',
    'no-implied-eval': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': ['error', {
      allowLoop: false,
      allowSwitch: false
    }],
    'no-lone-blocks': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'no-multi-str': 'error',
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxEOF: 0,
      maxBOF: 0
    }],
    'no-global-assign': 'error',
    'no-unsafe-negation': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-path-concat': 'error',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    'no-return-assign': ['error', 'except-parens'],
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'none'
    }],
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-whitespace-before-property': 'error',
    'no-with': 'error',
    'object-curly-newline': ['error', {
      consistent: true,
      multiline: true
    }],
    'object-curly-spacing': ['error', 'always'],
    'one-var': ['error', {
      initialized: 'never'
    }],
    'operator-linebreak': ['error', 'after', {
      overrides: {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': ['error', 'never'],
    'prefer-const': 'error',
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    'quotes': ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true
    }],
    'quote-props': ['error', 'consistent-as-needed'],
    'semi': ['error', 'never'],
    'semi-spacing': ['error', {
      before: false,
      after: true
    }],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', {
      words: true,
      nonwords: false
    }],
    'spaced-comment': ['error', 'always', {
      markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',', '/']
    }],
    'template-curly-spacing': ['error', 'never'],
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'wrap-iife': ['error', 'any'],
    'yield-star-spacing': ['error', {
      before: false,
      after: true
    }],
    'yoda': ['error', 'never']
  },
  overrides: [
    {
      files: [
        '**/*.vue'
      ],
      rules: {
        'vue/max-attributes-per-line': ['error', {
          singleline: { max: 1 },
          multiline: { max: 1 }
        }],
        'vue/multi-word-component-names': ['error', {
          ignores: ['index', 'Index', 'home', 'Home', 'login', 'Login', 'test', 'Test']
        }],
        'vue/component-name-in-template-casing': ['error', 'PascalCase', {
          registeredComponentsOnly: false,
          ignores: []
        }],
        'vue/attribute-hyphenation': ['error', 'never', { ignore: ['vcoder-*'] }],
        'vue/v-on-event-hyphenation': ['error', 'never'],
        'vue/no-setup-props-destructure': ['off']
      }
    },
    {
      files: ['**/*.vue', '**/*.ts'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', {
          argsIgnorePattern: '^_'
        }]
      }
    },
    {
      env: {
        jest: true
      },
      files: [
        '**/test/**/*.{test,spec}.ts'
      ],
      rules: {
        'no-multiple-empty-lines': ['error', {
          max: 2,
          maxEOF: 0,
          maxBOF: 0
        }]
      }
    }
  ]
}
