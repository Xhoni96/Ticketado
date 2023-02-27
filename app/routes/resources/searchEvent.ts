import type { LoaderArgs } from "@remix-run/server-runtime";
import { getEventsByName } from "~/models/event.server";
import { requireUserId } from "~/session.server";
import { json } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);

  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (query) {
    const events = await getEventsByName({ name: query, userId });
    return json(events);
  }
  return json(null);
};
