import { ModalBase } from "../base/BaseModal";
import { addEventAtom, editVenueAtom, selectedVenueAtom } from "~/atoms/atom";
import { Autocomplete } from "../Autocomplete";
import noImage from "../../assets/no-image.png";
import { Form } from "@remix-run/react";
import type { Event, Venue } from "~/types";
import { useState } from "react";
import { DateTime } from "../DateTime";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSetAtom } from "jotai";
import { EditVenue } from "./EditVenue";

export const AddEvent = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [selectedVenue, setSelectedVenue] = useState<Venue>();
  const [endTime, setEndtime] = useState(false);
  const [errors, setErrors] = useState({ eventName: false, startDate: false });
  const setEditModal = useSetAtom(editVenueAtom);
  const setSelectedVenueModal = useSetAtom(selectedVenueAtom);
  // const loaderData = useMatchesData("searchEvent");

  const handleSelectedEvent = (val: Event) => {
    setSelectedEvent(val);
    console.log(val, "val");

    if (val.venue) {
      setSelectedVenue(val.venue);
    }
  };

  const handleSelectedVenue = (val: Venue) => {
    setSelectedVenue(val);
  };

  const handleEndtime = () => {
    setEndtime(!endTime);
  };

  const handleEdit = () => {
    setEditModal(true);
    setSelectedVenueModal(selectedVenue as any);
  };

  return (
    <ModalBase atom={addEventAtom} title="Add Event">
      <Form method="post">
        <div className="flex text-gray-500">
          <div className="h-28 grow">
            <img className="h-full" src={noImage} alt="event" />
          </div>
          <div className="flex grow-3 flex-col gap-4">
            <Autocomplete
              name="selectedEventName"
              selected={selectedEvent}
              setSelected={handleSelectedEvent}
              placeholder="Search existing event or enter a new one"
              action="resources/searchEvent"
            />
            <div className="flex justify-between">
              <DateTime label="Start time" name="startTime" />

              {endTime ? <div className="h-full w-[1px] bg-gray-400" /> : null}
              {endTime ? (
                <div className="flex">
                  <DateTime label="End time" name="endTime" />
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
              name="selectedVenue"
              selected={selectedVenue}
              setSelected={handleSelectedVenue}
              placeholder="Search existing venue or enter a new one"
              action="resources/searchVenue"
            />
            <button
              className="absolute right-4 rounded-md bg-purple-400 px-3 py-1 text-white"
              type="button"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
          <button type="button" className="self-start rounded-md bg-gray-200 py-1 px-4">
            Inventory Managment
          </button>
          <input name="keywords" type="text" placeholder="Keywords" className="border pl-2 text-gray-500" />
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <button type="button" className="bg-gradient-to-r from-blue-500 to-violet-800 bg-clip-text text-transparent">
            Save as draft
          </button>
          <button
            type="submit"
            name="_action"
            value="addEvent"
            formAction="/events"
            formMethod="post"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 transition-transform hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:translate-y-[1px]"
          >
            Publish
          </button>
        </div>

        {/* <div className="mt-2">
        <p className="text-sm text-gray-500">
          Your payment has been successfully submitted. We’ve sent you an email
          with all of the details of your order.
        </p>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Got it, thanks!
        </button>
      </div> */}
      </Form>
      <EditVenue />
    </ModalBase>
  );
};
