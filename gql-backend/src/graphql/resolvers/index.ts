// gql-backend/src/graphql/resolvers/index.ts

import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

const resolversArray = loadFilesSync(path.join(__dirname, "./"), {
    extensions: [".ts"],
});

export default mergeResolvers(resolversArray);
