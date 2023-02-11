import { DropdownBase } from "./base/BaseDropdown";

// not used
export const SignInDropdown = () => {
  return (
    <DropdownBase>
      {/* <Menu.Items className="absolute right-0 mt-2  w-56 origin-top-right  divide-y divide-gray-100  rounded-md bg-violet-500 p-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"> */}
      <form action="">
        <div className="px-1 py-1 ">
          <label htmlFor="emailInput" className="text-white">
            Email
          </label>
          <input id="emailInput" type="email" className="h-6 text-gray-500" />
        </div>
        <div className="my-1 px-1 py-1">
          <label className="text-white" htmlFor="passwInput">
            Password
          </label>
          <input id="passwInput" type="password" className="text-gray-500" />
        </div>
        <div className=" flex justify-center px-1 pb-0">
          <button className="my-1 mt-4 rounded bg-violet-400 py-2 px-5 text-white transition-transform hover:bg-violet-300 active:translate-y-2">
            Sign In
          </button>
        </div>
      </form>
      {/* </Menu.Items> */}
    </DropdownBase>
  );
};
