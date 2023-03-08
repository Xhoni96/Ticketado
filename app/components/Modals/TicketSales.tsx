import { selectedEventAtom, ticketSalesAtom, ticketTypeAtom } from "~/atoms/atom";
import { ModalBase } from "../base/BaseModal";
import { Form, useLoaderData } from "@remix-run/react";
import { Switch } from "../Switch";
import { useAtomValue, useSetAtom } from "jotai";
import { useFetcher } from "react-router-dom";
import type { Event } from "~/types";
import { NewTicketType } from "./NewTicketType";

export const TicketSales = () => {
  const fetcher = useFetcher();
  const eventData = useAtomValue(selectedEventAtom);
  const loaderData = useLoaderData();
  const openTTModal = useSetAtom(ticketTypeAtom);
  const currentEvent: Event | undefined = loaderData.find((ev: Event) => ev.id === eventData?.id);

  const toggleSwitch = (value: boolean) => {
    if (currentEvent?.id) {
      fetcher.submit(
        { _action: "enableSales", eventId: currentEvent.id, onSale: value ? "on" : "off" },
        { method: "patch" }
      );
    }
  };

  const enabled = currentEvent?.onSale ?? false;

  return (
    <ModalBase atom={ticketSalesAtom} title="Ticket sales">
      <Form method="post">
        <div className="flex items-center justify-between gap-4">
          <Switch enabled={enabled} setEnabled={toggleSwitch} label="Enable tickets sales:" />
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                openTTModal(true);
              }}
              type="button"
              disabled={!enabled}
              name="_action"
              value="seatsQuantityAttendees"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 enabled:hover:bg-blue-200 enabled:active:translate-y-[1px] disabled:opacity-50 "
            >
              New ticket type
            </button>
          </div>
        </div>
        <NewTicketType />
      </Form>
    </ModalBase>
  );
};
