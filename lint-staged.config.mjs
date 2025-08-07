/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
  "**/*.(ts|tsx)": () => "npm run type-check",
};

export default config;
