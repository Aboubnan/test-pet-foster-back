import { z } from "zod";

// Definition du schema de validation pour la création d'une association
export const petCreateSchema = z.object({
    name: z.string({message: "name must be a string"}).nonempty({message: "name data can' be empty"}),
    birthdate: z.string({message: "date must be filled"}).date("birthdate must be like AAAA-MM-JJ (ex: 2025-04-30)"), // prop message directement dans la fonction date donc on ne le met pas commme les autres !
    sex: z.enum(['Male', 'Femelle'], {message: "sex must be 'Male' or 'Femelle'"}),
    description: z.string({message: "description must be string"}).nonempty("description can't be empty").min(30, {message: "description can't be less than 30 characters"}).max(250, {message: "description length can't be higher than 250 characters"}),
    is_available: z.boolean({message: "isAvailable must be a boolean"}),
    association_id: z.number({message: "association id must be a number"}).positive({message: "association id must be positive"}),
    species_id: z.number({message: "species id must be a number"}).positive({message: "species id must be positive"})
});

// Definition du schema de validation pour la mise à jour d'un pet
export const petUpdateSchema = z.object({
    name: z.string({message: "name must be a string"}).nonempty({message: "name data can' be empty"}),
    birthdate: z.string({message: "date must be filled"}).date("birthdate must be like AAAA-MM-JJ (ex: 2025-04-30)"), // prop message directement dans la fonction date donc on ne le met pas commme les autres !
    sex: z.enum(['Male', 'Femelle'], {message: "sex must be 'Male' or 'Femelle'"}),
    description: z.string({message: "description must be string"}).nonempty("description can't be empty").min(30, {message: "description can't be less than 30 characters"}).max(250, {message: "description length can't be higher than 250 characters"}),
    is_available: z.boolean({message: "isAvailable must be a boolean"}),
    association_id: z.number({message: "association id must be a number"}).positive({message: "association id must be positive"}),
    species_id: z.number({message: "species id must be a number"}).positive({message: "species id must be positive"})
});
  