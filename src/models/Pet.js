import { DataTypes, Model } from "sequelize";
import { client } from "./client.js";

export class Pet extends Model {}

Pet.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        sex: {
            type: DataTypes.ENUM("Male", "Femelle"),
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        is_available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

        species_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        association_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: client,
        tableName: "pet",
    }
);

