import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { getEvents } from "~/models/event.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const eventsList = await getEvents({ userId });
  return json({ eventsList });
}

export default function EventsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="flex flex-col p-4">
      <div>
        {data.eventsList.length === 0 ? (
          <p className="p-4">No Events yet</p>
        ) : (
          <ol>
            {data.eventsList.map((event) => (
              <li key={event.id}>
                <Link className="block border-b p-4 text-xl" to={`${event.id}`}>
                  📝 {event.name}
                </Link>
              </li>
            ))}
          </ol>
        )}
        <Outlet />
      </div>
    </main>
  );
}
