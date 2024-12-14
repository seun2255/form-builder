import { useDispatch } from "react-redux";
import { setQuestionModal } from "../redux/app";
import { useStep } from "../hooks";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function CustomQuestionModal() {
  const { data, step, exports } = useSelector((state: any) => state.app);
  const { onSelectItem } = useStep(step);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleSave = () => {
    if (title !== "") {
      const element = {
        id: exports[step].elements.length + 1,
        description: "a textarea",
        title: title,
        inputs: [
          { type: "textarea", name: title }],
      };

      onSelectItem(element);
      dispatch(setQuestionModal({ display: false }));
    }
  };

  return (
    <div className="absolute w-screen h-screen flex z-10">
      <div className="m-auto w-[699px] h-[310px] bg-white border-[1px] border-[#CCCCCC] px-[64px] pt-[40px] pb-[28px]">
        <h3 className="text-[16px] leading-[19.36px] font-bold mb-[11px]">
          Add your custom question
        </h3>
        <textarea
          title="question"
          className="w-full h-[139px] bg-[#EEEEEE] mb-[26px] p-[10px] resize-none"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="ml-auto w-fit flex gap-[10px]">
          <button
            type="button"
            className="w-[119px] h-[35px] flex items-center justify-center text-[16px] leading-[19.36px] font-bold"
            onClick={() => dispatch(setQuestionModal({ display: false }))}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-[119px] h-[35px] flex items-center justify-center text-[16px] leading-[19.36px] font-bold bg-[#5FCEEF]"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
