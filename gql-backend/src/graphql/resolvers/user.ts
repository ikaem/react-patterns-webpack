// gql-backend/src/graphql/resolvers/user.ts

import { getUserData } from "../../lib/jwt";

import {
    IUser,
    ICreateUserInput,
    IModels,
    ILoginInput,
    IAuthPayload,
} from "../../types";

import { doLogin, getUserBy } from "../../lib/auth";

export default {
    Query: {
        getUsers: async (
            _: any,
            args: any,
            ctx: { models: IModels }
        ): Promise<IUser[]> => {
            return ctx.models.User.findAll();
        },
        getUserData: async (
            _: any,
            { token }: { token: string },
            ctx: { models: IModels }
        ): Promise<IUser> => {
            // this is terrible
            const connectedUser = await getUserData(token);

            if (connectedUser) {
                const user = await getUserBy(
                    {
                        id: connectedUser.id,
                        email: connectedUser.email,
                        privilege: connectedUser.privilege,
                        active: connectedUser.active,
                    },
                    ctx.models
                );

                if (user) return connectedUser;
            }

            return {
                id: "",
                username: "",
                password: "",
                email: "",
                privilege: "",
                active: false,
            };
        },
    },
    Mutation: {
        createUser: async (
            _: any,
            { input }: { input: ICreateUserInput },
            // { input }: { input: any },
            { models }: { models: IModels }
        ): Promise<IUser> => {
            // console.log({ input });

            return models.User.create(input);
        },
        login: async (
            _: any,
            { input }: { input: ILoginInput },
            { models }: { models: IModels }
        ): Promise<IAuthPayload> => {
            // this should have been an object for the input argument
            // but, this should have come from the context

            console.log({ input });
            return doLogin(input.email, input.password, models);
        },
    },
};
