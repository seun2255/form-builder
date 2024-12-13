import { useState } from "react";
import Image from "next/image";
import { rearrangeElements } from "../utils/sort";
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

interface Preview {
  formData: any;
  page: number;
}

export default function FormPreview({ formData, page }: Preview) {
  const step = formData.step;
  const fields = rearrangeElements(formData.elements);
  const [uploads, setUploads] = useState<any>({});

  const handleUpload = (e: any, field: string) => {
    const file = e.target.files[0];
    var oldUploads = { ...uploads };
    oldUploads[field] = file;
    setUploads(oldUploads);
  };

  return (
    <div className="w-full h-full px-[25px] pt-[10px] flex-shrink-0 flex flex-col">
      <span className="text-[12px] text-[#CCCCCC] font-normal leading-[14.52px] mb-[6px]">
        PAGE {page + 1} OF 3
      </span>
      <h2 className="text-[22px] font-bold leading-[26.63px] mb-[13px]">
        {step}
      </h2>
      <h3 className="text-[16px] text-[#CCCCCC] font-normal leading-[19.36px] mb-[28px]">
        {h3Texts[page]}
      </h3>
      <div className="w-full h-fit mb-[200px] grid grid-cols-2 gap-[20px]">
        {fields.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={`${
                item.type === "upload input" ? "col-span-2" : "z"
              } h-fit`}
            >
              <h4 className="text-[16px] leading-[19.36px] font-normal mb-[3px]">
                {item.title}
              </h4>
              {item.type !== "upload input" && item.type !== "selection" && (
                <input
                  title={item.title}
                  placeholder=""
                  type="text"
                  className="text-[18px] font-normal py-[10px] px-[10px] bg-[#EEEEEE] w-full"
                />
              )}
              {item.type === "selection" && (
                <SelectionInput title={item.title} values={item.values} />
              )}
              {item.type === "upload input" && (
                <div className="w-full h-fit flex gap-[20px]">
                  <input
                    title={item.title}
                    placeholder=""
                    type="text"
                    className="text-[18px] font-normal py-[10px] px-[10px] bg-[#EEEEEE] w-1/2 h-fit"
                  />
                  <div className="w-1/2 flex flex-col">
                    <input
                      type="file"
                      id={item.title}
                      title={item.title}
                      className="hidden"
                      onChange={(e) => handleUpload(e, item.title)}
                    />
                    <label
                      htmlFor={item.title}
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
                      We need your proof of address
                    </span>
                    {uploads[item.title] && (
                      <div className="w-full items-center flex gap-[7px] p-[12px] border-[1px] border-[#DDDDDD]">
                        <Image
                          src={"/images/file.svg"}
                          alt="file icon"
                          width={13.33}
                          height={16.67}
                        />
                        <span className="text-[12px] leading-[14.52px] font-normal">
                          {shortenFileName(uploads[item.title].name)}
                        </span>
                        <button type="button" className="self-end  ml-auto">
                          <Image
                            src={"/images/trash.svg"}
                            alt="trash icon"
                            width={11.67}
                            height={15}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}