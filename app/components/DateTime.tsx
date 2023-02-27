type Props = {
  label: string;
  name: string;
};
export const DateTime = ({ label, name }: Props) => {
  return (
    <div>
      <label className="block" htmlFor="startDate">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input className="w-[7.5rem]" type="date" id="startDate" name={name} />
        <div className="h-5 w-[1px] bg-black" />
        <input type="time" name={`${name}-minutes`} />
      </div>
    </div>
  );
};
