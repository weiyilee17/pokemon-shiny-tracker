import { and, count, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { pokemonCaptured, pokemons } from "~/server/db/schema";

export const pokemonRouter = createTRPCRouter({
  toggleCapturedById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const currentUserId = ctx.session.user.id;

      const IdsOfPokemonsCaptured = await ctx.db
        .select({
          id: pokemonCaptured.pokemonId,
        })
        .from(pokemonCaptured)
        .where(eq(pokemonCaptured.userId, currentUserId));

      // TODO: try and see if `inArray` or `exists` works in this scenario
      const capturedPokemonIds = new Set(
        IdsOfPokemonsCaptured.map(({ id }) => id),
      );

      if (capturedPokemonIds.has(id)) {
        await ctx.db
          .delete(pokemonCaptured)
          .where(
            and(
              eq(pokemonCaptured.userId, currentUserId),
              eq(pokemonCaptured.pokemonId, id),
            ),
          );
      } else {
        await ctx.db
          .insert(pokemonCaptured)
          .values({ userId: currentUserId, pokemonId: id });
      }
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.session.user.id;

    const allPokemons = await ctx.db.select().from(pokemons);

    const IdsOfPokemonsCaptured = await ctx.db
      .select({
        id: pokemonCaptured.pokemonId,
      })
      .from(pokemonCaptured)
      .where(eq(pokemonCaptured.userId, currentUserId));

    // Not sure whether this is the right way of doing this.
    // Perhaps there are ways to do it using queries?
    // TODO: research on this in the future
    const capturedPokemonIds = new Set(
      IdsOfPokemonsCaptured.map(({ id }) => id),
    );

    const allPokemonsWithCaptured = allPokemons.map((singlePokemon) => ({
      ...singlePokemon,
      captured: capturedPokemonIds.has(singlePokemon.id),
    }));

    return allPokemonsWithCaptured;
  }),
  getCapturedCount: protectedProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.session.user.id;

    const capturedPokemonsCount = await ctx.db
      .select({
        capturedCount: count(pokemonCaptured.pokemonId),
      })
      .from(pokemonCaptured)
      .where(eq(pokemonCaptured.userId, currentUserId));

    return capturedPokemonsCount[0]?.capturedCount;
  }),
});
