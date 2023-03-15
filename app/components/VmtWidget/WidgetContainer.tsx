import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { vmtWidgetAtom } from "~/atoms/atom";
import { environment } from "~/utils/environment.server";

let vmtWidget = undefined;
export const WidgetContainer = () => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [vmtWidgetOptions, setVmtWidgetOptions] = useAtom(vmtWidgetAtom);

  useEffect(() => {
    // console.log(VMTWidget.default, "VMTWidget.default");

    if (!VMTWidget) return;

    vmtWidget = VMTWidget.default;

    vmtWidget.method("onTicketTypeChange", (action: any, data: any) => {
      console.log(data, "data onTicketTypeChange");

      // if (formRef.current) {
      // const formValues = Object.fromEntries(new FormData(formRef.current));
      // const token = getSignature(formValues);

      const headers: any = {
        "X-Signature": environment.VMT_TOKEN,
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const fetchUrl = `${environment.API_URL}/event/${formValues.eventId}/ticket-types`;

      switch (action) {
        case "add":
          return fetch(fetchUrl, {
            body: JSON.stringify([data]),
            headers,
            method: "POST",
          })
            .then(async (res) => {
              const data = await res.json();
              if (!res.ok) throw data;

              return {
                success: true,
                data: data,
              };
            })
            .catch((err) => {
              return { success: false, data: { message: "Oops!", data: err } };
            });

        case "edit":
          return fetch(`${fetchUrl}/${data.vendor_id}`, {
            body: JSON.stringify(data),
            headers,
            method: "PUT",
          })
            .then(async (res) => {
              if (!res.ok) throw await res.json();

              return {
                success: res.ok,
                data: res,
              };
            })
            .catch((err) => {
              return { success: false, data: { message: "Oops!", data: err } };
            });

        case "delete":
          return fetch(`${fetchUrl}/${data.id}`, {
            body: JSON.stringify(data),
            headers,
            method: "DELETE",
          })
            .then(async (res) => {
              if (!res.ok) throw await res.json();
              return {
                success: true,
                data: res,
              };
            })
            .catch((err) => {
              return { success: false, data: { message: "Oops!", data: err } };
            });
      }
      // }
    });

    vmtWidget.onClose(function () {
      setVmtWidgetOptions(undefined);
    });

    if (vmtWidgetOptions) {
      vmtWidget.launch(vmtWidgetOptions);
      widgetRef.current?.removeAttribute("inert");
    }
  }, [setVmtWidgetOptions, vmtWidgetOptions]);

  return (
    // <div
    //   className={` ${
    //     vmtWidgetOptions ? "" : "invisible"
    //   } -translate-y-[50%]" fixed top-0 left-[50%] z-[10100] mt-0 h-[90%] w-[90%] -translate-x-[50%]`}
    //   //   tabIndex={-28}
    // >
    <div
      id="venue-mapping-tool"
      ref={widgetRef}
      className={` ${
        vmtWidgetOptions ? "" : "invisible"
      } fixed top-[5%] left-[5%] right-[5%] bottom-[5%] z-20 mt-0 rounded-sm border bg-white p-1`}
    />
    // </div>
  );
};

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}
