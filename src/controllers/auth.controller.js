import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { NotFoundError } from "../errors/notfound.error.js";
import { Association } from "../models/Association.js";

export const authController = {
    async loginUser(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new NotFoundError("Email and password are required"));
        }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(new NotFoundError("user not found"));
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return next(new NotFoundError("Invalid password")); //erreur personnalisée 401 : "invalid user or password"
            }

            const token = jwt.sign(      // payload du token avec l'id et email du user connecté
                { 
                    id: user.id,
                    email: user.email 
                },
                process.env.JWT_SECRET,  // utilisation de la clé pour hâcher le token afin qu'il ne soit lisible que par le serveur
                { expiresIn: "2h"}       // expiration dans 2h
            ); 
            return res.status(200).json({ token });
    },

    async loginAssociation(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new NotFoundError("Email and password are required"));
        }

            const association = await Association.findOne({ where: { email } });
            if (!association) {
                return next(new NotFoundError("Association not found"));
            }

            const isPasswordValid = await bcrypt.compare(password, association.password)
            if (!isPasswordValid) {
                return next(new NotFoundError("Invalid password"));
            }

            const token = jwt.sign(
                { 
                    id: association.id,
                    email: association.email 
                },
                process.env.JWT_SECRET,
                { expiresIn: "2h"}
            ); 
            return res.status(200).json({ token });
    }
}