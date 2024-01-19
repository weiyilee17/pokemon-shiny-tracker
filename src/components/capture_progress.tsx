import { api } from "~/utils/api";
import { Progress } from "./ui/progress";

function CaptureProgress() {
  const { data } = api.pokemon.getCapturedCount.useQuery();

  if (data === undefined) {
    return (
      <p>
        Something went wrong while getting captured count of pokemons captured.
      </p>
    );
  }

  return (
    <>
      <Progress
        // getValueLabel and max doesn't seem to work, so had to do it this way
        value={(data * 100) / 153}
      />
    </>
  );
}

export default CaptureProgress;