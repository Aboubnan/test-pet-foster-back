import { Router } from "express";
// import des controllers
import { userController } from "../controllers/user.controller.js";
import { petController } from "../controllers/pet.controller.js";
import { speciesController } from "../controllers/species.controller.js";
import { requestController } from "../controllers/request.controller.js";
import { associationController } from "../controllers/association.controller.js";
import { pictureController } from "../controllers/picture.controller.js";
import { authController } from "../controllers/auth.controller.js";
import { controllerWrapper } from "../middleware/controller.wrapper.js";
import { errorMiddleware } from "../middleware/error.middleware.js";



// Création d'un nouvel objet Router
export const router = new Router();

router.route("/login/user")
        .post(controllerWrapper(authController.loginUser))

router.route("/login/association")
        .post(controllerWrapper(authController.loginAssociation));

router.route("/users")
        .get(controllerWrapper(userController.getAll))
        .post(controllerWrapper(userController.create));
        
router.route("/users/:id")
        .get(controllerWrapper(userController.getOne))
        .put(controllerWrapper(userController.update))
        .delete(controllerWrapper(userController.delete));

router.route("/associations")
        .get(controllerWrapper(associationController.getAll))
        .post(controllerWrapper(associationController.create));


router.route("/associations/:id")
        .get(controllerWrapper(associationController.getOne))
        .put(controllerWrapper(associationController.update))
        .delete(controllerWrapper(associationController.delete));

// routes pets
router.route("/pets")
        .get(controllerWrapper(petController.getALL))
        .post(controllerWrapper(petController.create));
router.route("/pets/:id")
        .get(controllerWrapper(petController.getOne))
        .put(controllerWrapper(petController.update))
        .delete(controllerWrapper(petController.delete));

// routes species
router.route("/species")
        .get(controllerWrapper(speciesController.getAll))
        .post(controllerWrapper(speciesController.create));
router.route("/species/:id")
        .get(controllerWrapper(speciesController.getOne))
        .put(controllerWrapper(speciesController.update))
        .delete(controllerWrapper(speciesController.delete));

// routes Picture
router.route("/pictures")
        .get(controllerWrapper(pictureController.getALL))
        .post(controllerWrapper(pictureController.create));


router.route("/pictures/:id")
        .get(controllerWrapper(pictureController.getOne))
        .put(controllerWrapper(pictureController.update))
        .delete(controllerWrapper(pictureController.delete));

// routes Request (demande d'adoption)
router.route("/requests")
        .get(controllerWrapper(requestController.getAll))
        .post(controllerWrapper(requestController.create));


router.route("/requests/:id")
        .get(controllerWrapper(requestController.getOne))
        .put(controllerWrapper(requestController.update))
        .delete(controllerWrapper(requestController.delete));

//*** middleware des erreurs
router.use(errorMiddleware);