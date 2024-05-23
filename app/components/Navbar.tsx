import { useOptionalUser } from "~/utils/utils";
import { SignIn } from "./SignIn";
import { SignOutDropdown } from "./SignOutDropdown";
import { Link, NavLink, useLocation } from "@remix-run/react";

export const Navbar = () => {
  const user = useOptionalUser();

  const l = useLocation();

  return (
    <nav className="flex items-center justify-between rounded-md bg-gray-100 px-8 py-4">
      <div className="flex gap-10">
        <Link to="/">Home</Link>

        <div>
          <NavLink to="events?q=current" className="peer">
            Events
          </NavLink>
          <span
            className={` ${
              l.pathname === "/events" ? "scale-x-100" : ""
            } block scale-x-0 border-b-2 border-violet-500 transition-transform ease-in peer-hover:scale-x-100`}
          />
        </div>
        <div>
          <NavLink to="venues" className="peer">
            Venues
          </NavLink>
          <span
            className={` ${
              l.pathname === "/venues" ? "scale-x-100" : ""
            } block scale-x-0 border-b-2 border-violet-500 transition-transform ease-in peer-hover:scale-x-100`}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-xl text-transparent hover:bg-gradient-to-l hover:from-blue-500 hover:to-violet-500">
          {user?.email}
        </p>
        {user?.id ? <SignOutDropdown /> : <SignIn />}
      </div>
    </nav>
  );
};
