import { DataTypes, Model } from "sequelize";
import { client } from "./client.js";

export class Picture extends Model {}

Picture.init(
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        pet_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: client,
        tableName: "picture",
    }
);

