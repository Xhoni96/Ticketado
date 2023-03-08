import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Event } from "~/types";

type Props = {
  label: string;
  name: string;
  error?: boolean;
  defaultValue: Event["endDate"];
};
export const DateTime = ({ label, name, error, defaultValue }: Props) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const handleTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const defaultValues = defaultValue?.split(" ");

  const value = date || time ? `${date} ${time}` : defaultValues ? `${defaultValues?.[0]} ${defaultValues?.[1]}` : "";

  return (
    <div>
      <label className="block" htmlFor="startDate">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          className={`w-[7.5rem] ${error ? "border border-red-400" : ""}`}
          type="date"
          id="startDate"
          onChange={handleDate}
          defaultValue={defaultValues?.[0]}
        />
        <div className="h-5 w-[1px] bg-black" />
        <input type="time" onChange={handleTime} defaultValue={defaultValues?.[1]} />
        <input type="hidden" name={name} value={value ?? ""} />
      </div>
    </div>
  );
};
