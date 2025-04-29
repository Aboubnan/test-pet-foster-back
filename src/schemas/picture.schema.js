import { z } from "zod";

export const pictureCreateSchema = z.object({
    url: z.string({message: "url must be a string"}).nonempty({message: "url data can't be empty"}),
    pet_id: z.number({message: "pet Id must be a number"}).positive({message: "pet Id must be a positive number"})
})

export const pictureUpdateSchema = z.object({
    url: z.string({message: "url must be a string"}).nonempty({message: "url data can't be empty"}),
    pet_id: z.number({message: "pet Id must be a number"}).positive({message: "pet Id must be a positive number"})
})
