import { z } from "zod";

export const speciesCreateSchema = z.object({
    name: z.string({message:"species name must be a string"}).nonempty({message: "species name data can't be empty"}).min(3)
});

export const speciesUpdateSchema = z.object({
    name: z.string({message:"species name must be a string"}).nonempty({message: "species name data can't be empty"}).min(3)
});
  