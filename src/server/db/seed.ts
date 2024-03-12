// Not sure whether this is the right way to initialize the database

import type { InferSelectModel } from "drizzle-orm";
import { db } from "./";
import { pokemons } from "./schema";

const pokemonIds: number[] = [];

for (let i = 1; i <= 151; i++) {
  pokemonIds.push(i);
}

pokemonIds.push(808);
pokemonIds.push(809);

type TResponse = {
  name: string;
  sprites: {
    front_shiny: string;
  };
};

async function get_og_pokemon_data(pokemonId: number) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    );
    const data = (await response.json()) as TResponse;
    const { name, sprites } = data;

    return {
      id: pokemonId,
      name,
      imageUrl: sprites.front_shiny,
    };
  } catch (err) {
    console.error(
      `error happened when getting pokemon ${pokemonId}'s data from pokemon API`,
      err,
    );
  }
}

type TPokemon = InferSelectModel<typeof pokemons>;

async function main() {
  const formattedData = await Promise.all(
    pokemonIds.map((id) => get_og_pokemon_data(id)),
  );
  // console.log(formattedData);

  // This doesn't work to prevent typescript from thinking formattedData might be undefined,
  // so had to cast types instead
  // if (formattedData.some((data) => data === undefined)) {
  //   throw new Error("No formatted data");
  // }

  // npx tsx ./src/server/db/seed.ts is the command to run the script.
  // tsx makes ts runable in node, but fails to load environment variables. Since this is only running once,
  // could use the string directly. The enviroment variable works for t3, but not for cases like running scripts
  // I guess it's because the project looks through the entire app, while tsx only goes through 1 file

  // Not sure why on pg this doesn't finish and had to manually stop, the values where inserted into the db
  await db.insert(pokemons).values(formattedData as TPokemon[]);
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
