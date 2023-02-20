import { Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

type AutocompleteProps = {
  items: Array<any>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  selected: any | undefined;
  setSelected: (val: any) => void;
  placeholder?: string;
  query: string;
};

export const Autocomplete = ({
  items,
  onChange,
  name,
  selected,
  setSelected,
  placeholder,
  query,
}: AutocompleteProps) => {
  return (
    <div>
      <Combobox value={selected ?? ""} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              name={name}
              className="w-full rounded-lg border py-2 pl-3 pr-10 text-sm leading-5 text-gray-500 focus:ring-0"
              displayValue={() => (query ? query : selected?.name)}
              onChange={onChange}
              placeholder={placeholder}
            />
          </div>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            {items?.length > 0 ? (
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
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
                ))}
              </Combobox.Options>
            ) : (
              <div />
            )}
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
