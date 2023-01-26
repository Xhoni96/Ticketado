import type { Event } from "dbschema/interfaces";
import { e, client } from "~/db.server";

export function User(id: string) {
  return e.select(e.User, (user) => ({
    // email: true,
    // ...e.User["*"],
    filter_single: { id },
  }));
}
// const eventQuery = e.select(userEvents, (event) => ({
//   ...e.Event["*"],
//   filter: e.op(event.id, "=", e.uuid(params.id)),
// }));

export async function getEvent(params: { id: string; userId: string }) {
  const userEvents = e.select(e.Event, (event) => ({
    filter: e.op(event.user, "=", User(params.userId)),
  }));

  const event = e.select(userEvents, (event) => ({
    ...e.Event["*"],
    filter_single: e.op(event.id, "=", e.uuid(params.id)),
  }));

  return event.run(client);
}

export async function getEvents(params: { userId: string }) {
  const events = await e
    .select(e.Event, (event) => ({
      ...e.Event["*"],
      order_by: { expression: event.createdAt, direction: e.DESC },
      filter: e.op(event.user, "=", User(params.userId)),
    }))
    .run(client);

  return events;
}

type CreateEventParams = Omit<Event, "user" | "createdAt" | "id">;

export async function createEvent(
  eventParams: CreateEventParams,
  userId: string
) {
  const insertEvent = e.insert(e.Event, {
    ...eventParams,
    user: User(userId),
  });
  return await e.select(insertEvent, () => ({ ...e.Event["*"] })).run(client);
}

export async function deleteEvent(params: { id: string; userId: string }) {
  const deleted = await e
    .delete(e.Event, (event) => ({
      filter: e.op(
        e.op(event.id, "=", e.uuid(params.id)),
        "and",
        e.op(event.user, "=", User(params.userId))
      ),
    }))
    .run(client);
  return deleted.length;
}
