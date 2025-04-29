// ce sont les relations entre les entités (j'ai modifié "associations" par "relations" en nom de fichier car c'est confus avec les associations d'animaux 😅)
import { Association } from "./Association.js";
import { User } from "./User.js";
import { Pet } from "./Pet.js";
import { Species } from "./Species.js";
import { Picture } from "./Picture.js";
import { Request } from "./Request.js";

// User/Request : Many to One
User.hasMany(Request, {as: "requests", foreignKey: "user_id"});
Request.belongsTo(User, { as: "user", foreignKey: "user_id"});

// Pet/Request : Many to One
Pet.hasMany(Request, {as: "requests", foreignKey: "pet_id"});
Request.belongsTo(Pet, { as: "pet", foreignKey: "pet_id"});

// Association/Request : Many to One
Association.hasMany(Request, {as: "requests", foreignKey: "association_id"});
Request.belongsTo(Association, { as: "association", foreignKey: "association_id"});

// Association/Pet : Many to One
Association.hasMany(Pet, {as: "pets", foreignKey: "association_id"});
Pet.belongsTo(Association, {as: "association", foreignKey: "association_id"});

// Association Pet/Species : Many To One
Species.hasMany(Pet, {as: "pets", foreignKey: "species_id"});
Pet.belongsTo(Species, {as: "species", foreignKey: "species_id"});

// Association Picture/Pet : Many To One
Pet.hasMany(Picture, {as: "pictures", foreignKey: "pet_id"});
Picture.belongsTo(Pet, { as: "pet", foreignKey: "pet_id"});

export { Pet, Association, User, Request, Picture, Species }

