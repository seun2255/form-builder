"use client";

import FormPreview from "./formPreview";
import { useSelector, useDispatch } from "react-redux";
import { setPreview } from "@/app/redux/app";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";

export default function Preview() {
  const { exports } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formState, setFormState] = useState<any>({
    "Personal Informtion": {},
    "Professional Informtion": {},
    Questions: {},
  });

  const handleNext = () => {
    if (step === 2) {
      setFormSubmitted(true);
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        console.log("Submitted Form: ", formState);
      }, 5000);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) {
      dispatch(setPreview({ display: false }));
    } else {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    const form = { ...formState };
    exports.map((step: any) => {
      form[step.step] = {};
      step.elements.map((element: any) => {
        form[step.step][element.title] = {};
        element.inputs.map((input: any) => {
          if (input.type === "file") {
            form[step.step][element.title][input.name] = [];
          } else if (input.type === "selection") {
            form[step.step][element.title][input.name] = input.values[0];
          } else {
            form[step.step][element.title][input.name] = "";
          }
        });
      });
    });
    setFormState(form);
  }, []);

  return (
    <div className="w-screen h-screen bg-[#D9D9D9] flex items-center justify-center absolute top-0 left-0">
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
                    <FormPreview
                      key={index}
                      formData={form}
                      page={index}
                      form={formState}
                      setForm={setFormState}
                    />
                  );
                }
              })}
              <div className="w-full flex justify-between absolute bottom-0 pb-[50px]">
                <button
                  type="button"
                  className="w-fit text-[12px] leading-[14.52px] font-bold py-[12px] px-[25px] rounded-[30px] border-[1px] border-[#CCCCCC] flex gap-[8px]"
                  onClick={handleBack}
                >
                  <Image
                    src={"/images/back.svg"}
                    alt="back icon"
                    width={12}
                    height={12}
                  />{" "}
                  Go Back
                </button>
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
              <div className="flex flex-col gap-[10px] justify-start mt-[30px]">
                {Object.keys(formState).map((key, index) => {
                  return (
                    <div key={index} className="text-left">
                      <h4 className="font-bold text-[16px]">{key}</h4>
                      <div className="flex flex-col gap-[4px]">
                        {Object.keys(formState[key]).map(
                          (element: any, index) => {
                            return (
                              <span
                                key={index}
                                className="font-normal text-[12px]"
                              >
                                {element}:{" "}
                                {JSON.stringify(formState[key][element])}
                              </span>
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
