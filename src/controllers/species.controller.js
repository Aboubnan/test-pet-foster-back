import { IncorrectIdentifierError } from "../errors/incorrectIdentifier.error.js";
import { NotFoundError } from "../errors/notfound.error.js";
import { UserInputError } from "../errors/userinput.error.js";
import { Species } from "../models/relations.js";
import { speciesCreateSchema, speciesUpdateSchema } from "../schemas/species.schema.js";

export const speciesController = {

    // récupérer toutes les espèces
    async getAll(_, res) {
        const species = await Species.findAll({
            order: [
                ['id', 'asc']
            ],
        });
        res.json(species);
    },

    // récupérer une espèce
    async getOne(req, res, next) {
        const { id } = req.params;
        // si id n'est pas un number, on continue via next pour aboutir à la 404
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError('Incorrect identifier'));
        }

        const oneSpecies = await Species.findByPk(id);
        if (!oneSpecies) {
            return next(new NotFoundError('Species not found'));
        }
        res.json(oneSpecies);
    },

    // création d'une nouvelle espèce
    async create(req,res,next) {
        try{
        const inputData = req.body; //Données d'entrée pour la création de l'espèce
        
        if(!inputData) { // si body vide, erreur 500 avec message
            next(new UserInputError("Body content is empty"))
        }
        
        // validation de l'espèce via Zod
        await speciesCreateSchema.parseAsync(inputData);
        const newSpecies = await Species.create(inputData); // Création de la nouvelle espèce en base
        
        if (!newSpecies) {
            return next(new NotFoundError('Species not found')); // Si l'espèce n'existe pas, on passe une erreur au middleware
        }
        res.status(201).json(newSpecies); // Envoie l'espèce créée en réponse avec le statut 201
        } catch(err) {next(err)}
    },

    // mise à jour d'une espèce
    async update(req, res, next) {
        const  { id } = req.params;
        // si id n'est pas un number, on continue via next pour aboutir à la 404
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError('Incorrect identifier'));
        }

        const inputData = req.body;
        if(!inputData) { // si body vide, erreur 500 avec message
            next(new UserInputError("Body content is empty"))
        }

        // validation de l'espèce via zod
        await speciesUpdateSchema.parseAsync(inputData);
        const species = await Species.findByPk(id);
        if(!species){
            return next(new NotFoundError('species not found'));
        }
    
        // On met à jour l'espèce avec les nouvelles données récupérées du body
        await species.update(inputData);
        res.json(species);
    },

    // suppression d'une espèce
    async delete(req, res, next) {
        const { id } = req.params;
        // si id n'est pas un number, on continue via next pour aboutir à la 404
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError('Incorrect identifier'));
        }
        
        const species = await Species.findByPk(id);
        if(!species){
            return next(new NotFoundError('Species not found'));
        }
        // On supprime l'espèce de la base de données
        await species.destroy();
        res.status(204).end();
    }
}