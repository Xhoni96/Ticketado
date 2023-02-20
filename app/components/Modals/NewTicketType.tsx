import { selectedEventAtom, ticketTypeAtom } from "~/atoms/atom";
import { ModalBase } from "../base/BaseModal";
import { Form, useLoaderData } from "@remix-run/react";
import { Switch } from "../Switch";
import { useAtomValue } from "jotai";
import { useFetcher } from "react-router-dom";
import type { Event } from "~/types";

export const NewTicketType = () => {
  //   const fetcher = useFetcher();
  //   const eventData = useAtomValue(selectedEventAtom);
  //   const loaderData = useLoaderData();
  //   const currentEvent: Event | undefined = loaderData.find((ev: Event) => ev.id === eventData?.id);

  //   const toggleSwitch = (value: boolean) => {
  //     if (currentEvent?.id) {
  //       fetcher.submit(
  //         { _action: "enableSales", eventId: currentEvent.id, onSale: value ? "on" : "off" },
  //         { method: "post" }
  //       );
  //     }
  //   };

  //   const enabled = currentEvent?.onSale ?? false;

  return (
    <ModalBase atom={ticketTypeAtom} title="Ticket type">
      <Form method="post">
        <div className="flex flex-col justify-between gap-4">new tt</div>
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 transition-transform hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:translate-y-[1px]"
          name="newTicketType"
          value="newTicketType"
        >
          Save
        </button>
      </Form>
    </ModalBase>
  );
};
