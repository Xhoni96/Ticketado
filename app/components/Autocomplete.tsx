import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useFetcher } from "@remix-run/react";

type AutocompleteProps = {
  name: string;
  selected: any | undefined;
  setSelected: (val: any) => void;
  placeholder?: string;
  action: string;
  selectedProperty?: string;
  error?: boolean;
  defaultValue?: string;
};

export const Autocomplete = ({
  name,
  selected,
  setSelected,
  placeholder,
  action,
  selectedProperty,
  error,
  defaultValue = "",
}: AutocompleteProps) => {
  const [query, setQuery] = useState("");
  const fetcher = useFetcher<Array<any>>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    // debounce this function later as it bombs the server with calls now
    // useDeferredValue react hook
    fetcher.submit(
      { query: value },
      {
        action,
      }
    );

    setQuery(value);
    setSelected({ id: "custom", name: value });

    if (selected && value.length === 0) {
      setSelected({});
    }
  };

  const items = fetcher.data;

  return (
    <Combobox value={selected ?? {}} onChange={setSelected}>
      <div className="relative w-full">
        <input
          name={name}
          type="hidden"
          value={
            (selected && selectedProperty ? selected[selectedProperty] : JSON.stringify(selected) || query) ||
            defaultValue
          }
        />

        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className={`w-full rounded-lg border py-2 pl-3 pr-10 text-sm leading-5 text-gray-500 focus:ring-0 ${
              error ? "border-red-400" : ""
            }`}
            displayValue={() => (selected?.name ?? query) || defaultValue}
            defaultValue={defaultValue ?? ""}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
        {items?.length ? (
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items?.length
                ? items.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                            {person.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                : null}
            </Combobox.Options>
          </Transition>
        ) : null}
      </div>
    </Combobox>
  );
};
