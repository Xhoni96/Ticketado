import { Menu } from "@headlessui/react";
import { DropdownBase } from "./base/BaseDropdown";
import { PowerIcon, UserIcon, WrenchIcon } from "@heroicons/react/20/solid";
import { Form } from "@remix-run/react";

export const SignOutDropdown = () => {
  return (
    <DropdownBase>
      <Form /* action="/logout" */ method="post">
        <div className="px-1 py-1 ">
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={`${
                  active ? "bg-violet-500 text-white" : "text-gray-900"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                <UserIcon
                  className={`mr-2 h-5 w-5 ${active ? "" : "fill-violet-500"} `}
                  aria-hidden="true"
                />
                Agents
              </button>
            )}
          </Menu.Item>
        </div>
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={`${
                  active ? "bg-violet-500 text-white" : "text-gray-900"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                <WrenchIcon
                  className={`mr-2 h-5 w-5 ${active ? "" : "fill-violet-500"} `}
                  aria-hidden="true"
                />
                Settings
              </button>
            )}
          </Menu.Item>
        </div>
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                formAction="/logout"
                className={`${
                  active ? "bg-violet-500 text-white" : "text-gray-900"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                <PowerIcon
                  className={`mr-2 h-5 w-5 ${active ? "" : "fill-violet-500"} `}
                  aria-hidden="true"
                />
                Logout
              </button>
            )}
          </Menu.Item>
        </div>
      </Form>
    </DropdownBase>
  );
};
