import type { PropsWithChildren } from "react";

function PageLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col gap-12 px-4 py-16 ">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

export default PageLayout;
