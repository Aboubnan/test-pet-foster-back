import { Sequelize } from "sequelize";

// pour se connecter à la BDD PostgreSQL
export const client = new Sequelize(process.env.PG_URL, {
    dialect: 'postgres',
    define: {
        timestamps: false, // on désactive les champs createdAt et updatedAt
    },
    // ajout option pour utiliser la connexion HTTPS pour Render
    ssl: {
        require: true,
        reject: false
    }
});

// essai de connection
client.authenticate()
    .then(() => console.log("Connexion au serveur 'fetchMeHome' réussie"))
    .catch(err => console.log(`Erreur : ${err.message}`));
