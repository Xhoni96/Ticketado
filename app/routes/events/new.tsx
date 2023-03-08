// import type { ActionArgs } from "@remix-run/node";
// import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";

// import { createEvent } from "~/models/event.server";
// import { requireUserId } from "~/session.server";

// export async function action({ request }: ActionArgs) {
//   const userId = await requireUserId(request);

//   const formData = await request.formData();
//   const name = formData.get("name");
//   const startDate = formData.get("startDate");
//   const description = formData.get("description");

//   if (typeof name !== "string" || name.length === 0) {
//     return json(
//       { errors: { name: "Name is required", startDate: null } },
//       { status: 400 }
//     );
//   }

//   if (/* typeof startDate !== "string" || */ !startDate) {
//     return json(
//       { errors: { name: null, startDate: "Start date is required" } },
//       { status: 400 }
//     );
//   }

//   const event = await createEvent(
//     {
//       name,
//       startDate: new Date(String(startDate)),
//       description: String(description),
//     },
//     userId
//   );

//   return redirect(`/events/${event.id}`);
// }

export default function NewEventPage() {
  const actionData = useActionData();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const startDateRef = React.useRef<HTMLInputElement>(null);

  // React.useEffect(() => {
  //   if (actionData?.errors?.name) {
  //     nameRef.current?.focus();
  //   } else if (actionData?.errors?.startDate) {
  //     startDateRef.current?.focus();
  //   }
  // }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Name: </span>
          <input
            ref={nameRef}
            name="name"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.name ? true : undefined}
            aria-errormessage={actionData?.errors?.name ? "name-error" : undefined}
          />
        </label>
        {actionData?.errors?.name && (
          <div className="pt-1 text-red-700" id="name-error">
            {actionData.errors.name}
          </div>
        )}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Start Date: </span>
          <input
            ref={startDateRef}
            type="date"
            // defaultValue="27-01-2023"
            name="startDate"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.startDate ? true : undefined}
            aria-errormessage={actionData?.errors?.startDate ? "startDate-error" : undefined}
          />
        </label>
        {actionData?.errors?.startDate && (
          <div className="pt-1 text-red-700" id="startDate-error">
            {actionData.errors.startDate}
          </div>
        )}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Description: </span>
          <textarea
            // ref={bodyRef}
            name="description"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
            // aria-invalid={actionData?.errors?.body ? true : undefined}
            // aria-errormessage={
            //   actionData?.errors?.body ? "body-error" : undefined
            // }
          />
        </label>
        {/* {actionData?.errors?.body && (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.body}
          </div>
        )} */}
      </div>

      <div className="text-right">
        <button type="submit" className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400">
          Save
        </button>
      </div>
    </Form>
  );
}
