import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-7xl">𓂀</div>
        <h1 className="mt-4 font-display text-5xl text-gold">404</h1>
        <h2 className="mt-2 font-display text-xl">Lost in the desert</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page has been swallowed by the sands of time.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-night shadow-gold"
          >
            Return to Pharos
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pharos — Discover 7,000 Years of Egyptian Wonder" },
      {
        name: "description",
        content:
          "Pharos is an interactive heritage atlas of Egypt — explore pyramids, temples, deserts, and oases through maps and stories.",
      },
      { name: "author", content: "Pharos" },
      { property: "og:title", content: "Pharos — Egyptian Heritage Atlas" },
      { property: "og:description", content: "An interactive map and story platform for Egypt's iconic places." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
