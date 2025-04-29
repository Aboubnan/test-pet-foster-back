// Importation des modèles et des erreurs personnalisées
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema.js";
import { User } from "../models/relations.js"; // depuis "relations", afin d'avoir les associations entre entités prises en compte !
import { NotFoundError } from "../errors/notfound.error.js";
import { IncorrectIdentifierError } from "../errors/incorrectIdentifier.error.js";
import { UserInputError } from "../errors/userinput.error.js";
import bcrypt from "bcryptjs"; // Librairie pour le hachage de mots de passe


export const userController = {

    // récuperer tous les users
    async getAll(_, res) {
        const users = await User.findAll({
            order: [
                ['id', 'asc'] // Trie les résultats par ID en ordre croissant
            ],
        });
        res.json(users); // envoie la liste des users en réponse
    },

    // Récupérer un user spécifique par son ID
    async getOne(req, res,next) {
        const { id } = req.params; // Extraction de l'ID depuis les paramètres de l'URL

        // si id n'est pas un number, on continue via next pour aboutir une 404 (on précise que l'id est incorrect car pas du bon format !)
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError("Incorrect identifier"));
        }

        const user = await User.findByPk(id, {
            include: "requests"    // on inclut les requêtes d'adoption de l'utilisateur récupéré
        });
        if (!user) {
            return next(new NotFoundError('user not found')); // Retourne une erreur si l'user n'existe pas
        }
        res.json(user); // Envoie l'user trouvée en réponse
    },

    // Créer un nouveau user
    async create(req, res, next) {
        
        const inputData = req.body; //Données d'entrée pour la création de l'user
        console.log("body: ", inputData);

        if(!inputData) { // si body vide, erreur 500 avec message
            next(new UserInputError("Body content is empty"))
        }
        
        // Validation des données avec Zod 'userCreateSchema'
        await userCreateSchema.parseAsync(inputData);
        
        console.log(inputData.password);

        // Hachage du mot de passe avant l'enregistrement
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(inputData.password, saltRounds);
        console.log("Hashed Password:", hashedPassword); // Log pour vérifier le mot de passe haché

        // Remplacer le mot de passe dans les données avant l'enregistrement
        const userData = { ...inputData, password: hashedPassword };

        // Création de l'utilisateur en base de données
        const user = await User.create(userData);
        if (!user) {
            return next(new NotFoundError("User not found"));
        }

        // Envoi de l'utilisateur créé en réponse
        res.status(201).json(user);

    },

    // Mettre a jour un user existant (via son Id)
    async update(req, res, next) {
        const  { id } = req.params;
        // si id n'est pas un number, on continue via next pour aboutir à la 404
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError("Incorrect identifier"));
        }

        const inputData = req.body;
        if(!inputData) { // si body vide, erreur 500 avec message
            next(new UserInputError("Body content is empty"))
        }
    
        // validation des données via le schéma ZOD 'userUpdateSchema'
        await userUpdateSchema.parseAsync(inputData);
        const user = await User.findByPk(id);

        if(!user){
          return next(new NotFoundError('user not found'));
        }

        // On met à jour l'user avec les nouvelles données
        await user.update(inputData);
        // on renvoie l'user modifié
        res.json(user);
    },

    // Suppression d'un user
    async delete(req, res, next) {
        const { id } = req.params;
        // si id n'est pas un number, on continue via next pour aboutir à la 404
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError("Incorrect identifier"));
        }

        const user = await User.findByPk(id);
        if(!user){
            return next(new NotFoundError('User not found'));
        }
        // on supprime l'user de la base de données
        await user.destroy();
        res.status(204).end();
    }
}