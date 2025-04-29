import { z } from "zod";

export const requestCreateSchema = z.object({
    status: z.enum(["Nouveau", "En cours", "Accepté", "Refusé"], {message: "status must be one of these : 'Nouveau', 'En cours', 'Accepté' or 'Refusé'"}),
    starting_date: z.string({message: "starting date must be filled"}).date("birthdate must be like AAAA-MM-JJ (ex: 2025-04-30)"),
    ending_date: z.string({message: "ending date must be filled"}).date("birthdate must be like AAAA-MM-JJ (ex: 2025-04-30)"),
    request_text: z.string({message: "request text be string"}).nonempty("request text can't be empty").min(30, {message: "request text can't be less than 30 characters"}).max(250, {message: "request text length can't be higher than 250 characters"}),
    user_id: z.number({message: "user id must be a number"}).positive({message: "user id must be positive"}),
    pet_id: z.number({message: "pet id must be a number"}).positive({message: "pet id must be positive"})
})

export const requestUpdateSchema = z.object({
    status: z.enum(["Nouveau", "En cours", "Accepté", "Refusé"], {message: "status must be 'Nouveau', 'En cours', 'Accepté' or 'Refusé'"}),
    starting_date: z.string({message: "date must be filled"}).date("birthdate must be like AAAA-MM-JJ (ex: 2025-04-30)"),
    ending_date: z.string({message: "date must be filled"}).date("birthdate must be like AAAA-MM-JJ (ex: 2025-04-30)"),
    request_text: z.string({message: "request text be string"}).nonempty("request text can't be empty").min(30, {message: "request text can't be less than 30 characters"}).max(250, {message: "request text length can't be higher than 250 characters"}),
    user_id: z.number({message: "user id must be a number"}).positive({message: "user id must be positive"}),
    pet_id: z.number({message: "pet id must be a number"}).positive({message: "pet id must be positive"})
})
  