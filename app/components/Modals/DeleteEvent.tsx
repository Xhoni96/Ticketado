import { ModalBase } from "../base/BaseModal";
import { useSetAtom, useAtomValue } from "jotai";
import { deleteEventAtom, selectedEventAtom } from "~/atoms/atom";
import { Form } from "@remix-run/react";

export const DeleteEvent = () => {
  const setModalState = useSetAtom(deleteEventAtom);
  const eventData = useAtomValue(selectedEventAtom);

  const handleClose = () => setModalState(false);

  return (
    <ModalBase atom={deleteEventAtom} title="Confirm your action">
      <Form method="post">
        <h2>
          Are you sure that you want to delete{" "}
          <strong>{eventData?.name}</strong>
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
      </Form>
    </ModalBase>
  );
};
