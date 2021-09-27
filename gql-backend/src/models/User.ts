// gql-backend/src/models/User.ts

import { encrypt } from "@contentpi/lib";
// import { DataTypes, Model, Sequelize } from "sequelize/types";

import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";
// import { DataTypes, Model, Sequelize } from "sequelize/types";
import { HookReturn } from "sequelize/types/lib/hooks";

import { ICreateUserInput, IUser } from "../types";

// this is now the model
// needs sequalize and data dtypes , and it will return IUser

// interface IUser {
//     id: string;
//     username: string;
//     password: string;
//     email: string;
//     privilege: string;
//     active: boolean;
// }

export interface UserInstance extends Model<IUser, ICreateUserInput>, IUser {}

export default (sequelize: Sequelize) => {
    // now we define the model
    // const User = sequelize.define<UserInstance>(
    const User = sequelize.define<UserInstance>(
        "User",

        {
            // and now we do columns

            id: {
                primaryKey: true,
                allowNull: false,
                // where is this coming from
                type: DataTypes.STRING,
                // this is cool, just add default type
                defaultValue: DataTypes.UUIDV4,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    // oh, this is very cool
                    isAlphanumeric: {
                        // args: true,
                        msg: "The user just accepts alphanumeric characters",
                    },
                    len: {
                        args: [4, 20],
                        msg: "The username must be from 4 to 20 characters ",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        // args: true,
                        msg: "Invalid email",
                    },
                },
            },
            privilege: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "user",
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            hooks: {
                // I guess this is automatically passed
                // and we dont return anything
                // instead, we probably just chnage the data in place
                // beforeCreate(user: Model<IUser, IUser>): HookReturn {
                beforeCreate(user: any): HookReturn {
                    console.log("karlo", { user });
                    user.dataValues.password = encrypt(
                        user.dataValues.password
                    );
                },
            },
        }
    );

    // User.create({

    // })

    return User;
};
