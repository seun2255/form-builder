import { useSelector } from "react-redux";
import { useStep } from "../hooks";
import { useState, useEffect } from "react";
import { rearrangeElements } from "../utils/sort";
import Image from "next/image";
import SelectionInput from "./selectionInput";

const h3Texts = [
  "Lets start with your personal informations",
  "Profesionnal Information",
  "Questions",
];

function shortenFileName(fileName: string) {
  if (fileName.length <= 20) {
    return fileName;
  } else {
    return fileName.substring(0, 17) + "...";
  }
}

interface DynamicObject {
  [key: string]: any[];
}

export default function CentralView() {
  const { exports, step } = useSelector((state: any) => state.app);
  const [fields, setFields] = useState<any[]>([]);
  const [uploads, setUploads] = useState<DynamicObject>({});

  useEffect(() => {
    const sortedFields = rearrangeElements(exports[step].elements);
    setFields(sortedFields);
    //   sortedFields.map((field: any) => {

    //   })
  }, [exports, step]);

  const handleUpload = (e: any, field: string) => {
    const file = e.target.files[0];
    var oldUploads = { ...uploads };
    if (oldUploads[field]) {
      oldUploads[field].push(file);
      setUploads(oldUploads);
    } else {
      oldUploads[field] = [];
      oldUploads[field].push(file);
      setUploads(oldUploads);
    }
  };

  const handleDeleteFile = (field: string, index: number) => {
    var oldUploads = { ...uploads };
    oldUploads[field].splice(index, 1);
    setUploads(oldUploads);
  };

  return (
    <div className="w-full h-fit pl-[96px] desktop-l:pl-[20px] pt-[79px]">
      <div className="w-[934px] desktop-l:w-[820px] desktop-m:w-[780px] border-[1px] border-[#CCCCCC] px-[25px] pt-[10px]">
        <span className="text-[12px] text-[#CCCCCC] font-normal leading-[14.52px] mb-[6px]">
          PAGE {step + 1} OF 3
        </span>
        <h2 className="text-[22px] font-bold leading-[26.63px] mb-[13px]">
          {exports[step].step}
        </h2>
        <h3 className="text-[16px] text-[#CCCCCC] font-normal leading-[19.36px] mb-[28px]">
          {h3Texts[step]}
        </h3>
        <div className={`w-full h-fit mb-[200px] grid grid-cols-1 gap-[15px]`}>
          {fields.map((element, index) => {
            return (
              <div
                key={index}
                className={`w-full h-fit grid grid-flow-col grid-cols-${element.inputs.length} gap-x-[10px] gap-y-[20px]`}
              >
                {element.inputs.map((item: any, index: number) => {
                  return (
                    <div key={index} className={`h-fit w-full`}>
                      <h4 className="text-[16px] leading-[19.36px] font-normal mb-[3px] w-fit">
                        {item.type !== "file" ? item.name : ""}
                      </h4>
                      {item.type !== "file" &&
                        item.type !== "selection" &&
                        item.type !== "textarea" && (
                          <input
                            title={item.name}
                            placeholder={item.hint ? item.hint : ""}
                            type={item.type}
                            className="text-[18px] font-normal py-[10px] px-[10px] bg-[#EEEEEE] w-full max-w-[20rem]"
                          />
                        )}
                      {item.type === "textarea" && (
                        <textarea
                          title={item.name}
                          placeholder={item.hint ? item.hint : ""}
                          className="text-[18px] font-normal py-[10px] px-[10px] bg-[#EEEEEE] w-full max-w-[24rem] min-h-[100px] resize-none"
                        />
                      )}
                      {item.type === "selection" && (
                        <SelectionInput
                          title={item.name}
                          values={item.values}
                        />
                      )}
                      {item.type === "file" && (
                        <div className="h-fit flex gap-[20px]">
                          <div className="w-full flex flex-col pt-[1.2rem]">
                            <input
                              type="file"
                              id={item.name}
                              title={item.name}
                              disabled={uploads[item.name]?.length > 3}
                              className="hidden"
                              onChange={(e) => handleUpload(e, item.name)}
                            />
                            <label
                              htmlFor={item.name}
                              className="w-full border-dashed border-[1px] border-black flex gap-[8px] justify-center items-center py-[10px] mb-[11px] cursor-pointer"
                            >
                              Upload{" "}
                              <Image
                                src={"/images/upload.svg"}
                                alt="upload icon"
                                width={20}
                                height={13.33}
                              />{" "}
                            </label>
                            <span className="text-[12px] leading-[14.52px] font-normal mb-[16px]">
                              {item.name}
                            </span>
                            {uploads[item.name] &&
                              uploads[item.name].map((upload: any, index) => {
                                return (
                                  <div
                                    className="w-full items-center flex gap-[7px] p-[12px] border-[1px] border-[#DDDDDD]"
                                    key={index}
                                  >
                                    <Image
                                      src={"/images/file.svg"}
                                      alt="file icon"
                                      width={13.33}
                                      height={16.67}
                                    />
                                    <span className="text-[12px] leading-[14.52px] font-normal">
                                      {shortenFileName(upload.name)}
                                    </span>
                                    <button
                                      type="button"
                                      className="self-end  ml-auto"
                                      onClick={() =>
                                        handleDeleteFile(item.name, index)
                                      }
                                    >
                                      <Image
                                        src={"/images/trash.svg"}
                                        alt="trash icon"
                                        width={11.67}
                                        height={15}
                                      />
                                    </button>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
