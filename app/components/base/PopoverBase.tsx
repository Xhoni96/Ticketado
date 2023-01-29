import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

export const PopOverBase = ({ children }: { children: React.ReactNode }) => {
  return (
    <div /* className="top-16 w-full max-w-sm px-4" */>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="inline-flex items-center rounded-md bg-violet-500 px-3 py-2 text-base font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <span>Sign In</span>
              <ChevronDownIcon
                className={`${open ? "rotate-180" : ""}
                  ml-2 h-5 w-5 text-white transition duration-150 ease-in-out `}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-72 max-w-sm -translate-x-1/2 transform rounded-sm bg-violet-500 py-2  px-4 lg:max-w-3xl">
                {children}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
