import { ticketSalesAtom } from "~/atoms/atom";
import { ModalBase } from "../base/BaseModal";
// import { useSetAtom } from "jotai";

export const TicketSales = () => {
  //   const setIsOpen = useSetAtom(attendeesAtom);

  return (
    <ModalBase atom={ticketSalesAtom} title="Ticket sales">
      <h2>TicketSales</h2>
    </ModalBase>
  );
};
