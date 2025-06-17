const { defineConfig } = require("orval");

module.exports = defineConfig({
  viajedetintaApi: {
    input: "http://localhost:5049/swagger/v1/swagger.json", // <-- http, no https
    output: {
      mode: "tags-split",
      workspace: "src/generated-sources/api/",
      target: "./viajedetinta.ts",
      schemas: "./model",
      prettier: true,
      client: "react-query",
      override: {
        mutator: {
          path: "./useCustomInstance.ts",
          name: "useCustomInstance",
        },
      },
    },
  },
});
