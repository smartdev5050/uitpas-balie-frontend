module.exports = {
  uitpas: {
    input: {
      target: "./uitpas-api.json",
    },
    output: {
      mode: "tags-split",
      target: "../src/lib/data-access/generated/uitpas.ts",
      schemas: "../src/lib/data-access/generated/model",
      client: "react-query",
      mock: false,
    },
  },
};
