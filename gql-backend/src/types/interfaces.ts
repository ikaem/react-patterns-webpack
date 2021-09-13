import { UserInstance } from "models/User";
import { Model, ModelCtor, Sequelize } from "sequelize/types";
import { TSequelize, User } from "./types";

export interface IUser extends User, TSequelize {
    id: string;
    token?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICreateUserInput extends User {}

export interface ILoginInput {
    email: string;
    password: string;
}

export interface IAuthPayload {
    token: string;
}

export interface IModels {
    User: ModelCtor<UserInstance>;
    sequelize: Sequelize;
}
