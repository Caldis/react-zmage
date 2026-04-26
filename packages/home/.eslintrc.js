// eslint-disable-next-line no-undef
module.exports = {
  'rules': {
    // React 19 uses the automatic JSX runtime — no need to import React
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    // We use TypeScript types for prop validation
    'react/prop-types': 'off',
    // Allow apostrophes / quotes in JSX text — modern React handles them fine
    'react/no-unescaped-entities': 'off',
    // Schema/playground pipeline intentionally uses `any` for value passing
    '@typescript-eslint/no-explicit-any': 'off',
    // Source files use single-quote, but allow template literals + escapes
    'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    // Permit double-quoted JSX attributes (idiomatic)
    'jsx-quotes': ['error', 'prefer-double'],
  },
}
