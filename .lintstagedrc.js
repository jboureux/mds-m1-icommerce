// changed this file to export default instead of module.exports to fix the error during lint-staged execution in the pre-commit hook in git beecause i added type module in the package.json file

export default {
  '*.{js,ts,jsx,tsx,mjs,cjs}': 'pnpm run lint:fix',
};
