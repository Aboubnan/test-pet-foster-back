import { petCreateSchema, petUpdateSchema } from "../schemas/pet.schema.js";
import { Pet } from "../models/relations.js";
import { NotFoundError } from "../errors/notfound.error.js";
import { IncorrectIdentifierError } from "../errors/incorrectIdentifier.error.js";
import { UserInputError } from "../errors/userinput.error.js";

export const petController = {
    // récuperer tous les pets
    async getALL(_, res) {
        const pets = await Pet.findAll({
            order: [
                ['id', 'ASC'] // Trie les résultats par ID en ordre croissant
            ],
            include: ['species', 'association', 'pictures'] // on récupère les données species, association et picture de chaque animal
        });
        res.json(pets); // envoie la liste des pets en réponse
    },

    // Récupérer un pet spécifique par son ID
    async getOne(req, res,next) {
        const { id } = req.params; // Extraction de l'ID depuis les paramètres de l'URL
        // si id n'est pas un number, on continue via next pour aboutir une 404 (on précise que l'id est incorrect car pas du bon format !)
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError("Incorrect identifier"));
        }

        const pet = await Pet.findByPk(id, {
            include: ['species', 'association', 'pictures', "requests"] // on récupère les données species, association, picture et request de l'animal !
        });
        if (!pet) {
            return next(new NotFoundError('pet not found')); // Retourne une erreur si le pet n'existe pas
        }
        res.json(pet); // renvoie le pet trouvé en réponse
    },

    // Créer un nouveau pet
    async create(req, res, next) {
        const inputData = req.body; //Données d'entrée pour la création de l'pet
        if(!inputData) { // erreur si body vide
            return next(new UserInputError("Body content is empty"));
        }

        // test de validation des données via le schéma 'petCreateSchema' de Zod
        await petCreateSchema.parseAsync(inputData);
        const pet = await Pet.create(inputData); // Création du pet en base de données
        if (!pet) {
            return next(new NotFoundError('pet not found')); // Si le pet n'existe pas, on passe une erreur au middleware
        }
        res.status(201).json(pet); // Envoie le pet créée en réponse avec le statut 201 (Créé)
    },
    
    // Mettre a jour un pet existant
    async update(req, res, next) {
        const  { id } = req.params;
        // si id n'est pas un number, on continue via next pour aboutir à la 404
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError("Incorrect identifier"));
        }

        const inputData = req.body;
        if(!inputData) {  // erreur si body vide
            return next(new UserInputError("Body content is empty"));
        }
        
        await petUpdateSchema.parseAsync(inputData);
        const pet = await Pet.findByPk(id);
        if(!pet){
            return next(new NotFoundError('Pet not found'));
        }
    
        // On met à jour le pet avec les nouvelles données
        await pet.update(inputData);
        res.json(pet);
    },
    
    async delete(req, res, next) {
        const { id } = req.params;
        // si id n'est pas un number, on continue via next pour aboutir à la 404
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError("Incorrect identifier"));
        }
        
        const pet = await Pet.findByPk(id);
        if(!pet){
            return next(new NotFoundError('Pet not found'));
        }
    
        // On supprime le pet de la base de données
        await pet.destroy();
        res.status(204).end();
    }
}