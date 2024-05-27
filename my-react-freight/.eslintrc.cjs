module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		// 使用any定义类型的时候，进行警告
		'@typescript-eslint/no-explicit-any': 'warn',
		// 不对命名空间做限制
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		allowSyntheticDefaultImports: true
	}
};
