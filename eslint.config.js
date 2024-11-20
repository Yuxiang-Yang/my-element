import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
}, {
  rules: {
    'vue/html-self-closing': 'off',
    'jsonc/sort-keys': 'off',
    'no-debugger': 'off',
    'no-console': 'off',
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
  },
})
