import { DataTypes, Model } from "sequelize";
import { client } from "./client.js";

export class Species extends Model {}

Species.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize: client,
        tableName: "species",
    }
);

