module.exports = {
  uitpas: {
    input: {
      target:
        "https://stoplight.io/api/v1/projects/publiq/uitpas/nodes/reference/uitpas.json?deref=optimizedBundle",
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
