import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteEvent, getEvent } from "~/models/event.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.eventId, "eventId not found");

  const event = await getEvent({ userId, id: params.eventId });
  console.log(event, "eventsssssssss");

  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ event });
}

export async function action({ request, params }: ActionArgs) {
  const { _action } = Object.fromEntries(await request.formData());

  if (_action === "delete") {
    const userId = await requireUserId(request);
    invariant(params.eventId, "eventId not found");

    await deleteEvent({ userId, id: params.eventId });
  }

  return redirect("/events");
}

export default function EventDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.event.name}</h3>
      <p className="py-6">Start Date: {data.event.startDate}</p>
      <p className="py-6">Description: {data.event.description}</p>
      <hr className="my-4" />
      <Form method="post" className="flex gap-4">
        <button
          className="rounded bg-red-500  py-2 px-4 text-white transition-transform hover:bg-red-600 active:translate-y-[1px]"
          name="_action"
          value="delete"
        >
          Delete
        </button>

        <button
          name="_action"
          value="back"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 transition-transform hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:translate-y-[1px]"
        >
          Go Back
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Event not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
