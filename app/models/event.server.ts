import { e, client } from "~/db.server";
import type { CreateEventParams } from "~/types";

export function UserQuery(id: string) {
  return e.select(e.User, () => ({
    // email: true,
    // ...e.User["*"],
    filter_single: { id },
  }));
}
const VenueQuery = (id: string) => {
  return e.select(e.Venue, (venue) => ({
    // ...e.Venue["*"],
    filter_single: { id },
  }));
};

export async function getEvent(params: { id: string; userId: string }) {
  const userEvents = e.select(e.Event, (event) => ({
    filter: e.op(event.user, "=", UserQuery(params.userId)),
  }));

  const event = e.select(userEvents, (event) => ({
    ...e.Event["*"],
    venue: {
      ...e.Venue["*"],
    },
    filter_single: e.op(event.id, "=", e.uuid(params.id)),
  }));

  return event.run(client);
}

export async function getEvents(params: { userId: string }) {
  const events = await e
    .select(e.Event, (event) => ({
      ...e.Event["*"],
      venue: {
        ...e.Venue["*"],
      },
      order_by: { expression: event.createdAt, direction: e.DESC },
      filter: e.op(event.user, "=", UserQuery(params.userId)),
    }))
    .run(client);

  return events;
}

export async function getEventsByName(params: { name: string; userId: string }) {
  const events = await e
    .select(e.Event, (event) => ({
      ...e.Event["*"],
      venue: {
        ...e.Venue["*"],
      },
      // order_by: { expression: event.createdAt, direction: e.DESC },
      filter: e.op(
        e.op(event.user, "=", UserQuery(params.userId)),
        "and",
        e.op(event.name, "ilike", `${params.name}%`)
      ),
    }))
    .run(client);

  return events;
}

export async function createEvent(eventParams: CreateEventParams, userId: string, venueId: string) {
  const insertEvent = e.insert(e.Event, {
    ...eventParams,
    user: UserQuery(userId),
    venue: VenueQuery(venueId),
  });
  return await e.select(insertEvent, () => ({ ...e.Event["*"] })).run(client);
}

export const updateEvent = async (id: string, value: { [key: string]: /* string | boolean | number */ any }) => {
  const update = e.update(e.Event, () => ({
    filter_single: { id },
    set: value,
  }));

  // return update;
  // return await e.select(update, () => ({ ...e.Event["*"] })).run(client);
  return update.run(client);
};

export async function deleteEvent(params: { id: string; userId: string }) {
  const deleted = await e
    .delete(e.Event, (event) => ({
      filter: e.op(e.op(event.id, "=", e.uuid(params.id)), "and", e.op(event.user, "=", UserQuery(params.userId))),
    }))
    .run(client);
  return deleted.length;
}
