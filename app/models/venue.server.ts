import { e, client } from "~/db.server";
import { User } from "./event.server";

export async function getVenues(params: { userId: string }) {
  const venues = await e
    .select(e.Venue, (venue) => ({
      ...e.Venue["*"],
      order_by: { expression: venue.createdAt, direction: e.DESC },
      filter: e.op(venue.user, "=", User(params.userId)),
    }))
    .run(client);

  return venues;
}
