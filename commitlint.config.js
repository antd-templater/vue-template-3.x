module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'fix',
        'feat',
        'begin',
        'docs',
        'style',
        'refactor',
        'chore',
        'perf',
        'test',
        'merge',
        'revert',
        'wip'
      ]
    ],
    'type-case': [0],
    'scope-case': [0],
    'subject-case': [0],
    'header-case': [0],
    'body-case': [0],
    'type-empty': [2, 'never'],
    'scope-empty': [0],
    'subject-empty': [2, 'never'],
    'body-empty': [0],
    'subject-full-stop': [0],
    'header-full-stop': [0],
    'body-full-stop': [0],
    'header-max-length': [2, 'always', 72],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always']
  }
}
