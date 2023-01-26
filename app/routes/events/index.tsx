import { Link } from "@remix-run/react";

export default function EventsIndexPage() {
  return (
    <p>
      No event selected. Select an event on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new event.
      </Link>
    </p>
  );
}
