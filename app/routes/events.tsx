import type { ActionArgs, LoaderArgs } from "@remix-run/node";
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
import { getEvents } from "~/models/event.server";
import {
  addEventAtom,
  attendeesAtom,
  deleteEventAtom,
  eventNameAtom,
  promoteEventAtom,
  ticketSalesAtom,
} from "~/atoms/atom";
import {
  TicketSales,
  Attendees,
  PromoteEvent,
  AddEvent,
  DeleteEvent,
} from "~/components/Modals/";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const eventsList = await getEvents({ userId });
  return json({ eventsList });
}

export async function action({ request, params }: ActionArgs) {
  const { _action } = Object.fromEntries(await request.formData());

  console.log("trynna delete an event aren't you?");
  if (_action === "delete") {
    // const userId = await requireUserId(request);
    // invariant(params.eventId, "eventId not found");
    // await deleteEvent({ userId, id: params.eventId });
  }

  return "yo";
  // return redirect("/events");
}

export default function EventsPage() {
  const data = useLoaderData<typeof loader>();
  const setIsOpen = useSetAtom(addEventAtom);
  const setPromotEventModal = useSetAtom(promoteEventAtom);
  const setAttendeesModal = useSetAtom(attendeesAtom);
  const setTicketSalesModal = useSetAtom(ticketSalesAtom);
  const setDeleteModal = useSetAtom(deleteEventAtom);
  const setEventName = useSetAtom(eventNameAtom);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <main className="flex flex-col p-4">
      <div className="flex justify-between p-3">
        <div className="flex gap-4">
          <div>Current Events</div>
          <div>Past Events</div>
        </div>
        <button
          onClick={handleOpen}
          // className="rounded-lg bg-violet-500 px-5 py-2 text-white transition-all hover:bg-violet-600 active:translate-y-[1px]"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 transition-transform hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:translate-y-[1px]"
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
        {data.eventsList.length === 0 ? (
          <p className="p-4">No Events yet</p>
        ) : (
          data.eventsList.map((event) => (
            <div
              className="flex h-40 divide-x rounded-sm border-2 border-solid"
              key={event.id}
            >
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
                    }}
                  />
                  <UserIcon
                    onClick={() => {
                      setAttendeesModal(true);
                    }}
                    className="h-9 w-9 cursor-pointer rounded-sm stroke-violet-500 p-2 transition-transform hover:stroke-violet-600 active:translate-y-[1px] "
                  />
                  <RocketLaunchIcon
                    onClick={() => {
                      setTicketSalesModal(true);
                    }}
                    className="h-9 w-9 cursor-pointer rounded-sm stroke-violet-500 p-2 transition-transform hover:stroke-violet-600 active:translate-y-[1px] "
                  />
                  <PencilIcon className="h-9 w-9 cursor-pointer rounded-sm stroke-violet-500 p-2 transition-transform hover:stroke-violet-600 active:translate-y-[1px] " />
                  <TrashIcon
                    onClick={() => {
                      setDeleteModal(true);
                      setEventName(event.name);
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
