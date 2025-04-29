import { z } from "zod";

// Definition du schema de validation pour la création d'un user
export const userCreateSchema = z.object({
    email: z.string({message: "email must be a string"}).nonempty({message: "email can't be empty"}).email({message: "email is not in a correct format"}),
    first_name: z.string({message: "first_name must be a string"}).nonempty({message: "first_name can't be empty"}),
    last_name: z.string({message: "last_name must be a string"}).nonempty({message: "last_name can't be empty"}),
    password: z.string({message: "password must be a string"}).nonempty({message: "password data can't be empty"}).min(6, {message: "password must have at least 6 characters"}).max(20, {message: "password must have 20 characters max"}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[+=\[#\]?!@$%^&*\)\(-]).{4,}$/, {message: "password doesn't respect allowed characters (1 lowercase char, 1 uppercase char, 1 digit and 1 special character among these +=#[]?!@$%^&*()-]"}),
    address: z.string({message: "address must be a string"}).nonempty({message: "address data can't be empty"}),
    zip_code: z.string({message: "zip code must be a string"}).nonempty({message: "zip code data can't be empty"}).length(5,{message: "zip code must have 5 numeric characters (ex: 01310)"}),
    city: z.string({message: "city must be a string"}).nonempty({message: "city data can't be empty"}),
    phone_number: z.string({message: "phone number must be a string"}).nonempty({message: "phone number data can't be empty"}).length(10, {message: "phone number must have 10 numeric characters (ex: 0478652857)"}),
    is_admin: z.boolean({message: "isAdmin must be a boolean value"}) 
});

// Definition du schema de validation pour la mise à jour d'un user
export const userUpdateSchema = z.object({
    email: z.string({message: "email must be a string"}).nonempty({message: "email can't be empty"}).email({message: "email is not in a correct format"}),
    first_name: z.string({message: "first_name must be a string"}).nonempty({message: "first_name can't be empty"}),
    last_name: z.string({message: "last_name must be a string"}).nonempty({message: "last_name can't be empty"}),
    password: z.string({message: "password must be a string"}).nonempty({message: "password data can't be empty"}).min(6, {message: "password must have at least 6 characters"}).max(20, {message: "password must have 20 characters max"}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[+=\[#\]?!@$%^&*\)\(-]).{4,}$/, {message: "password doesn't respect allowed characters (1 lowercase char, 1 uppercase char, 1 digit and 1 special character among these +=#[]?!@$%^&*()-]"}),
    address: z.string({message: "address must be a string"}).nonempty({message: "address data can't be empty"}),
    zip_code: z.string({message: "zip code must be a string"}).nonempty({message: "zip code data can't be empty"}).length(5,{message: "zip code must have 5 numeric characters (ex: 01310)"}),
    city: z.string({message: "city must be a string"}).nonempty({message: "city data can't be empty"}),
    phone_number: z.string({message: "phone number must be a string"}).nonempty({message: "phone number data can't be empty"}).length(10, {message: "phone number must have 10 numeric characters (ex: 0478652857)"}),
    is_admin: z.boolean({message: "isAdmin must be a boolean value"}) 
});
  