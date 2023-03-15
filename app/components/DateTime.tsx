import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Event } from "~/types";

type Props = {
  label: string;
  name: string;
  error?: boolean;
  defaultValue: Event["endDate"];
};

const intlTime = new Intl.DateTimeFormat("en-GB", {
  timeStyle: "short",
});

const formatDate = (date: Date) => {
  // const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
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

  const fullDate = new Date(Number(defaultValue));

  const defaultTime = defaultValue ? intlTime.format(fullDate) : "";
  const defaultDate = defaultValue ? formatDate(fullDate) : "";

  const value = new Date(`${date ? date : defaultDate} ${time ? time : defaultTime}`).getTime();

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
          defaultValue={defaultDate}
        />
        <div className="h-5 w-[1px] bg-black" />
        <input type="time" onChange={handleTime} defaultValue={defaultTime} />
        <input type="hidden" name={name} value={value || ""} />
      </div>
    </div>
  );
};
