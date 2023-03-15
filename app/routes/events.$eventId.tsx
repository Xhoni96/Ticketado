import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { ArrowLeftIcon, ArrowPathIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Form, Link, useActionData, useCatch, useLoaderData, useNavigation } from "@remix-run/react";
import { useSetAtom } from "jotai";
import { vmtWidgetAtom } from "~/atoms/atom";
import invariant from "tiny-invariant";

import { getEvent } from "~/models/event.server";
import { requireUserId } from "~/session.server";
import { BaseSelect } from "~/components/base/BaseSelect";
import { environment } from "~/utils/environment.server";
import type { BestAvailableData, TicketTypes } from "~/types";
import { BestAvailableSchema } from "~/schemas/schema.server";
import { zodErrorsToObj } from "~/utils/utils.server";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.eventId, "eventId not found");

  const event = await getEvent({ userId, id: params.eventId });
  const ticketTypesRes = await fetch(`https://vmt-staging.softjourn.if.ua/api/event/${params.eventId}/ticket-types`, {
    headers: {
      "X-Signature": environment.VMT_TOKEN,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const ticketTypes: TicketTypes = await ticketTypesRes.json();

  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ event, ticketTypes });
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const { intent, ...values } = Object.fromEntries(formData);
  console.log(intent, "intent");
  console.log(values, "values");

  if (intent === "getTickets") {
    const zodResponse = BestAvailableSchema.safeParse(values);

    if (zodResponse.success) {
      const url = `https://vmt-staging.softjourn.if.ua/api/event/${params.eventId}/best-available`;

      const res = await fetch(url, {
        headers: {
          "X-Signature": environment.VMT_TOKEN,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          ticket_types: [{ id: values.id, quantity: values.quantity }],
        }),
      });
      const data = await res.json();

      return json(data);
    }
    return json({ errors: zodErrorsToObj(zodResponse.error.issues) }, { status: 400 });
  }

  if (intent === "release") {
    console.log(formData.getAll("reservation_id"));
    const releaseRes = await fetch(
      `https://vmt-staging.softjourn.if.ua/api/event/${params.eventId}/${
        values.isGA === "true" ? "ga" : "seats"
      }/reserve`,
      {
        method: "DELETE",
        headers: {
          "X-Signature":
            "NzgwZGI0M2UtYzFlMC0xMWVkLTgxOGItYTNkNDk1MDE1ZmVkLjExMTEucGlja2VyLi4uLmZhbHNl.2ab762a41e63e6dfb1e1f565d59c5b7624787947ed2edcb12dbf0cd358355233",
          "X-Token": values.token as string,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData.getAll("reservation_id")),
      }
    );
    const res = await releaseRes.json();
    return res;
  }

  if (intent === "purchase") {
    console.log("purchase");
  }
}

export default function EventDetailsPage() {
  const { event, ticketTypes } = useLoaderData<typeof loader>();
  const setVmtWidget = useSetAtom(vmtWidgetAtom);
  const actionData = useActionData();
  const { state } = useNavigation();
  console.log(state, "state");

  console.log(actionData, "actionData");

  const handleVmtWidget = () => {
    if (event) {
      setVmtWidget({
        apiUrl: "https://vmt-staging.softjourn.if.ua/api",
        frontPoint: "https://vmt-staging.softjourn.if.ua/front",
        localization: "en",
        eventId: event.id,
        memberId: "1111",
        mode: "picker",
        ...(event.venue?.id && { venueId: event.venue.id }),
        ...(actionData?.tickets && actionData.tickets[0].area_id && { areaId: actionData.tickets[0].area_id }),
        token:
          "NzgwZGI0M2UtYzFlMC0xMWVkLTgxOGItYTNkNDk1MDE1ZmVkLjExMTEucGlja2VyLi4uLmZhbHNl.2ab762a41e63e6dfb1e1f565d59c5b7624787947ed2edcb12dbf0cd358355233",
      });
    }
  };

  const viewReservedSeatsOnMap = () => {
    setVmtWidget({
      apiUrl: "https://vmt-staging.softjourn.if.ua/api",
      frontPoint: "https://vmt-staging.softjourn.if.ua/front",
      localization: "en",
      eventId: event.id,
      memberId: "1111",
      mode: "picker",
      appViewOnly: true,
      ...(actionData.tickets[0].area_id && { areaId: actionData.tickets[0].area_id }),
      ...(event.venue?.id && { venueId: event.venue.id }),
      token:
        "NzgwZGI0M2UtYzFlMC0xMWVkLTgxOGItYTNkNDk1MDE1ZmVkLjExMTEucGlja2VyLi4uLmZhbHNl.2ab762a41e63e6dfb1e1f565d59c5b7624787947ed2edcb12dbf0cd358355233",
    });
  };

  const isGA = actionData?.section_type === "ga";
  // reservationId
  return (
    <div>
      <div className="mt-6 flex gap-3">
        <Link className="self-center" to="/events?q=current">
          <ArrowLeftIcon className="h-6 w-6 stroke-violet-500" />
        </Link>
        <h3 className="text-2xl font-medium text-purple-500">{event.name}</h3>
      </div>
      <hr className="my-4" />
      <div className="ml-auto mt-8 w-[70%]">
        <div className="flex items-center gap-96">
          <div>
            <p className="mb-1 text-gray-500">Start Time:</p>
            <div className="flex flex-col gap-2 text-purple-500 ">
              <p>
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "full",
                }).format(new Date(Number(event.startDate)))}
              </p>
              <div className="flex items-center gap-2">
                <ClockIcon className=" h-7 w-7 stroke-purple-500" />
                <p>
                  {new Intl.DateTimeFormat("en-GB", {
                    timeStyle: "short",
                  }).format(new Date(Number(event.startDate)))}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 stroke-violet-500" />
              <p className="text-purple-500">{event.venue?.name}</p>
            </div>
            <p className="text-gray-500">
              {event.venue?.street}, {event.venue?.number}, {event.venue?.city}
            </p>
          </div>
        </div>
        <hr className="my-4" />
        <Form method="post">
          <button type="button" className="btn-blue py-[0.4rem]" onClick={handleVmtWidget}>
            Pick Seats
          </button>

          <div className="mt-4 mb-4 flex items-center gap-3">
            <div>
              <BaseSelect
                data={ticketTypes.data as unknown as TicketTypes["data"]}
                label="Select Ticket Type"
                name="id"
                selectedProperty="vendor_id"
              />
              <span className="absolute ml-1 mt-1 block text-sm text-red-700">{actionData?.errors?.id}</span>
            </div>

            <div>
              <input className="input w-44" placeholder="Quantity" name="quantity" />
              <span className="absolute mt-1 ml-2 block text-sm text-red-700">{actionData?.errors?.quantity}</span>
            </div>

            <button className="btn-purple flex items-center gap-2" name="intent" value="getTickets">
              {state === "idle" ? "Get Tickets" : "Getting your tickets"}
              {state !== "idle" ? <ArrowPathIcon className="stroke-white-500 h-5 w-5 animate-spin" /> : null}
            </button>
          </div>

          {actionData?.error ? <p className="text-red-700">{actionData.message}</p> : null}
          {actionData?.tickets ? (
            <div>
              <div className="flex items-center justify-between bg-blue-100 py-2 px-4 text-blue-900">
                <h6>Ticket</h6>
                <h6>Price</h6>
              </div>
              <div className="max-h-60 divide-y-2 divide-purple-400 overflow-y-auto px-2">
                {(actionData as BestAvailableData).tickets.map((ticket) => (
                  <div key={ticket.id ?? ticket.section_id} className="flex justify-between pb-2 pt-2 pr-2">
                    <input type="hidden" name="reservation_id" value={ticket.reservation_id} />
                    <div>
                      <strong>{ticket.ticket_type_name}</strong>

                      {!isGA ? (
                        <div>
                          {ticket.row_label ? "Section" : "Table"}:<strong> {ticket.section_name}</strong>,
                          {ticket.row_label ? (
                            <span>
                              &nbsp;Row: <span className="font-bold">{ticket.row_label}</span>,
                            </span>
                          ) : (
                            ""
                          )}
                          &nbsp;Seat:
                          <strong> {ticket.seat_label}</strong>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <p>
                            General Admission: <strong>{ticket.section_name}</strong>,
                          </p>
                          <p>
                            Quantity: <strong>{ticket.quantity}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                    <p>${ticket.price}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end gap-12 bg-blue-100 py-2 px-4 text-blue-900">
                <strong>Total:</strong>
                <span>
                  $
                  {(isGA
                    ? actionData.tickets[0].quantity * Number(actionData.tickets[0].price)
                    : (actionData as BestAvailableData).tickets.reduce((prev, curr) => prev + Number(curr.price), 0)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="flex gap-4">
                  <button type="button" onClick={viewReservedSeatsOnMap} className="btn-blue">
                    View seats on map
                  </button>
                  <button name="intent" value="release" className="btn-blue">
                    Release seats
                  </button>
                </div>
                <button name="intent" value="purchase" className="btn-purple">
                  Purchase
                </button>
              </div>
              <input type="hidden" name="isGa" value={String(isGA)} />

              {/* remove it later when token will be saved in cookie */}
              <input type="hidden" name="token" value={actionData.token} />
            </div>
          ) : null}
        </Form>
      </div>
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
