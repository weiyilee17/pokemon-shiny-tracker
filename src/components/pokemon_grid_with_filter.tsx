"use client";

import { useState } from "react";
import CaptureProgress from "~/components/capture_progress";
import PokemonCardGrid from "~/components/pokemon_card_grid";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";

import { LoadingPage } from "./loading";

import type { ChangeEvent } from "react";

function GridWithFilter() {
  const { data: pokemons, isLoading } = api.pokemon.getAll.useQuery();

  const [filterString, setFilterString] = useState("");

  if (isLoading) {
    return <LoadingPage />;
  }

  if (pokemons === undefined) {
    return <p>Something went wrong. Pokemons should show</p>;
  }

  const handleFilterStringChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterString(e.target.value);
  };

  const filteredPokemons = pokemons.filter((singlePokemon) => {
    if (filterString === "") {
      return true;
    }

    const searchById = !Number.isNaN(+filterString);
    return searchById
      ? singlePokemon.id === +filterString
      : singlePokemon.name.includes(filterString.toLowerCase());
  });

  return (
    <>
      <div className="flex w-3/5 flex-col items-center sm:w-2/5">
        <CaptureProgress />
        <Input
          className="my-8"
          placeholder="Find a pokemon using name or id"
          value={filterString}
          onChange={handleFilterStringChange}
        />
      </div>
      <PokemonCardGrid pokemons={filteredPokemons} />
    </>
  );
}

export default GridWithFilter;
