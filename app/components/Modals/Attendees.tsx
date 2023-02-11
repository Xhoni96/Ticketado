import { ModalBase } from "../base/BaseModal";
// import { useSetAtom } from "jotai";
import { attendeesAtom } from "~/atoms/atom";

export const Attendees = () => {
  //   const setIsOpen = useSetAtom(attendeesAtom);

  return (
    <ModalBase atom={attendeesAtom} title="Attendees">
      <h2>No attendees at the moment</h2>
    </ModalBase>
  );
};
