// gql-backend/src/models/index.ts

import { DataTypes, Dialect, Options, Sequelize } from "sequelize";

import { $db } from "../../config";

import { IModels } from "../types";

import User from "./User";

const dbModels = (): IModels => {
    const { dialect, port, host, database, username, password } = $db;

    // const uri =

    const options: Options = {
        dialect: dialect as Dialect,
        port,
        host,
        database,
        username,
        password,
    };

    const sequelize = new Sequelize(options);

    const models: IModels = {
        // TODO this is wrong
        User: User(sequelize),
        sequelize,
    };

    return models;
};

const models = dbModels();

export default models;
