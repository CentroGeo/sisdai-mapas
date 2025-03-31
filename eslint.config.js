import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import pluginCypress from 'eslint-plugin-cypress/flat'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/docs/.vitepress/components/**',
      '**/docs/.vitepress/cache/**',
      '**/docs/.vitepress/src/**',
      '**/coverage/**',
      '**/confDep/**',
    ],
  },

  {
    // @see https://eslint.org/docs/latest/use/configure/language-options
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    // @see https://eslint.org/docs/latest/rules/
    // @see https://eslint.org/docs/latest/use/configure/rules
    // @see https://eslint.vuejs.org/rules/multi-word-component-names.html
    rules: {
      'no-new': 0,
      eqeqeq: 'error',
      'no-console': 'off',
      'no-debugger': 'off',
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['Layout', 'basico', 'default'],
        },
      ],
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
  },
  skipFormatting,

  // {}
]
