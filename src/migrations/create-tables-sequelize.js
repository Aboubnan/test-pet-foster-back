import { client } from "../models/client.js";
import { User, Pet, Association, Request, Species, Picture } from "../models/relations.js";

await client.sync({ force: true });
console.log("Synchronisation faite");

await client.close();
