import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getVenues } from "~/models/venue.server";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);

  const venues = await getVenues({ userId });

  return json(venues);
}

const VenuesIndexPage = () => {
  const venuesList = useLoaderData<typeof loader>();

  return (
    <div>
      <p>yooo this is a list of venues</p>

      {venuesList.map((venue) => (
        <div key={venue.id}>
          <h3>{venue.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default VenuesIndexPage;
