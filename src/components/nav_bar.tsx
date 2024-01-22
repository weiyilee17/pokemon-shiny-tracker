import { signIn, signOut, useSession } from "next-auth/react";
import DarkModeToggle from "~/components/dark_mode_toggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

function NavBar() {
  const { data: sessionData } = useSession();

  return (
    <nav className="flex w-full justify-end gap-4">
      <DarkModeToggle />
      {sessionData?.user && (
        <Avatar>
          <AvatarImage
            src={sessionData?.user.image ?? "user"}
            alt={`Avatar for ${sessionData?.user.name ?? "user"}`}
          />
          <AvatarFallback>
            {`Avatar for ${sessionData?.user.name ?? "?"}`}
          </AvatarFallback>
        </Avatar>
      )}
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </nav>
  );
}

export default NavBar;
