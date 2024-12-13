import { useSelector } from "react-redux";
import { useStep } from "../hooks";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setQuestionModal } from "../redux/app";
import { useEffect, useState } from "react";

export default function RightColumn() {
  const { data, exports, step } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();
  const [customQuestions, setCustomQuestions] = useState<any>([]);
  const { title, selected, onSelectItem } = useStep(step);

  useEffect(() => {
    var defaultElements = data[step].elements.map((item: any) => item.title);
    const customElements = exports[step].elements.filter(
      (item: any) => !defaultElements.includes(item.title)
    );
    setCustomQuestions(customElements);
  }, [exports, step]);

  return (
    <div className="w-full h-full border-l-[1px] border-l-black">
      <div className="border-b-[1px] border-b-black px-[22px] pt-[24px] pb-[18px] flex flex-col">
        <h3 className="text-[16px] leading-[19.36px] font-bold m-0 mb-[16px]">
          {title}
        </h3>
        {data[step].elements.map((element: any, index: number) => {
          return (
            <button
              type="button"
              key={index}
              className={`w-full rounded-[10px] px-[16px] pt-[9px] pb-[12px] font-normal text-[14px] leading-[16.94px] mb-[18px] ${
                selected.includes(element.title)
                  ? "bg-[#F8FF9D]"
                  : "bg-[#CCCCCC]"
              }`}
              onClick={() => onSelectItem(element)}
            >
              {element.title}
            </button>
          );
        })}
      </div>
      <div className="border-b-[1px] border-b-black px-[22px] pt-[16px] pb-[75px]">
        <div className="flex justify-between w-full items-center mb-[16px]">
          <span className="text-[16px] leading-[19.36px] font-bold">
            Custom question
          </span>
          <Image
            src={"/images/plus-circle.svg"}
            alt="plus icon"
            width={20}
            height={20}
            onClick={() => dispatch(setQuestionModal({ display: true }))}
          />
        </div>
        {customQuestions.map((element: any, index: number) => {
          return (
            <button
              type="button"
              key={index}
              className={`w-full rounded-[10px] px-[16px] pt-[9px] pb-[12px] font-normal text-[14px] leading-[16.94px] mb-[18px] bg-[#F8FF9D]`}
              onClick={() => onSelectItem(element)}
            >
              {element.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
