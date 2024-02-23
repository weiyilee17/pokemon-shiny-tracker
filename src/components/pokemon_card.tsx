import Image from "next/image";
import { api } from "~/utils/api";

import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

import type { RouterOutputs } from "~/utils/api";

type TPokemon = RouterOutputs["pokemon"]["getAll"][number];

function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function PokemonCard({ id, name, imageUrl, captured }: TPokemon) {
  const utils = api.useUtils();

  const { mutate, isLoading } = api.pokemon.toggleCapturedById.useMutation({
    onSuccess: () => {
      void utils.pokemon.getCapturedCount.invalidate();
    },
  });

  const handlePokemonCaptured = (_: boolean) => {
    mutate({ id });
  };

  return (
    <Card className="px-8 py-4">
      <CardContent>
        <Image
          className="mx-auto"
          src={imageUrl}
          alt={`Image of ${name}.`}
          width={100}
          height={100}
          // 4 rows are shown in full screen in initial load
          priority={id <= 24}
        />

        <p className="text-center">{capitalizeString(name)}</p>

        <div className="mt-2 flex items-center justify-center space-x-2">
          <Checkbox
            id={`${name}-captured`}
            defaultChecked={captured}
            onCheckedChange={handlePokemonCaptured}
            disabled={isLoading}
            aria-label={`${name}-captured`}
          />

          {/* id has to be unique for label to work. Since this is mapped, id or name is required to make htmlFor work. */}
          <Label htmlFor={`${name}-captured`}>Captured</Label>
        </div>
      </CardContent>
    </Card>
  );
}

export default PokemonCard;
