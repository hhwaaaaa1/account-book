const {
  override,
  addWebpackAlias,
  disableEsLint,
  addDecoratorsLegacy,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    ["@/components"]: path.resolve(__dirname, "./src/components"),
    ["@/stores"]: path.resolve(__dirname, "./src/stores"),
  }),
  disableEsLint(),
  addDecoratorsLegacy()
);
