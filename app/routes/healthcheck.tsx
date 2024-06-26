// learn more: https://fly.io/docs/reference/configuration/#services-http_checks
import type { LoaderArgs } from "@remix-run/node";

// import { prisma } from "~/db.server";

export async function loader({ request }: LoaderArgs) {
  //   const host =
  //     request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

  try {
    //   const url = new URL("/", `http://${host}:10704/server/status/alive`);
    const url = "http://localhost:10704/server/status/alive";
    //   if we can connect to the database and make a simple query
    //   and make a HEAD request to ourselves, then we're good.
    //   await Promise.all([

    const res = await fetch(url);

    if (res.status === 200) throw "instance is not alive";

    return new Response("OK");
  } catch (error: unknown) {
    return new Response("ERROR", { status: 500 });
  }
}
