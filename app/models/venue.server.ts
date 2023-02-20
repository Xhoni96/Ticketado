import { e, client } from "~/db.server";
import { UserQuery } from "./event.server";

export async function getVenues(params: { userId: string }) {
  const venues = await e
    .select(e.Venue, (venue) => ({
      ...e.Venue["*"],
      order_by: { expression: venue.createdAt, direction: e.DESC },
      filter: e.op(venue.user, "=", UserQuery(params.userId)),
    }))
    .run(client);

  return venues;
}
