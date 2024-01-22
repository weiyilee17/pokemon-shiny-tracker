import { signIn, signOut, useSession } from "next-auth/react";
import PageLayout from "~/components/layout";
import { LoadingSpinner } from "~/components/loading";
import GridWithFilter from "~/components/pokemon_grid_with_filter";

export default function Home() {
  const { data: sessionData, status } = useSession();

  // Without this, before session data is loaded, no matter whether the user is logged in or not, "Please log in to
  // see your personal record" would be showed. In cases when user is already logged in, this would cause a flicker
  // when refreshing the page.
  if (status === "loading") {
    return <LoadingSpinner />;
  }

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
