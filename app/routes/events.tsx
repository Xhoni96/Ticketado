import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useCatch, useLoaderData, useSearchParams } from "@remix-run/react";
import noImage from "../assets/no-image.png";
import {
  ClockIcon,
  MapPinIcon,
  EyeIcon,
  TrashIcon,
  UserIcon,
  RocketLaunchIcon,
  PencilIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import { useSetAtom } from "jotai";

import { requireUserId } from "~/session.server";
import { createEvent, deleteEvent, getEvents, updateEvent } from "~/models/event.server";
import {
  addEventAtom,
  attendeesAtom,
  deleteEventAtom,
  selectedEventAtom,
  promoteEventAtom,
  ticketSalesAtom,
} from "~/atoms/atom";
import { TicketSales, Attendees, PromoteEvent, AddEvent, DeleteEvent } from "~/components/Modals/";
import { updateEventProperty } from "~/models/event.server";
import { createEventSchema } from "~/schemas/schema.server";
import { zodErrorsToObj } from "~/utils/utils.server";
import type { Event } from "../types";
import invariant from "tiny-invariant";
import { IntlDateTimeFormat } from "~/utils/utils";

export async function loader({ request }: LoaderArgs) {
  // const form = await request.formData();
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  const userId = await requireUserId(request);
  const eventsList = await getEvents({ userId, query });

  return json(eventsList);
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  const eventId = values.eventId as string;

  if (_action === "addEvent" || _action === "draftEvent" || _action === "updateEvent") {
    const event = {
      ...values,
      draft: _action === "draftEvent" ? true : false,
      venue: values.venue ? JSON.parse(values.venue as string) : null,
    };

    const venueId = event.venue?.id;

    const zodSafeParse = createEventSchema.safeParse(event);

    if (zodSafeParse.success) {
      const { venue, ...event } = zodSafeParse.data;

      if (_action === "updateEvent") {
        return await updateEvent(userId, eventId, event, venue, venueId);
      }
      return json(await createEvent(event, userId, venue, venueId), { status: 201 });
    } else {
      return json({ errors: zodErrorsToObj(zodSafeParse.error.issues) }, { status: 400 });
    }
  }
  if (_action === "attendesRegistration") {
    return await updateEventProperty(eventId, { registration: values.registration === "on" ? true : false });
  }
  if (_action === "seatsQuantityAttendees") {
    return await updateEventProperty(eventId, { inventory: Number(values.inventory) });
  }
  if (_action === "enableSales") {
    return await updateEventProperty(eventId, { onSale: values.onSale === "on" ? true : false });
  }
  if (_action === "promoteEvent") {
    return await updateEventProperty(eventId, { published: values.published === "on" ? true : false });
  }

  // not needed right now since why don't edit the venue in the editVenueModal but after clicking publish
  /*   if (_action === "editVenue") {
  const { id, ...venue } = values; // remove it

    const zodSafeParse = venueSchema.safeParse(venue);

    if (!zodSafeParse.success) {
      return json({ errors: zodErrorsToObj(zodSafeParse.error.issues) }, { status: 400 });
    }
    const safeVenueId = z.string().min(1).safeParse(values.id);

    if (safeVenueId.success) {
      return await updateVenue(safeVenueId.data, zodSafeParse.data);
    } else {
      return await createVenue(zodSafeParse.data, userId);
    }
  } */

  if (_action === "delete") {
    invariant(eventId, "eventId not found");
    const res = await deleteEvent({ userId, eventId });
    return json({ deleted: res === 1 ? true : false });
  }

  // return json(res);
  // return redirect("/events");
  // return "yo";
}

export default function EventsPage() {
  const eventsList = useLoaderData() as unknown as Event[];
  const setNewEventModal = useSetAtom(addEventAtom);
  const setPromotEventModal = useSetAtom(promoteEventAtom);
  const setAttendeesModal = useSetAtom(attendeesAtom);
  const setTicketSalesModal = useSetAtom(ticketSalesAtom);
  const setDeleteModal = useSetAtom(deleteEventAtom);
  // save only eventId if other data is not needed
  const setSelectedEvent = useSetAtom(selectedEventAtom);

  const handleNewEventModal = () => {
    setNewEventModal(true);
  };
  // try optimistic ui for the checkbox in modals when the ui does not update
  // or check if maybe you can not render the modal when there is no data maybe that is causing the issue
  // https://reactrouter.com/en/main/hooks/use-fetchers#usefetchers

  // in case nothing works try to change the component with `selectbutton` component from primeReact library

  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("q");

  return (
    <main className="flex flex-col p-4">
      <div className="flex justify-between p-3">
        <div className="flex gap-4">
          <NavLink to="?q=current" className={`${currentQuery === "current" ? "bg-blue-200" : ""} btn-blue`}>
            Current Events
          </NavLink>
          <NavLink to="?q=past" className={`${currentQuery === "past" ? "bg-blue-200" : ""} btn-blue`}>
            Past Events
          </NavLink>
        </div>
        <button
          onClick={handleNewEventModal}
          // className="rounded-lg bg-violet-500 px-5 py-2 text-white transition-all hover:bg-violet-600 active:translate-y-[1px]"
          // className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 transition-transform hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:translate-y-[1px]"
          className="btn-blue"
        >
          Add Event
        </button>
        <AddEvent />
        <PromoteEvent />
        <Attendees />
        <TicketSales />
        <DeleteEvent />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {eventsList.length === 0 ? (
          <p className="p-4">No Events yet</p>
        ) : (
          eventsList.map((event) => (
            <div className="relative flex h-40 divide-x rounded-sm border-2 border-solid" key={event.id}>
              <div className="flex-grow">
                <img className="h-full" src={noImage} alt="event" />
                {event?.draft ? (
                  <span className="absolute bottom-0 -left-1 rounded-sm border-l-4 border-l-blue-400 bg-blue-100 px-5 py-[3px] text-blue-900">
                    Draft
                  </span>
                ) : null}
              </div>

              <div className="flex flex-grow-3 flex-col text-gray-700">
                <div className="flex flex-grow-3 flex-col gap-1 pl-2 pt-1">
                  <h2>{event.name}</h2>
                  <div className="flex items-center gap-2">
                    <ClockIcon className=" h-5 w-5 stroke-violet-500" />
                    <p>{IntlDateTimeFormat.format(new Date(Number(event.startDate)))}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className=" h-5 w-5 stroke-violet-500" />
                    <p>location info</p>
                  </div>
                </div>
                <div className="flex flex-grow items-center justify-end gap-4 bg-gray-100  pr-3">
                  <Link to={`${event.id}`}>
                    <EyeIcon className="eventIcon" />
                  </Link>
                  <PresentationChartLineIcon
                    className={`eventIcon ${event.draft ? "disabled" : ""}`}
                    onClick={() => {
                      setPromotEventModal(true);
                      setSelectedEvent(event);
                    }}
                  />
                  <div className="flex">
                    <UserIcon
                      onClick={() => {
                        setAttendeesModal(true);
                        setSelectedEvent(event);
                      }}
                      className={`eventIcon ${event.draft ? "disabled" : ""}`}
                    />
                    {event.registration ? (
                      <span className="-ml-3 flex h-4 w-4 items-center justify-center rounded-[50%] bg-red-400 text-sm text-white">
                        {event.inventory}
                      </span>
                    ) : null}
                  </div>
                  <RocketLaunchIcon
                    onClick={() => {
                      setTicketSalesModal(true);
                      setSelectedEvent(event);
                    }}
                    className={`eventIcon ${event.draft ? "disabled" : ""} `}
                  />
                  <PencilIcon
                    className="eventIcon"
                    onClick={() => {
                      handleNewEventModal();
                      setSelectedEvent(event);
                    }}
                  />
                  <TrashIcon
                    onClick={() => {
                      setDeleteModal(true);
                      setSelectedEvent(event);
                    }}
                    className="eventIcon"
                  />
                </div>
              </div>
            </div>
          ))
        )}
        <Outlet />
      </div>
    </main>
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
