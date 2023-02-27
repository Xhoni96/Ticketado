import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
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
import { createEvent, getEvents } from "~/models/event.server";
import {
  addEventAtom,
  attendeesAtom,
  deleteEventAtom,
  selectedEventAtom,
  promoteEventAtom,
  ticketSalesAtom,
} from "~/atoms/atom";
import { TicketSales, Attendees, PromoteEvent, AddEvent, DeleteEvent } from "~/components/Modals/";
import { updateEvent } from "~/models/event.server";
import { updateVenue } from "~/models/venue.server";

export async function loader({ request }: LoaderArgs) {
  // const form = await request.formData();
  const userId = await requireUserId(request);
  const eventsList = await getEvents({ userId });
  // console.log("LOADERRR");

  return json(eventsList);
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);

  const { _action, ...values } = Object.fromEntries(await request.formData());

  // const data = Object.fromEntries(await request.formData());
  // console.log(data, "data");
  // console.log(data.eventId, "data.eventId");
  console.log(values, "values");
  console.log(_action, "_action");
  const eventId = values.eventId as string;

  if (_action === "addEvent") {
    // const { venueId, ...otherValues } = values;
    // await createEvent(values, userId);
  }
  // console.log("trynna delete an event aren't you?", _action);
  if (_action === "attendesRegistration") {
    return await updateEvent(eventId, { registration: values.registration === "on" ? true : false });
  }
  if (_action === "seatsQuantityAttendees") {
    return await updateEvent(eventId, { inventory: Number(values.inventory) });
  }
  if (_action === "enableSales") {
    return await updateEvent(eventId, { onSale: values.onSale === "on" ? true : false });
  }
  if (_action === "promoteEvent") {
    return await updateEvent(eventId, { published: values.published === "on" ? true : false });
  }

  if (_action === "editVenue") {
    const { venueId, ...otherValues } = values;
    await updateVenue(venueId as string, otherValues);
  }

  // if (_action === "delete") {
  //   // const userId = await requireUserId(request);
  //   // invariant(params.eventId, "eventId not found");
  //   // await deleteEvent({ userId, id: params.eventId });
  // }

  // return json(res);
  return redirect("/events");
  // return "yo";
}

export default function EventsPage() {
  const eventsList = useLoaderData<typeof loader>();
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

  return (
    <main className="flex flex-col p-4">
      <div className="flex justify-between p-3">
        <div className="flex gap-4">
          <div>Current Events</div>
          <div>Past Events</div>
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
            <div className="flex h-40 divide-x rounded-sm border-2 border-solid" key={event.id}>
              <div className="flex-grow">
                <img className="h-full" src={noImage} alt="event" />
              </div>
              <div className="flex flex-grow-3 flex-col">
                <div className="flex flex-grow-3 flex-col gap-1 pl-2 pt-1">
                  <h2>{event.name}</h2>
                  <div className="flex items-center gap-2">
                    <ClockIcon className=" h-5 w-5 stroke-violet-500" />
                    <p>
                      {new Date(event.startDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className=" h-5 w-5 stroke-violet-500" />
                    <p>location info</p>
                  </div>
                </div>
                <div className="flex flex-grow items-center justify-end gap-4 bg-gray-100  pr-3">
                  <Link
                    // className="block border-b p-4 text-xl"
                    to={`${event.id}`}
                  >
                    {/* 📝 {event.name} */}
                    <EyeIcon className="h-9 w-9 cursor-pointer rounded-sm stroke-violet-500 p-2 transition-transform  hover:stroke-violet-600 active:translate-y-[1px]" />
                  </Link>
                  <PresentationChartLineIcon
                    className=" h-9 w-9 cursor-pointer rounded-sm  stroke-violet-500 p-2 transition-transform hover:stroke-violet-600 active:translate-y-[1px] "
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
                      className="h-9 w-9 cursor-pointer rounded-sm stroke-violet-500 p-2 transition-transform hover:stroke-violet-600 active:translate-y-[1px] "
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
                    className="h-9 w-9 cursor-pointer rounded-sm stroke-violet-500 p-2 transition-transform hover:stroke-violet-600 active:translate-y-[1px] "
                  />
                  <PencilIcon className="h-9 w-9 cursor-pointer rounded-sm stroke-violet-500 p-2 transition-transform hover:stroke-violet-600 active:translate-y-[1px] " />
                  <TrashIcon
                    onClick={() => {
                      setDeleteModal(true);
                      setSelectedEvent(event);
                    }}
                    className="h-9 w-9 cursor-pointer rounded-sm stroke-violet-500 p-2 transition-transform hover:stroke-violet-600 active:translate-y-[1px] "
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
