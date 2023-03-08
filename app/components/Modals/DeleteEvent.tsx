import { ModalBase } from "../base/BaseModal";
import { useSetAtom, useAtomValue } from "jotai";
import { deleteEventAtom, selectedEventAtom } from "~/atoms/atom";
import { Form, useActionData } from "@remix-run/react";
import { useCallback, useEffect } from "react";

export const DeleteEvent = () => {
  const setModalState = useSetAtom(deleteEventAtom);
  const selectedEvent = useSetAtom(selectedEventAtom);

  const eventData = useAtomValue(selectedEventAtom);
  const actionData = useActionData();

  const handleClose = useCallback(() => {
    setModalState(false);
    selectedEvent(undefined);
  }, [selectedEvent, setModalState]);

  useEffect(() => {
    // deleted
    if (actionData?.deleted) {
      handleClose();
    }
  }, [actionData, handleClose]);

  return (
    <ModalBase atom={deleteEventAtom} title="Confirm your action" onCloseAtom={selectedEventAtom}>
      <Form method="delete">
        <h2>
          Are you sure that you want to delete <strong>{eventData?.name}</strong>
          &nbsp; event?
        </h2>

        <div className="mt-4 flex justify-end gap-4">
          <button
            name="_action"
            value="delete"
            className="rounded bg-red-500 py-2 px-6 text-white transition-transform hover:bg-red-600 active:translate-y-[1px]"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-7 py-2 text-sm font-medium text-blue-900 transition-transform hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:translate-y-[1px]"
          >
            No
          </button>
        </div>
        <input type="hidden" name="eventId" value={eventData?.id ?? ""} />
      </Form>
    </ModalBase>
  );
};
