// import { useSetAtom } from "jotai";
import { ModalBase } from "../base/BaseModal";
import { promoteEventAtom } from "~/atoms/atom";

export const PromoteEvent = () => {
  //   const setIsOpen = useSetAtom(promoteEventAtom);

  return (
    <ModalBase atom={promoteEventAtom} title="Promote event">
      <h2>Promote Event</h2>
    </ModalBase>
  );
};
