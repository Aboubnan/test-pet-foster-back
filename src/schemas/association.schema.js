import { z } from "zod";

// Definition du schema de validation pour la création d'une association
export const associationCreateSchema = z.object({
    email: z.string({message: "email must be a string"}).nonempty({message: "email can't be empty"}).email({message: "email is not in a correct format"}), // Le champ `email` doit être une chaîne de caractères non vide
    name: z.string({message: "name must be a string"}).nonempty({message: "name can't be empty"}), // Le champ `name` doit être une chaîne de caractères non vide
    password: z.string({message: "password must be a string"}).nonempty({message: "password data can't be empty"}).min(6, {message: "password must have at least 6 characters"}).max(20, {message: "password must have 20 characters max"}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[+=\[#\]?!@$%^&*\)\(-]).{4,}$/, {message: "password doesn't respect allowed characters (must have 1 lowercase char, 1 uppercase char, 1 digit and 1 special character among these +=#[]?!@$%^&*()-]"}), // Le champ `password` doit être une chaîne de caractères non vide
    rna: z.string({message: "RNA must be a string"}).regex(/^(W[0-9]{9})$|^non$/, {message: "NRA must started with 'W' followed by 9 digits (if your association is in Alsace-Moselle, put 'non')"}), // Le champ `rna` doit être une chaîne de 10 caractères (W + 9 chiffres) mais on pourra mettre "non" car les associations en ALSACE/MOSELLE n'ont pas de rna => 💣 🔫 💥
    address: z.string({message: "address must be a string"}).nonempty({message: "address data can't be empty"}), // Le champ `address` doit être une chaîne de caractères non vide
    zip_code: z.string({message: "zip code must be a string"}).nonempty({message: "zip code data can't be empty"}).length(5,{message: "zip code must have 5 numeric characters (ex: 01310)"}), // Le champ `zipcode` doit être une chaîne de caractères non vide
    city: z.string({message: "city must be a string"}).nonempty({message: "city data can't be empty"}), // Le champ `city` doit être une chaîne de caractères non vide
    phone_number: z.string({message: "phone number must be a string"}).nonempty({message: "phone number data can't be empty"}).length(10, {message: "phone number must have 10 numeric characters (ex: 0478652857)"}), // Le champ `phone_number` doit être une chaîne de caractères non vide
    description: z.string({message: "description must be a string"}).min(30, {message: "description length must be 30 characters min"}).max(250, {message: "description can have 250 characters max"}).trim(), // Le champ `description` doit être une chaîne de caractères non vide (min: 20, max: 250 caractères)
    logo: z.string({message: "Logo must be a valid string"}).nonempty({message: "logo data can't be empty"}) // Le champ `logo` doit être une chaîne de caractères non vide
})

// Definition du schema de validation pour la mise à jour d'une association
export const associationUpdateSchema = z.object({
    email: z.string({message: "email must be a string"}).nonempty({message: "email can't be empty"}).email({message: "email is not in a correct format"}), // Le champ `email` doit être une chaîne de caractères non vide
    name: z.string({message: "name must be a string"}).nonempty({message: "name can't be empty"}), // Le champ `name` doit être une chaîne de caractères non vide
    password: z.string({message: "password must be a string"}).nonempty({message: "password data can't be empty"}).min(6, {message: "password must have at least 6 characters"}).max(20, {message: "password must have 20 characters max"}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[+=\[#\]?!@$%^&*\)\(-]).{4,}$/, {message: "password doesn't respect allowed characters (must have 1 lowercase char, 1 uppercase char, 1 digit and 1 special character among these +=#[]?!@$%^&*()-]"}), // Le champ `password` doit être une chaîne de caractères non vide
    rna: z.string({message: "RNA must be a string"}).regex(/^(W[0-9]{9})$|^non$/, {message: "NRA must started with 'W' followed by 9 digits (if your association is in Alsace-Moselle, put 'non')"}), // Le champ `rna` doit être une chaîne de 10 caractères (W + 9 chiffres) mais on pourra mettre "non" car les associations en ALSACE/MOSELLE n'ont pas de rna => 💣 🔫 💥
    address: z.string({message: "address must be a string"}).nonempty({message: "address data can't be empty"}), // Le champ `address` doit être une chaîne de caractères non vide
    zip_code: z.string({message: "zip code must be a string"}).nonempty({message: "zip code data can't be empty"}).length(5,{message: "zip code must have 5 numeric characters (ex: 01310)"}), // Le champ `zipcode` doit être une chaîne de caractères non vide
    city: z.string({message: "city must be a string"}).nonempty({message: "city data can't be empty"}), // Le champ `city` doit être une chaîne de caractères non vide
    phone_number: z.string({message: "phone number must be a string"}).nonempty({message: "phone number data can't be empty"}).length(10, {message: "phone number must have 10 numeric characters (ex: 0478652857)"}), // Le champ `phone_number` doit être une chaîne de caractères non vide
    description: z.string({message: "description must be a string"}).min(20, {message: "description length must be 20 characters min"}).max(250, {message: "description can have 250 characters max"}).trim(), // Le champ `description` doit être une chaîne de caractères non vide (min: 20, max: 250 caractères)
    logo: z.string({message: "Logo must be a valid string"}).nonempty({message: "logo data can't be empty"}) // Le champ `logo` doit être une chaîne de caractères non vide
  })
  