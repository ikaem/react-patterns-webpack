// gql-backend/src/lib/jwt.ts

import jwt from "jsonwebtoken";

import { encrypt, setBase64, getBase64 } from "@contentpi/lib";

import { $security } from "../../config";

import { IUser } from "../types";

const { secretKey } = $security;

// this accepts some callback that will set some state probably, or return somethign
export function jwtVerify(accessToken: string, cb: any) {
    try {
        const accessTokenData = jwt.verify(accessToken, secretKey) as {
            data: any;
        };
        if (!accessTokenData.data) throw new Error("Error verifying token");

        // now we extract data from base 64
        // becuase this is how it is encoded

        const userData = getBase64(accessTokenData.data);
        return cb(userData);
    } catch (e) {
        cb(false);
    }
}

export function getUserData(accessToken: string): any {
    // this callback is so unneccessary
    // maybe it is good to return false, or data
    const userData = jwtVerify(accessToken, (data: any) => data);

    // so userData can either be false or userData

    return userData;
}
// why do we return an array
export async function createToken(user: IUser): Promise<string[]> {
    // now he creates token out of the secret key and password
    // i dont understand why
    // oh, he makes it to store the password, wow

    const { password, ...restUserData } = user;

    const token = setBase64(`${encrypt($security.secretKey)}${password}`);

    // now he also creates user data, where he stores the password of token
    // but without password

    const userData = {
        ...restUserData,
        token,
    };

    // and now we create then token

    const jwtToken = jwt.sign(
        { data: setBase64(userData) },
        $security.secretKey,
        {
            expiresIn: $security.expiresIn,
        }
    );

    return [jwtToken];
}
