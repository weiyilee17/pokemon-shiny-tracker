import type { PropsWithChildren } from "react";

function PageLayout({ children }: PropsWithChildren) {
  return (
    <main className="container min-h-screen px-4 pb-16 pt-4">
      <div className="flex flex-col items-center justify-center gap-4">
        {children}
      </div>
    </main>
  );
}

export default PageLayout;
