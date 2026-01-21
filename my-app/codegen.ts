import path from "path";
import type { CodegenConfig } from '@graphql-codegen/cli';

const project_root_dir = path.join(import.meta.dirname, "../.env");

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8085/v1/graphql",

  documents: "src/**/graphql/**/*.graphql",

  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request"
      ],
      config: {
        // This ensures the generated SDK is easy to use
        rawRequest: false,
        enumsAsTypes: true
      },
    },
  },
  headers: {
    "x-hasura-admin-secret": "myadminsecretkey"
  }
};

export default config;