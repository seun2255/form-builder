import Link from "next/link";
import { setPreview } from "../redux/app";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <div className="h-[114px] desktop-m:h-[100px] laptop-x:h-[70px] w-full border-b-[1px] border-b-black flex items-center justify-end pr-[60px]">
      <button
        type="button"
        className="rounded-[30px] bg-[#08C1FF] text-[16px] leading-[19.36px] font-bold px-[50px] laptop-x:px-[30px] py-[20px] laptop-x:py-[10px]"
        onClick={() => dispatch(setPreview({ display: true }))}
      >
        Save
      </button>
    </div>
  );
}
