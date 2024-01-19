import { signIn, signOut, useSession } from "next-auth/react";
import PageLayout from "~/components/layout";
import GridWithFilter from "~/components/pokemon_grid_with_filter";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <PageLayout>
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>

      {sessionData ? (
        <GridWithFilter />
      ) : (
        <p>Please log in to see your personal record.</p>
      )}
    </PageLayout>
  );
}
