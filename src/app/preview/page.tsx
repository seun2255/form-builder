"use client";

import FormPreview from "../components/formPreview";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Preview() {
  const { exports } = useSelector((state: any) => state.app);
  const [step, setStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleNext = () => {
    if (step === 2) {
      setFormSubmitted(true);
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
      }, 5000);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#D9D9D9] flex items-center justify-center">
      <div className="w-[1068px] h-[772px] rounded-[20px] bg-white border-[1px] border-[#CCCCCC] flex p-[18px] pr-[50px] gap-[100px]">
        <div className="w-[30%] h-full rounded-[20px] bg-[#EEEEEE] pl-[25px] pt-[20px] text-[16px] leading-[19.36px] font-bold">
          Lorem ipsum
        </div>
        <div className="flex-1 w-full h-full pt-[100px] flex overflow-hidden relative">
          {!formSubmitted && (
            <>
              {exports.map((form: any, index: number) => {
                if (step === index) {
                  return (
                    <FormPreview key={index} formData={form} page={index} />
                  );
                }
              })}
              <div className="w-full flex justify-between absolute bottom-0 pb-[50px]">
                <Link href={step === 0 ? "/" : ""}>
                  <button
                    type="button"
                    className="w-fit text-[12px] leading-[14.52px] font-bold py-[12px] px-[25px] rounded-[30px] border-[1px] border-[#CCCCCC] flex gap-[8px]"
                    onClick={() => setStep(step - 1)}
                  >
                    <Image
                      src={"/images/back.svg"}
                      alt="back icon"
                      width={12}
                      height={12}
                    />{" "}
                    Go Back
                  </button>
                </Link>
                <button
                  type="button"
                  className="w-fit text-[12px] leading-[14.52px] font-bold py-[12px] px-[25px] rounded-[30px] text-white bg-black"
                  onClick={handleNext}
                >
                  Next Step
                </button>
              </div>
            </>
          )}
          {formSubmitted && uploading && (
            <div className="w-full h-full flex-shrink-0 flex flex-col items-center justify-center">
              <span className="text-[22px] leading-[26.63px] font-bold mb-[28px]">
                Uploading your application ...
              </span>
              <div className="w-[96px] h-[96px] rounded-[50px] bg-black flex items-center justify-center">
                <div className="sp sp-circle"></div>
              </div>
            </div>
          )}
          {formSubmitted && !uploading && (
            <div className="w-full h-full flex-shrink-0 flex flex-col items-center justify-center">
              <span className="text-[22px] leading-[26.63px] font-bold mb-[36px]">
                Done!
              </span>
              <Image
                src={"/images/confetti.png"}
                alt="confetti image"
                width={96}
                height={96}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
