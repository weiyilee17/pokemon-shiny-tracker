import type { RouterOutputs } from "~/utils/api";
import PokemonCard from "./pokemon_card";

type TPokemonsWithCaptured = RouterOutputs["pokemon"]["getAll"];

function PokemonCardGrid({ pokemons }: { pokemons: TPokemonsWithCaptured }) {
  return (
    <div className="container grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {pokemons.map((singlePokemon) => (
        <PokemonCard {...singlePokemon} key={singlePokemon.id} />
      ))}
    </div>
  );
}

export default PokemonCardGrid;
