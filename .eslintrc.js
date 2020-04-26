module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: ["eslint:recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "linebreak-style": "off", // don't matter line ending style
    indent: ["error", 2], // indent with 2 spaces
    quotes: ["error", "single"], // force single quotes
    semi: ["error", "never"], // remove semicolons
    eqeqeq: "warn", // require === and !==
    "default-case": "warn", // require default case in switch statements
    "no-implicit-coercion": "warn", // disallows implicit type conversion methods
    "no-magic-numbers": "off",
    yoda: "warn", // requires 'yoda' condition statements
    "no-var": "warn", // requires let or const, not var
  }
};
