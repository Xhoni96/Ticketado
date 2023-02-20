import { useLoaderData } from "@remix-run/react";
import { ModalBase } from "../base/BaseModal";
import { promoteEventAtom, selectedEventAtom } from "~/atoms/atom";
import { Switch } from "../Switch";
import { useFetcher } from "react-router-dom";
import { useAtomValue } from "jotai";
import type { Event } from "~/types";

export const PromoteEvent = () => {
  const fetcher = useFetcher();
  const eventData = useAtomValue(selectedEventAtom);

  const loaderData = useLoaderData();
  const currentEvent: Event | undefined = loaderData.find((ev: Event) => ev.id === eventData?.id);

  const enabled = currentEvent?.published ?? false;

  const toggleSwitch = (value: boolean) => {
    if (eventData) {
      fetcher.submit(
        { _action: "promoteEvent", eventId: eventData?.id, published: value ? "on" : "off" },
        { method: "post" }
      );
    }
  };

  return (
    <ModalBase atom={promoteEventAtom} title="Promote event">
      <div className="flex items-center justify-between gap-4">
        <p>Show this event on Ticketing Events:</p>
        <Switch enabled={enabled} setEnabled={toggleSwitch} />
      </div>
    </ModalBase>
  );
};
