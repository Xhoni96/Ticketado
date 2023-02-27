import type { LoaderArgs } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";
import { getVenuesByName } from "~/models/venue.server";
import { json } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  if (query) {
    const venues = await getVenuesByName({ name: query, userId });
    return json(venues);
  }
  return json(null);
};
