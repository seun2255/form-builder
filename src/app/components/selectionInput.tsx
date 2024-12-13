import Image from "next/image";
import { useState } from "react";

interface Input {
  title: string;
  values: string[];
}

export default function SelectionInput({ title, values }: Input) {
  const [selected, setSelected] = useState(values[0]);
  const [open, setOpen] = useState(false);

  return (
    <div
      className="text-[18px] font-normal py-[10px] px-[10px] bg-[#EEEEEE] w-full flex justify-between relative"
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
                onClick={() => setSelected(value)}
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
