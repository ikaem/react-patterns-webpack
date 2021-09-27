// gql-backend/src/lib/auth.ts

import { AuthenticationError } from "apollo-server";

import { encrypt, isPasswordMatch } from "@contentpi/lib";

import { IUser, IModels, IAuthPayload } from "../types";

import { createToken } from "./jwt";

// this is cool
// this is our own function to find a user by something
// but these should probably be on some getters folder, or something
export const getUserBy = async (where: any, models: IModels) => {
    // NOT sure what this raw is
    const user = await models.User.findOne({
        where,
        raw: true,
    });

    return user;
};

// this is to login

export const doLogin = async (
    email: string,
    password: string,
    models: IModels
): Promise<IAuthPayload> => {
    const user = await getUserBy({ email }, models);

    console.log("this is user found", {});

    if (!user) throw new AuthenticationError("Invalid login");

    console.log({ user });

    const passwordMatch = isPasswordMatch(encrypt(password), user.password);
    const isActive = user.active;

    if (!passwordMatch) throw new AuthenticationError("Invalid loginn");
    if (!isActive) throw new AuthenticationError("Invalid loginn");

    // and now we get the token
    // i dont understand why we put it inside an array

    const [token] = await createToken(user);

    return { token };
};
