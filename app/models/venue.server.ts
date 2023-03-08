import { e, client } from "~/db.server";
import { UserQuery } from "./event.server";
// import type { VenueWithoutId } from "~/types";

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

export async function getVenuesByName(params: { name: string; userId: string }) {
  const venues = await e
    .select(e.Venue, (venue) => ({
      ...e.Venue["*"],
      // order_by: { expression: venue.createdAt, direction: e.DESC },
      // filter: e.op(venue.user, "=", UserQuery(params.userId)),
      filter: e.op(
        e.op(venue.user, "=", UserQuery(params.userId)),
        "and",
        e.op(venue.name, "ilike", `${params.name}%`)
      ),
    }))
    .run(client);

  return venues;
}

// export const updateVenue = async (id: string, values: VenueWithoutId) => {
//   const update = e.update(e.Venue, () => ({
//     filter_single: { id },
//     set: values,
//   }));

//   return update.run(client);
// };

// export const createVenue = async (venueParams: VenueWithoutId, userId: string) => {
//   const insertVenue = e.insert(e.Venue, {
//     ...venueParams,
//     user: UserQuery(userId),
//   });
//   // return await e.select(insertVenue, () => ({ ...e.Venue["*"] })).run(client);
//   return insertVenue.run(client);
// };
