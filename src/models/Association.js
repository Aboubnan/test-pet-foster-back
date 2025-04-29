import { DataTypes, Model } from "sequelize";
import { client } from "./client.js";

export class Association extends Model {}

Association.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        rna: {
            type: DataTypes.STRING,
            allowNull: false
        },

        address: {
            type: DataTypes.STRING,
            allowNull: false
        },

        zip_code: {
            type: DataTypes.STRING,
            allowNull: false
        },

        city: {
            type: DataTypes.STRING,
            allowNull: false
        },

        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        logo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize: client,
        tableName: "association",
    }
);

