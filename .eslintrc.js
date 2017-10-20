module.exports = {
  extends: "airbnb",
  parserOptions: {
    ecmaVersion: 5,
  },
  env: {
    browser: true,
    node: true,
    jquery: true
  },
  plugins: ["import"],
  rules: {
    semi: [0, "never"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "prefer-arrow-callback": 1,
    "prefer-template": 0,
    "prefer-destructuring": 0,
    "vars-on-top": 0,
    "no-var": 0,
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-mixed-operators": ["error", { allowSamePrecedence: true }],
    "no-confusing-arrow": ["error", { allowParens: true }],
    "no-underscore-dangle": "off",
    "no-floating-decimal": 0,
    "no-param-reassign": 1,
    "no-use-before-define": 1,
    "arrow-body-style": [
      1,
      "as-needed",
      { requireReturnForObjectLiteral: true }
    ],
    "spaced-comment": ["error", "always", { exceptions: ["-", "+"] }],
    "quote-props": 1,
    "no-continue": "off",
    "import/export": 2,
    "import/extensions": 1,
    "class-methods-use-this": ["error", { exceptMethods: ["render"] }],
    "func-names": ["error", "never"],
    "wrap-iife": ["error", "inside"],
    "object-shorthand": 0
  }
};
