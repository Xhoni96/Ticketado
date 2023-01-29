import type {
  ActionFunction,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { createUserSession, getUser } from "./session.server";
import { z } from "zod";
import { safeRedirect, zodErrorsToObj } from "./utils";
import { verifyLogin } from "./models/user.server";
import { Navbar } from "./components/Navbar";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
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

const loginSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().min(8, { message: "Password is too short" }),
});

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/events");

  const remember = formData.get("remember");

  const zodData = loginSchema.safeParse({ email, password });

  if (!zodData.success) {
    const errors = zodErrorsToObj(zodData.error.issues);
    return json({ errors: errors }, { status: 400 });
  }

  const user = await verifyLogin(zodData.data.email, zodData.data.password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
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
      </body>
    </html>
  );
}
