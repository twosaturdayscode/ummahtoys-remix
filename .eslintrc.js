/** @type {import('eslint').Linter.Config} */
module.exports = {
	plugins: ['@typescript-eslint', 'simple-import-sort'],
	extends: [
		'@remix-run/eslint-config',
		'@remix-run/eslint-config/node',
		'plugin:import/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		'jsx-quotes': ['warn', 'prefer-double'],
		'react/react-in-jsx-scope': 'off',
		'simple-import-sort/imports': 'warn',
		'simple-import-sort/exports': 'warn',
		'simple-import-sort/imports': [
			'warn',
			{
				groups: [
					// Packages. `react` related packages come first.
					['^react', '^@?\\w'],
				],
			},
		],
	},
	parser: '@typescript-eslint/parser',
}
