// Importation des modèles et des erreurs personnalisées
import { associationCreateSchema, associationUpdateSchema } from "../schemas/association.schema.js";
import { Association } from "../models/relations.js";
import bcrypt from "bcryptjs";
import { NotFoundError } from "../errors/notfound.error.js";
import { IncorrectIdentifierError } from "../errors/incorrectIdentifier.error.js";
import { UserInputError } from "../errors/userinput.error.js";


export const associationController = {
    // récuperer toutes les associations
    async getAll(_, res) {
        const associations = await Association.findAll({
            order: [
                ['id', 'asc'] // Trie les résultats par ID en ordre croissant
            ],
        });
        res.json(associations); // envoie la liste des associations en réponse
    },

    // Récupérer une association spécifique par son ID
    async getOne(req, res,next) {
        const { id } = req.params; // Extraction de l'ID depuis les paramètres de l'URL
        // si id n'est pas un number, on continue via next pour aboutir une 404 (on précise que l'id est incorrect car pas du bon format !)
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError("Incorrect identifier"));
        }

        const association = await Association.findByPk(id, {
                            include: [{association: 'pets', attributes:["id", "name", "birthdate"]}, {association:"requests", attributes:["status", "starting_date", "ending_date", "pet_id"]}], // on affiche les animaux de l'association sélectionnée - on n'affiche que name et birthdate + les requetes de cette association
                            attributes: ["name", "city"] // on affiche les champs name et city de l'association
        });
        if (!association) {
            return next(new NotFoundError('Association not found')); // Retourne une erreur si l'association n'existe pas
        }
        res.json(association); // Envoie l'association trouvée en réponse
    },

    // Créer une nouvelle association
    async create(req, res, next) {
    
        const inputData = req.body; //Données d'entrée pour la création de l'association
        if(!inputData) { // si body vide, erreur 500 avec message
            next(new UserInputError("Body content is empty"))
        }

        // validation des données soumises dans le body via Zod
        await associationCreateSchema.parseAsync(inputData);

        console.log(inputData.password);
        const saltRounds = 10; // Nombre de tours pour le hachage du mot de passe
        const hashedPassword = await bcrypt.hash(inputData.password, saltRounds);
        console.log("Hashed Password:", hashedPassword); // Log pour vérifier le mot de passe haché

        const associationData = { ...inputData, password: hashedPassword};

        const association = await Association.create(associationData); // Création de l'association en base de données
        if (!association) {
            return next(new NotFoundError('Association not found')); // Si l'association n'existe pas, on passe une erreur au middleware
        }

        res.status(201).json(association); // Envoie l'association créée en réponse avec le statut 201 (Créé)
    },

    // Mettre a jour une association existante
    async update(req, res, next) {
        const  { id } = req.params;
        // si id n'est pas un number, on continue via next pour aboutir une 404 (on précise que l'id est incorrect car pas du bon format !)
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError("Incorrect identifier"));
        }

        const inputData = req.body;
        if(!inputData) { // si body vide, erreur 500 avec message
            next(new UserInputError("Body content is empty"))
        }
        
        // validation des données soumises dans le body via Zod
        await associationUpdateSchema.parseAsync(inputData);
        const association = await Association.findByPk(id);
        if(!association){
          return next(new NotFoundError('Association not found'));
        }

        // On met à jour l'association avec les nouvelles données
        await association.update(inputData);
        res.json(association);
    },

    // suppression d'une association (via son id)
    async delete(req, res, next) {

        const { id } = req.params;
        // si id n'est pas un number, on continue via next pour aboutir une 404 (on précise que l'id est incorrect car pas du bon format !)
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError("Incorrect identifier"));
        }
        
        const association = await Association.findByPk(id);
        if(!association){
            return next(new NotFoundError('Association not found'));
        }

        // On supprime l'association de la base de données
        await association.destroy();
        res.status(204).end();
    }
}