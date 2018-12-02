module.exports = {
  'extends': 'airbnb-base',
  'plugins': [
    'import',
    'react',
  ],
  'env': {
    'browser': true,
  },
  'rules': {
    'no-unused-vars': [2, { 'varsIgnorePattern': 'h' }],
    'react/jsx-uses-vars': 2,
    'react/jsx-indent': [2, 2],
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'jsx-quotes': ['error', 'prefer-single'],
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }]
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
  },
};
