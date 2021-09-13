import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";

import models from "./models";

import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/types";
import { $server } from "../config";

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const apolloServer = new ApolloServer({
    schema,
    context: (a) => {
        return {
            models,
        };
    },
});

const start = async () => {
    const alterForce = {
        alter: true,
        force: false,
        // force: true,
    };
    await models.sequelize.sync(alterForce);

    apolloServer
        .listen($server.port)
        .then(({ url }) => console.log(`Running on ${url}`));
};

start();
