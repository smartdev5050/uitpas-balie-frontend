import { defineConfig } from "orval";

export default defineConfig({
  uitpas: {
    input: {
      target:
        "https://stoplight.io/api/v1/projects/publiq/uitpas/nodes/reference/uitpas.json?deref=optimizedBundle",
    },
    output: {
      mode: "tags-split",
      target: "../src/lib/dataAccess/uitpas/generated/uitpas.ts",
      schemas: "../src/lib/dataAccess/uitpas/generated/model",
      client: "react-query",
      mock: false,
      baseUrl: process.env.NEXT_PUBLIC_API_PATH,
    },
  },
  search: {
    input: {
      target:
        "https://stoplight.io/api/v1/projects/publiq/uitdatabank/nodes/reference/search.json?deref=optimizedBundle",
    },
    output: {
      mode: "tags-split",
      target: "../src/lib/dataAccess/search/generated/search.ts",
      schemas: "../src/lib/dataAccess/search/generated/model",
      client: "react-query",
      mock: false,
      baseUrl: process.env.NEXT_PUBLIC_SEARCH_API_PATH,
    },
  },
});
