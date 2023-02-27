import { editVenueAtom, selectedVenueAtom } from "~/atoms/atom";
import { ModalBase } from "../base/BaseModal";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useAtomValue } from "jotai";

export const EditVenue = () => {
  const selectedVenue = useAtomValue(selectedVenueAtom);
  const actionData = useActionData();
  const navigation = useNavigation();

  if (!selectedVenue) return null;

  console.log(navigation, "navigation");

  return (
    <ModalBase atom={editVenueAtom} title="Edit Venue">
      <Form method="post" className="flex flex-col gap-3">
        <input type="hidden" name="venueId" value={selectedVenue.id} />
        <input type="text" placeholder="Name" className="input" name="name" defaultValue={selectedVenue.name ?? ""} />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Country"
            name="country"
            className="input"
            defaultValue={selectedVenue.country ?? ""}
          />
          <input type="text" placeholder="ZIP" name="zip" className="input" defaultValue={selectedVenue.zip ?? ""} />
          <input
            type="text"
            placeholder="Region"
            name="region"
            className="input"
            defaultValue={selectedVenue.region ?? ""}
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            name="city"
            className="input grow-2"
            defaultValue={selectedVenue.city ?? ""}
          />
          <input
            type="text"
            placeholder="Street"
            name="street"
            className="input grow-3"
            defaultValue={selectedVenue.street ?? ""}
          />
          <input
            type="text"
            placeholder="№"
            name="number"
            className="input grow"
            defaultValue={selectedVenue.number ?? ""}
          />
        </div>
        <div>
          <h1>MAP</h1>
        </div>
        <button type="button" className="btn-violet self-start py-1">
          Venue Designer
        </button>
        <div className="mt-2 h-[2px] w-full border" />
        <button className="btn-blue self-end" name="_action" value="editVenue">
          Save
        </button>
      </Form>
    </ModalBase>
  );
};
