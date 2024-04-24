import type { RouterOutputs } from "~/utils/api";
import { forwardRef } from "react";
import { VirtuosoGrid } from "react-virtuoso";

import PokemonCard from "./pokemon_card";

import type { ComponentProps, PropsWithChildren } from "react";

type TPokemonsWithCaptured = RouterOutputs["pokemon"]["getAll"];

const gridComponents = {
  List: forwardRef<HTMLDivElement, ComponentProps<"div">>(
    ({ style, children, ...props }, ref) => (
      <div
        ref={ref}
        {...props}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          ...style,
        }}
      >
        {children}
      </div>
    ),
  ),
  Item: ({ children, ...props }: PropsWithChildren) => (
    <div
      {...props}
      style={{
        margin: "0.5rem",
        display: "flex",
        flex: "none",
        alignContent: "stretch",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  ),
};

const ItemWrapper = ({ children, ...props }: PropsWithChildren) => (
  <div
    {...props}
    style={{
      display: "flex",
      flex: 1,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

const getItemCountent = (
  _: number,
  singlePokemon: TPokemonsWithCaptured[number],
) => (
  <ItemWrapper>
    <PokemonCard {...singlePokemon} />
  </ItemWrapper>
);

function PokemonCardGrid({ pokemons }: { pokemons: TPokemonsWithCaptured }) {
  return (
    <>
      <VirtuosoGrid
        // TODO: virtualization tends to use absolute positioning, See if the class can be dynamic
        className="!h-[667px] !w-[350px] sm:!w-[640px] md:!h-[900px] md:!w-[768px] xl:!w-[1280px]"
        data={pokemons}
        components={gridComponents}
        itemContent={getItemCountent}
      />
      <style>{`html, body, #root { height: 100% }`}</style>
    </>

    // <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
    //   {pokemons.map((singlePokemon) => (
    //     <PokemonCard {...singlePokemon} key={singlePokemon.id} />
    //   ))}
    // </div>
  );
}

export default PokemonCardGrid;
