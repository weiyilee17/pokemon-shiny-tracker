// This is for preventing hobby teir server going to sleep.

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../server/db";
import { pokemons } from "../../server/db/schema";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const allPokemons = await db.select().from(pokemons);

    res.status(200).json({
      allPokemons,
    });
  } catch (err) {
    console.error(err);
  }
}
