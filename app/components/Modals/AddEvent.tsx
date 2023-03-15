import { ModalBase } from "../base/BaseModal";
import { addEventAtom, editVenueAtom, selectedEventAtom, selectedVenueAtom, vmtWidgetAtom } from "~/atoms/atom";
import { Autocomplete } from "../Autocomplete";
import noImage from "../../assets/no-image.png";
import { Form, useActionData } from "@remix-run/react";
import type { Event, Venue } from "~/types";
import { useEffect, useState } from "react";
import { DateTime } from "../DateTime";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAtomValue, useSetAtom } from "jotai";
import { EditVenue } from "./EditVenue";

export const AddEvent = () => {
  // const [selectedEventId, setSelectedEventId] = useState<string>();
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [endTime, setEndtime] = useState(false);
  const setEditModal = useSetAtom(editVenueAtom);
  const setSelectedVenueModal = useSetAtom(selectedVenueAtom);
  const setNewEventModal = useSetAtom(addEventAtom);
  const defaultData = useAtomValue(selectedEventAtom);
  const setVmtWidget = useSetAtom(vmtWidgetAtom);

  const actionData = useActionData();

  const handleSelectedEvent = (event: Event) => {
    // setSelectedEventId(event.id);
    setSelectedEvent(event);

    if (event.venue) {
      setVenue(event.venue);
    }
  };

  const handleSelectedVenue = (val: Venue) => {
    setVenue(val);
  };

  const handleEndtime = () => {
    if (defaultData?.endDate) return;
    setEndtime(!endTime);
  };

  const handleEdit = () => {
    setEditModal(true);
    setSelectedVenueModal(selectedVenue);
  };

  const handleOnClose = () => {
    // setSelectedEventId("");
    setSelectedEvent(undefined);
    setVenue(null);
  };

  const handleVmtWidget = () => {
    const event = selectedEvent || defaultData;
    if (event && selectedVenue) {
      setVmtWidget({
        apiUrl: "https://vmt-staging.softjourn.if.ua/api",
        frontPoint: "https://vmt-staging.softjourn.if.ua/front",
        localization: "en",
        eventId: event.id,
        memberId: "1111",
        mode: "inventory",
        // venueId: selectedVenue.id,
        venueId: "11",
        token:
          " NzgwZGI0M2UtYzFlMC0xMWVkLTgxOGItYTNkNDk1MDE1ZmVkLjExMTEuaW52ZW50b3J5Li4uLmZhbHNl.673342a942a780b59b51041fea452bbab1aa8126df0785bc919002ba54cd261b",
      });
    }
  };

  // const selectedEvent = loaderData.find((event) => event.id === selectedEventId);
  const selectedVenue = venue ? venue : selectedEvent?.venue ?? defaultData?.venue;

  useEffect(() => {
    // event saved sucessfully
    if (actionData?.id) {
      setNewEventModal(false);
      handleOnClose();
    }
  }, [actionData, setNewEventModal]);

  return (
    <ModalBase atom={addEventAtom} title="Add Event" onClose={handleOnClose} onCloseAtom={selectedEventAtom}>
      <Form method={defaultData ? "put" : "post"}>
        <div className="flex text-gray-500">
          <div className="h-28 grow">
            <img className="h-full" src={noImage} alt="event" />
          </div>
          <div className="mb-3 flex grow-3 flex-col gap-4">
            <div>
              <Autocomplete
                name="name"
                selectedProperty="name"
                selected={selectedEvent}
                setSelected={handleSelectedEvent}
                placeholder="Search existing event or enter a new one"
                action="resources/searchEvent"
                error={actionData?.errors?.name}
                defaultValue={defaultData?.name}
              />
              <span className="block h-3 text-sm text-red-700">{actionData?.errors?.name}</span>
            </div>

            <div className="flex justify-between">
              <div>
                <DateTime
                  label="Start Time"
                  name="startDate"
                  error={actionData?.errors?.startDate}
                  defaultValue={defaultData?.startDate}
                />
                <span className="block h-3 text-sm text-red-700">{actionData?.errors?.startDate}</span>
              </div>

              {endTime || defaultData?.endDate ? <div className="h-full w-[1px] bg-gray-400" /> : null}
              {endTime || defaultData?.endDate ? (
                <div className="flex">
                  <DateTime label="End time" name="endDate" defaultValue={defaultData?.endDate} />
                  <XMarkIcon className="h-5 w-5 cursor-pointer stroke-violet-500" onClick={handleEndtime} />
                </div>
              ) : (
                <p className="cursor-pointer self-end text-blue-500" onClick={handleEndtime}>
                  Add end time
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative flex items-center first:w-full">
            <Autocomplete
              name="venue"
              selected={selectedVenue}
              setSelected={handleSelectedVenue}
              placeholder="Search existing venue or enter a new one"
              action="resources/searchVenue"
            />
            {selectedVenue ? (
              <button
                className="absolute right-[3px] rounded-md bg-purple-400 px-3 py-1 text-white"
                type="button"
                onClick={handleEdit}
              >
                Edit
              </button>
            ) : null}
          </div>
          <button type="button" className="self-start rounded-md bg-gray-200 py-1 px-4" onClick={handleVmtWidget}>
            Inventory Managment
          </button>
          <textarea
            name="description"
            placeholder="Description"
            className="border pl-2 text-gray-500"
            defaultValue={defaultData?.description ?? ""}
          />

          <input name="keywords" type="text" placeholder="Keywords" className="border pl-2 text-gray-500" />
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <button
            name="_action"
            value="draftEvent"
            className="bg-gradient-to-r from-blue-500 to-violet-800 bg-clip-text text-transparent"
          >
            Save as draft
          </button>
          <button
            name="_action"
            value={defaultData ? "updateEvent" : "addEvent"}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 transition-transform hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:translate-y-[1px]"
          >
            {defaultData ? "Update" : "Publish"}
          </button>
        </div>
        <input type="hidden" name="eventId" value={defaultData?.id ?? ""} />
      </Form>

      <EditVenue onSubmit={handleSelectedVenue} eventId={selectedEvent?.id ?? defaultData?.id} />
    </ModalBase>
  );
};
