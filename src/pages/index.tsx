import { useSession } from "next-auth/react";
import PageLayout from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import NavBar from "~/components/nav_bar";
import GridWithFilter from "~/components/pokemon_grid_with_filter";

export default function Home() {
  const { data: sessionData, status } = useSession();

  // Without this, before session data is loaded, no matter whether the user is logged in or not, "Please log in to
  // see your personal record" would be showed. In cases when user is already logged in, this would cause a flicker
  // when refreshing the page.
  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <PageLayout>
      <NavBar />

      {sessionData ? (
        <GridWithFilter />
      ) : (
        <p>Please log in to see your personal record.</p>
      )}
    </PageLayout>
  );
}
