export const errorMiddleware = (err, _, res, __) => {
  console.log(JSON.stringify(err)); // pour voir le "nom" de l'erreur interceptée

    // NotFound errors
    if(err.name === "NotFoundError") { // si erreur de name "NotFoundError"
        return res.status(404).json({error: err.message}); 
    }

    //IncorrectIdentifier Errors
    if(err.name === "IncorrectIdentifierError") { // si erreur de name "IncorrectIdentifierError"
        return res.status(404).json({error: err.message}); 
    }

    //UserInput Errors
    if(err.name === "UserInputError") { // si erreur de name "UserInputError"
        return res.status(400).json({error: err.message}); 
    }

    // Zod errors
    if(err.name === "ZodError") { // si erreur de Zod (validation de données)
        if(err.issues.length > 1) { // si plusieurs messages d'erreur de Zod, on boucle pour les afficher
            let errors={};
            err.issues.forEach((issue,index) => {
                errors[`error_${index+1}`] = issue.message;
            });
            return res.status(400).json({errors}); 
        } else {
            return res.status(400).json({error: err.issues[0].message}); 
        }
    }

    // Sequelize errors (ex: contrainte de clé unique non respectée)
    if(err.name.includes("Sequelize")) {
        // erreur de contrainte de clé étrangère
        if(err.name === "SequelizeForeignKeyConstraintError") {
            return res.status(500).json({error: `${err.name} - ${err.parent.detail}`});        
        } else {
            console.log(err.errors[0]);
            return res.status(500).json({error: `${err.name} - ${err.errors[0].message} (${err.errors[0].value})`});
        }
    }
    
    // si on arrive ici, alors on indique un status d'erreur serveur 500 classique
    return res.status(500).json({error: 'Internal Server Error, please try again later...'});
};