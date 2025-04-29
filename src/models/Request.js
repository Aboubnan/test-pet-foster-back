import { DataTypes, Model } from "sequelize";
import { client } from "./client.js";

export class Request extends Model {}

Request.init(
    {
        status: {
            type: DataTypes.ENUM("Nouveau", "En cours", "Accepté", "Refusé"),
            allowNull: false,
            defaultValue: "Nouveau"
        },

        request_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        
        starting_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        
        ending_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        pet_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        association_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: client,
        tableName: "request",
    }
);

