import { editVenueAtom, selectedVenueAtom } from "~/atoms/atom";
import { ModalBase } from "../base/BaseModal";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { venueNameSchema } from "~/schemas/schema.client";

type Props = {
  onSubmit?: (val: any) => void;
  eventId: string | undefined;
};

export const EditVenue = (props: Props) => {
  const [errors, setErrors] = useState({ name: "" });
  const selectedVenue = useAtomValue(selectedVenueAtom);
  const setEditModal = useSetAtom(editVenueAtom);

  if (!selectedVenue) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (props.onSubmit) {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget));
      const valid = venueNameSchema.safeParse(data.name);

      if (!valid.success) {
        return setErrors({ name: valid.error.issues[0].message });
      }

      props.onSubmit(data);
      setEditModal(false);
    }
  };

  return (
    <ModalBase atom={editVenueAtom} title="Edit Venue">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={selectedVenue.id ?? ""} />
        <div>
          <input type="text" placeholder="Name" className="input" name="name" defaultValue={selectedVenue.name ?? ""} />
          <span className="ml-1 text-red-700">{errors.name}</span>
        </div>
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
        <div className="mt-2 h-[2px] w-full border" />
        <button className="btn-blue self-end">Save</button>
      </form>
    </ModalBase>
  );
};
