"use client";

import Navbar from "./components/navbar";
import LeftColumn from "./components/leftColumn";
import RightColumn from "./components/rightColumn";
import CentralView from "./components/centralView";
import CustomQuestionModal from "./components/customQuestionModal";
import { useSelector } from "react-redux";
import Preview from "./components/preview";

export default function Home() {
  const { step, showQuestionModal, showPreview } = useSelector(
    (state: any) => state.app
  );

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex w-full">
        <div className="w-[376px] desktop-m:w-fit h-full">
          <LeftColumn />
        </div>
        {step !== null && (
          <div className="flex-1 h-full">
            <CentralView />
          </div>
        )}
        {step !== null && (
          <div className="w-[376px] desktop-m:w-[260px] h-full">
            <RightColumn />
          </div>
        )}
      </div>
      {showQuestionModal && <CustomQuestionModal />}
      {showPreview && <Preview />}
    </div>
  );
}
