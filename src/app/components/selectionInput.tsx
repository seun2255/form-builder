import Image from "next/image";
import { useEffect, useState } from "react";

interface Input {
  title: string;
  element?: string;
  values: string[];
  value?: string;
  handleChange?: any;
}

export default function SelectionInput({
  title,
  element,
  values,
  value,
  handleChange,
}: Input) {
  const [selected, setSelected] = useState(value ? values[0] : value);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (value: string) => {
    if (element && handleChange) {
      handleChange(element, title, value);
    } else {
      setSelected(value);
    }
  };

  return (
    <div
      className="text-[18px] font-normal py-[10px] px-[10px] bg-[#EEEEEE] w-full max-w-[22rem] flex justify-between relative"
      onClick={() => setOpen(!open)}
    >
      {selected}
      <Image src={"/images/down.png"} alt="down icon" width={29} height={29} />
      {open && (
        <div className="absolute w-full top-full left-0 mt-[5px] z-10">
          {values.map((value, index) => {
            return (
              <button
                key={index}
                type="button"
                className={`text-[18px] font-normal py-[10px] px-[10px] ${
                  value === selected ? "bg-[#a4a0a0]" : "bg-[#EEEEEE]"
                } w-full`}
                onClick={() => handleSelect(value)}
              >
                {value}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
