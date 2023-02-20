import { Switch } from "../Switch";
import { ModalBase } from "../base/BaseModal";
import { attendeesAtom, selectedEventAtom } from "~/atoms/atom";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { useAtomValue, useSetAtom } from "jotai";
import type { Event } from "~/types";

export const Attendees = () => {
  const fetcher = useFetcher();
  const eventData = useAtomValue(selectedEventAtom);
  const setAttendeesModal = useSetAtom(attendeesAtom);

  const loaderData = useLoaderData();
  const currentEvent: Event | undefined = loaderData.find((ev: Event) => ev.id === eventData?.id);

  const enabled = currentEvent?.registration ?? false;

  const toggleSwitch = (value: boolean) => {
    fetcher.submit(
      { _action: "attendesRegistration", eventId: eventData?.id!, registration: value ? "on" : "off" },
      { method: "post" }
    );
  };

  const closeModal = () => {
    setAttendeesModal(false);
  };

  return (
    <ModalBase atom={attendeesAtom} title="Attendees">
      <Form method="post">
        <div className="flex items-center justify-between gap-4">
          <Switch enabled={enabled} setEnabled={toggleSwitch} label="Enable registration:" />
          <div className="flex items-center gap-1">
            <p>Specify the seats quantity:</p>
            <input
              name="inventory"
              type="number"
              className="h-8 w-16 rounded-sm border"
              disabled={!enabled}
              defaultValue={Number(currentEvent?.inventory)}
            />
            <input name="eventId" type="hidden" value={eventData?.id} />
            <button name="_action" value="seatsQuantityAttendees" onClick={closeModal}>
              <DocumentCheckIcon
                className={`h-14 w-14 ${
                  enabled
                    ? "cursor-pointer stroke-violet-500 hover:stroke-violet-600 active:translate-y-[1px]"
                    : "stroke-gray-400"
                }  rounded-sm  p-2 transition-transform   `}
              />
            </button>
          </div>
        </div>
      </Form>
    </ModalBase>
  );
};
