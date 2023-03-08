import { useOptionalUser } from "~/utils/utils";
import { SignIn } from "./SignIn";
import { SignOutDropdown } from "./SignOutDropdown";
import { Link, NavLink } from "@remix-run/react";

export const Navbar = () => {
  const user = useOptionalUser();

  return (
    <nav className="flex items-center justify-between rounded-md bg-gray-100 px-8 py-4">
      <div className="flex gap-10">
        <Link to="/">
          <img src="https://ticketing-staging.softjourn.if.ua/img/logo.png" alt="ticketing-logo" />
        </Link>

        <NavLink to="events" className={({ isActive }) => (isActive ? "underline" : "")}>
          Events
        </NavLink>
        <NavLink to="venues" className={({ isActive }) => (isActive ? "underline" : "")}>
          Venues
        </NavLink>
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
