import { client } from "../models/client.js";
import { Association, User, Pet, Request, Species, Picture } from "../models/relations.js"

// création d'associations
await Association.bulkCreate([
    { 
        email: "spa69@spa.fr", 
        name: "SPA Lyon Sud Est", 
        password: "MotD3PaSS3", 
        rna: "W691089509", 
        address: "25 quai Jean Moulin", 
        zip_code: "69002", 
        city: "Lyon", 
        phone_number: "0478387171",
        logo: "https://www.spa-lyon.org/wp-content/uploads/2020/01/spalyon-2019-rvb-300x256.png",
        description: "La S.P.A. de Lyon est une association indépendante, créée en 1853 et reconnue d'utilité publique en 1893. Elle porte secours aux animaux en détresse : perdus, abandonnés et maltraités. Elle gère les refuges de Brignais (Rhône) et de Dompierre-sur-Veyle (Ain)."
    },
    { 
        email: "spa44@spa.fr", 
        name: "SPA 21 NANTES", 
        password: "azertyuiop", 
        rna: "W442574312", 
        address: "route des Landes Bigot", 
        zip_code: "44340", 
        city: "Bouguenais", 
        phone_number: "0249628102",
        logo: "https://www.la-spa.fr/app/app/uploads/2021/09/MicrosoftTeams-image-63.png",
        description: "LA SPA de Nantes-Bouguenais vous accueille les lundis, mercredis, vendredis (13h30-17h00) et samedis et dimanches (10h30-12h30/14h00-17h30) pour trouver votre nouveau compagnon de vie. Le refuge se situe au Sud-ouest de Nantes sur la commune de Bouguenais."
    },

    { 
        email: "cda12@cda12.fr", 
        name: "Club de Défense des Animaux Paris 12", 
        password: "ItIsASecretToEverybody", 
        rna: "W751053023", 
        address: "181 avenue Daumesnil", 
        zip_code: "75012", 
        city: "Paris", 
        phone_number: "0174314705",
        logo: "https://www.cda-paris12.com/wp-content/uploads/2023/08/cropped-LOGO-CERCLE-TXT-NOIR.png",
        description: "Le CDA 12 (Club de Défense des Animaux Paris 12) est une association d’assistance aux chats abandonnés, située dans le 12ème arrondissement à Paris. Créée en 1979 et reconnue d’intérêt général, l’association s’appuie sur son réseau de familles d’accueil référencées et bénévoles dans tout Paris et la proche banlieue."
    },
]);

// création des espèces
await Species.bulkCreate([
    {
        name: "Chien"
    },

    {
        name: "Chat"
    },

    {
        name: "Lapin"
    },

    {
        name: "Furet"
    },

    {
        name: "Hamster"
    }
]);

// création d'utilisateurs (1 admin et 2 bénévoles)
await User.bulkCreate([
    {
        email:"admin@dmin.com",
        password: "123456",
        first_name: "DeN",
        last_name: "PAT",
        address: "666 rue du paradis",
        zip_code: "69006",
        city: "Lyon",
        phone_number: "0478602587",
        is_admin: true
    },

    {
        email: "janedoe@free.fr",
        password: "111111",
        first_name: "Jane",
        last_name: "DOE",
        address: "30 cours Charlemagne",
        zip_code: "75005",
        city: "Paris",
        phone_number: "0147586895",
    },

    {
        email: "md@wanadoo.fr",
        password: "pizza$!",
        first_name: "Matthieu",
        last_name: "DESCHENES",
        address: "18 Quai Saint-Nicolas",
        zip_code: "59200",
        city: "Tourcoing",
        phone_number: "0338620425",
    },
]);

// création d'animaux à adopter
await Pet.bulkCreate([
    {
        name: "Chucky", 
        birthdate: "2016/06/06",
        sex: "Male",
        description: "C'est un chat assez âgé. Il terrorise tous ses compagnons pour s'accaparer leur place. Ne pas mettre entre les mains de vos enfants...",
        species_id: 2,
        association_id: 1
    },

    {
        name: "Globule", 
        birthdate: "2023/01/01",
        sex: "Femelle",
        description: "Chatte abandonnée suite à un changement de vie. Elle a un sacré caractère et a obligatoirement besoin de son espace et de temps au calme. Sauvage, elle se montera caline par moments",
        species_id: 2,
        association_id: 3
    },

    {
        name: "Farouk", 
        birthdate: "2023/05/30",
        sex: "Male",
        description: "Chien espiègle, joueur, fripon... Il adore apprendre et aura besoin d’acquérir encore quelques apprentissages, mais il est prêt à progresser avec des maîtres patients et bienveillants... A éviter avec les chats !  ",
        species_id: 1,
        association_id: 1
    },
]);

// création d'une requête d'adoption
await Request.bulkCreate([
    {
        starting_date: "2025/04/30",
        ending_date: "2025/05/15",
        request_text: "Bonjour, Blablablabla...",   
        user_id: 2,
        pet_id: 3,
        association_id: 1
    }
])

// création d'images pour animaux
await Picture.bulkCreate([
    {
        url: "https://www.grindstore.com/cdn/shop/files/170376-front.jpg?v=1724252041",
        pet_id: 1
    },
    {
        url: "https://d3544la1u8djza.cloudfront.net/APHI/Blog/2020/07-23/How+Much+Does+It+Cost+to+Have+a+Cat+_+ASPCA+Pet+Insurance+_+black+cat+with+yellow+eyes+peeking+out-min.jpg",
        pet_id: 2
    },
    {
        url: "https://i0.wp.com/www.association-galia.fr/wp-content/uploads/formidable/Farouk-31-10.jpg?fit=800%2C532&ssl=1",
        pet_id: 3
    }
]);

console.log("Seeding des données terminé !!!");
await client.close();
