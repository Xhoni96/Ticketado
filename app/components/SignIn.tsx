import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { PopOverBase } from "./base/PopoverBase";
import type { ActionType } from "~/root";

export const SignIn = () => {
  const [searchParams] = useSearchParams();
  const actionData = useActionData<ActionType>();
  const { state } = useNavigation();
  const redirectTo = searchParams.get("redirectTo") || "";

  return (
    <Form method="post">
      <PopOverBase>
        <div className=" flex flex-col py-1 px-1">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="h-6 pl-1 text-gray-500"
            required
            autoComplete="email"
            autoFocus={true}
            aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-describedby="email-error"
          />
          {actionData?.errors?.email && (
            <div className="pt-1 text-red-800" id="email-error">
              {actionData.errors.email}
            </div>
          )}
        </div>
        <div className="my-1 flex flex-col px-1 py-1 pl-1">
          <label className="text-white" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="text-gray-500"
            required
            autoComplete="current-password"
            aria-invalid={actionData?.errors?.password ? true : undefined}
            aria-describedby="password-error"
          />
          {actionData?.errors?.password && (
            <div className="pt-1 text-red-700" id="password-error">
              {actionData.errors.password}
            </div>
          )}
        </div>
        <div className="flex items-center">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="remember"
            className="ml-2 cursor-pointer text-sm text-white "
          >
            Remember me
          </label>
        </div>
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <div className=" flex justify-center px-1 pb-1">
          <button
            //   type="submit"
            className="my-1  rounded bg-violet-400 py-2 px-5 text-white transition-transform hover:bg-violet-300 active:translate-y-2"
          >
            {state === "idle" ? "Sign In" : "Hold on tight"}
          </button>
        </div>
      </PopOverBase>
    </Form>
  );
};
