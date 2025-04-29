import { Picture } from "../models/relations.js";
import { Pet } from "../models/relations.js";
import { pictureCreateSchema, pictureUpdateSchema } from "../schemas/picture.schema.js";
import { NotFoundError } from "../errors/notfound.error.js";
import { IncorrectIdentifierError } from "../errors/incorrectIdentifier.error.js";
import { UserInputError } from "../errors/userinput.error.js";

export const pictureController = {
    // récuperer toutes les pictures
    async getALL(_, res) {
        const pictures = await Picture.findAll({
            order: [
                ['id', 'asc'] // Trie les résultats par ID en ordre croissant
            ],
        });
        res.json(pictures); // envoie la liste des pictures en réponse
    },

    // Récupérer un picture spécifique par son ID
    async getOne(req, res,next) {
        const { id } = req.params; // Extraction de l'ID depuis les paramètres de l'URL
        // si id n'est pas un number, on continue via next pour aboutir une 404 (on précise que l'id est incorrect car pas du bon format !)
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError("Incorrect identifier"));
        }

        const picture = await Picture.findByPk(id, {
            include: {association: "pet", attributes: ["name"]} // on récupère le nom de l'animal concerné
        });
        if (!picture) {
            return next(new NotFoundError('picture not found')); // Retourne une erreur si l'picture n'existe pas
        }
        res.json(picture); // Envoie le picture trouvée en réponse
    },

    // Créer une nouvelle image (picture)
    async create(req, res, next) {
        const inputData = req.body; // Données d'entrée pour la création de l'image
        if(!inputData) { // si body vide, erreur 500 avec message
            next(new UserInputError("Body content is empty"))
        }
    
        await pictureCreateSchema.parseAsync(inputData);
        const picture = await Picture.create(inputData); // Création du picture en base de données
        if (!picture) {
            return next(new NotFoundError('picture not found')); // Si le picture n'existe pas, on passe une erreur au middleware
        }
        res.status(201).json(picture); // Envoie le picture créée en réponse avec le statut 201 (Créé)
    },
    
    // Mettre a jour un picture existant
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
        
        await pictureUpdateSchema.parseAsync(inputData);
        const picture = await Picture.findByPk(id);
        if(!picture){
            return next(new NotFoundError('Picture not found'));
        }
    
        // On met à jour le picture avec les nouvelles données
        await picture.update(inputData);
        
        res.json(picture);
    },
    
    async delete(req, res, next) {
        const { id } = req.params;
        // si id n'est pas un number, on continue via next pour aboutir une 404 (on précise que l'id est incorrect car pas du bon format !)
        if (isNaN(id)) {
            console.log(id);
            return next(new IncorrectIdentifierError("incorrect identifier"));
        }

        const picture = await Picture.findByPk(id);
        if(!picture){
            return next(new NotFoundError('Picture not found'));
        }
        // On supprime le picture de la base de données
        await picture.destroy();
        res.status(204).end();
    }
}