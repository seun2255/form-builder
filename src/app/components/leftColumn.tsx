import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setStepDisplay } from "../redux/app";
import { useStep } from "../hooks";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function LeftColumn() {
  const { exports, step } = useSelector((state: any) => state.app);
  const { onSelectItem } = useStep(step);
  const [view, setView] = useState<"create" | "templates">("create");
  const dispatch = useDispatch();

  return (
    <div className="w-full h-full border-r-[1px] border-r-black">
      <div className="border-b-[1px] border-b-black pl-[30px] laptop-x:px-[20px] py-[25px]">
        <div className="rounded-[10px] bg-[#D9D9D9] p-[7px] flex gap-[20px] laptop-x:gap-[10px] w-fit">
          <button
            type="button"
            className={`${
              view === "create" ? "bg-white" : ""
            } rounded-[10px] text-[14px] leading-[16.94px] px-[40px] laptop-x:px-[25px] py-[10px]`}
            onClick={() => setView("create")}
          >
            Create
          </button>
          <button
            type="button"
            className={`${
              view === "templates" ? "bg-white" : ""
            } rounded-[10px] text-[14px] leading-[16.94px] px-[40px] laptop-x:px-[25px] py-[10px]`}
            onClick={() => setView("templates")}
          >
            Templates
          </button>
        </div>
      </div>
      {exports.map((item: any, index: number) => {
        return (
          <div className="w-full" key={index}>
            <button
              type="button"
              className="w-full py-[16px] pl-[23px] pr-[15px] flex justify-between items-center border-b-[1px] border-b-black"
              onClick={() => dispatch(setStepDisplay({ step: index }))}
            >
              <span className="font-bold text-[16px] leading-[19.36px]">
                {item.step}
              </span>
              {step === index ? (
                <IndeterminateCheckBoxIcon sx={{ height: 32, width: 32 }} />
              ) : (
                <AddBoxIcon sx={{ height: 32, width: 32 }} />
              )}
            </button>
            {step === index && (
              <div className="pt-[17px] pb-[100px] w-full px-[24px] flex flex-col gap-[10px] align-middle">
                {item.elements.map((element: any, index: number) => {
                  return (
                    <button
                      type="button"
                      key={index}
                      className="flex justify-between px-[13px] py-[12px] rounded-[10px] border-[1px] border-[#CCCCCC]"
                    >
                      <span className="text-[16px] font-normal leading-[19.36px] ">
                        {element.title}
                      </span>{" "}
                      <Image
                        src="/images/delete.svg"
                        alt="trash icon"
                        width={20}
                        height={20}
                        onClick={() => onSelectItem(element)}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
