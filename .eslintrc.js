module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react', 'react-hooks', 'jest', 'prettier'],
  rules: {
    'arrow-parens': 0,
    'react/prop-types': 0,
    'max-len': ['error', { code: 120, ignoreUrls: true }],
    'prettier/prettier': ['error', { trailingComma: 'es5', singleQuote: true }],
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/alt-text': 0,
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  settings: {
    'import/core-modules': ['electron'],
  },
};
