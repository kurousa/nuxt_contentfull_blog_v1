module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended"],
  plugins: [],
  // add your custom rules here
  rules: {
    "no-console": "warn", // console.log()に対するエラーを警告扱いにする
    "no-trailing-spaces": "off" // 行の末尾の空白に対するLintはしない
  }
};
