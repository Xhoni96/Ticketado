import type { ActionArgs, LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from "@remix-run/react";

import stylesheet from "~/styles/tailwind.css";
import { createUserSession, getUser } from "./session.server";
import { safeRedirect } from "./utils/utils";
import { verifyLogin } from "./models/user.server";
import { Navbar } from "./components/Navbar";
import { loginSchema } from "./schemas/schema.server";
import { zodErrorsToObj } from "./utils/utils.server";
import { WidgetContainer } from "./components/VmtWidget/WidgetContainer";
import { Suspense } from "react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesheet }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Tamtoto",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export type ActionType = typeof action;

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/events?q=current");

  const remember = formData.get("remember");

  const zodData = loginSchema.safeParse({ email, password });

  if (!zodData.success) {
    const errors = zodErrorsToObj(zodData.error.issues);
    return json({ errors: errors }, { status: 400 });
  }

  const user = await verifyLogin(zodData.data.email, zodData.data.password);

  if (!user) {
    return json({ errors: { email: "Invalid email or password", password: null } }, { status: 400 });
  }
  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full px-44">
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Suspense fallback={<div>Loadinggg</div>}>
          <script src="/bundle.js" />
          <WidgetContainer />
        </Suspense>
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Event not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
