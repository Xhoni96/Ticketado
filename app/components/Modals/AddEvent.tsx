import { ModalBase } from "../base/BaseModal";
import { addEventAtom } from "~/atoms/atom";
import { Autocomplete } from "../Autocomplete";
import noImage from "../../assets/no-image.png";
import { Form, useCatch, useFetcher } from "@remix-run/react";
import type { Event } from "~/types";
import { useState } from "react";
import { useMatchesData } from "~/utils";

export const AddEvent = () => {
  const fetcher = useFetcher();
  const [selected, setSelected] = useState<Event | null>();
  const [query, setQuery] = useState("");
  const loaderData = useMatchesData("searchEvent");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    fetcher.submit(e.target.form, {
      // action: "searchEvent",
      // method: "get",
    });
    setQuery(e.target.value);
    setSelected(null);
  };

  const handleSelected = (val: Event) => {
    setSelected(val);
    setQuery("");
  };
  const items = fetcher.data;

  console.log(loaderData, "loaderData");

  return (
    <ModalBase atom={addEventAtom} title="Add Event">
      <fetcher.Form method="get" action="searchEvent">
        <div className="flex text-gray-500">
          <div className="h-28 grow">
            <img className="h-full" src={noImage} alt="event" />
          </div>
          <div className="flex grow-3 flex-col gap-4">
            <Autocomplete
              onChange={handleSearch}
              items={items ?? []}
              name="searchEvents"
              selected={selected}
              setSelected={handleSelected}
              placeholder="Search existing event or enter a new one"
              query={query}
            />
            <div className="flex justify-between">
              <div>
                <label htmlFor="startDate">Start time</label>
                <input
                  className="block"
                  type="datetime-local"
                  defaultValue={new Date().toLocaleString()}
                  id="startDate"
                />
              </div>
              {/* <input type="datetime-local" /> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Autocomplete
            onChange={handleSearch}
            items={items}
            name="searchEvents"
            selected={selected}
            setSelected={handleSelected}
            placeholder="Search existing venue or enter a new one"
            query={query}
          />
          <button type="button" className="self-start rounded-md bg-gray-200 py-1 px-4">
            Inventory Managment
          </button>
          <input type="text" placeholder="Keywords" className="border pl-2 text-gray-500" />
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <button type="button" className="bg-gradient-to-r from-blue-500 to-violet-800 bg-clip-text text-transparent">
            Save as draft
          </button>
          <button
            type="submit"
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
      </fetcher.Form>
    </ModalBase>
  );
};
