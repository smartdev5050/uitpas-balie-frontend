module.exports = {
  uitpas: {
    input: {
      target: "./uitpas-api.json",
    },
    output: {
      mode: "tags-split",
      target: "../src/lib/dataAccess/generated/uitpas.ts",
      schemas: "../src/lib/dataAccess/generated/model",
      client: "react-query",
      mock: false,
    },
  },
};
