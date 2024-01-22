import type { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";

function PageLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="flex min-h-screen flex-col">
        <div className="container flex flex-col gap-12 px-4 pb-16 pt-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              {children}
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default PageLayout;
