-- script de création en SQL
BEGIN;

DROP TABLE IF EXISTS "user", "pet", "association", "species", "picture", "request";

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(255) NOT NULL,
  "last_name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "address" VARCHAR(255) NOT NULL,
  "zipcode" VARCHAR(255) NOT NULL,
  "city" VARCHAR(255) NOT NULL,
  "phone_number" VARCHAR(255) NOT NULL,
  "is_admin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "association" (
  "id" SERIAL PRIMARY KEY,
  "rna" VARCHAR(255) NOT NULL UNIQUE,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "address" VARCHAR(255) NOT NULL,
  "zipcode" VARCHAR(255) NOT NULL,
  "city" VARCHAR(255) NOT NULL,
  "phone_number" VARCHAR(255) NOT NULL,
  "logo" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL
);

CREATE TABLE "species" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL
);

-- creation type pour enum
CREATE TYPE sex AS ENUM ('Male', 'Femelle');

CREATE TABLE "pet" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "birthdate" DATE NOT NULL,
  "sex" SEX NOT NULL,
  "description" TEXT NOT NULL,
  "is_available" BOOLEAN NOT NULL DEFAULT TRUE,
  "species_id" INTEGER REFERENCES "species"("id"),
  "association_id" INTEGER REFERENCES "association"("id")
);

CREATE TABLE "picture" (
  "id" SERIAL PRIMARY KEY,
  "url" VARCHAR(255) NOT NULL,
  "pet_id" INTEGER REFERENCES "pet"("id")
);



-- creation type pour enum
CREATE TYPE status AS ENUM ('Nouveau', 'En cours', 'Accepté', 'Refusé');

CREATE TABLE "request" (
  "id" SERIAL PRIMARY KEY,
  "status" STATUS NOT NULL,
  "starting_date" DATE NOT NULL,
  "ending_date" DATE NOT NULL,
  "user_id" INTEGER REFERENCES "user"("id"),
  "pet_id" INTEGER REFERENCES "pet"("id")
);

COMMIT;