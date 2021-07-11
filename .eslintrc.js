module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 9,
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ["**/*.test.js", "**/*.spec.js"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": "off",
    "no-console": ["error"],
    quotes: ["error", "double"],
    "comma-dangle":  "off",
    "object-curly-newline": ["error", { multiline: true }],
    "import/newline-after-import": ["error", { count: 1 }],
    "no-multi-spaces": ["error", { ignoreEOLComments: false }],
    "func-names": ["error", "as-needed"],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    eqeqeq:"off",
    "max-len": [
      "error",
      {
        code: 120,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  overrides: [
    {
      files: ["src/*.js"],
    },
  ],
};
