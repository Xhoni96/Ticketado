import { Switch as SwitchToggle } from "@headlessui/react";
import { Form } from "@remix-run/react";

type Props = {
  label?: string;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
};
export const Switch = ({ label, enabled, setEnabled, ...rest }: Props) => {
  return (
    <Form method="post">
      <SwitchToggle.Group>
        <div className="flex items-center gap-3">
          {label ? <SwitchToggle.Label className="cursor-pointer">{label}</SwitchToggle.Label> : null}

          <SwitchToggle
            checked={enabled}
            onChange={setEnabled}
            {...rest}
            className={`${enabled ? "bg-purple-500" : "bg-purple-400"}
           inline-flex h-[36px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">{label}</span>
            <span
              aria-hidden="true"
              className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[32px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </SwitchToggle>
        </div>
      </SwitchToggle.Group>
    </Form>
  );
};
