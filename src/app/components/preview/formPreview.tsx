import { useState } from "react";
import Image from "next/image";
import { rearrangeElements } from "../../utils/sort";
import SelectionInput from "../selectionInput";

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
  form: any;
  setForm: any;
}

interface DynamicObject {
  [key: string]: any[];
}

export default function FormPreview({
  formData,
  page,
  form,
  setForm,
}: Preview) {
  const step = formData.step;
  const fields = rearrangeElements(formData.elements);
  const [uploads, setUploads] = useState<DynamicObject>({});

  const handleChange = (element: string, name: string, value: string) => {
    var formState = { ...form };
    formState[step][element][name] = value;
    setForm(formState);
  };

  const handleUpload = (e: any, element: string, name: string) => {
    var formState = { ...form };
    const file = e.target.files[0];
    formState[step][element][name].push(file);
    setForm(formState);
  };

  const handleDeleteFile = (element: string, name: string, index: number) => {
    var formState = { ...form };
    formState[step][element][name].splice(index, 1);
    setForm(formState);
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
                          value={
                            form[step]?.[element.title]?.[item.name]
                              ? form[step][element.title][item.name]
                              : ""
                          }
                          className="text-[18px] font-normal py-[10px] px-[10px] bg-[#EEEEEE] w-full max-w-[17rem]"
                          onChange={(e) =>
                            handleChange(
                              element.title,
                              item.name,
                              e.target.value
                            )
                          }
                        />
                      )}

                    {item.type === "textarea" && (
                      <textarea
                        title={item.name}
                        placeholder={item.hint ? item.hint : ""}
                        value={
                          form[step]?.[element.title]?.[item.name]
                            ? form[step][element.title][item.name]
                            : ""
                        }
                        className="text-[18px] font-normal py-[10px] px-[10px] bg-[#EEEEEE] w-full max-w-[24rem] min-h-[100px] resize-none"
                        onChange={(e) =>
                          handleChange(element.title, item.name, e.target.value)
                        }
                      />
                    )}

                    {item.type === "selection" && (
                      <SelectionInput
                        title={item.name}
                        element={element.title}
                        values={item.values}
                        value={
                          form[step]?.[element.title]?.[item.name]
                            ? form[step][element.title][item.name]
                            : item.values[0]
                        }
                        handleChange={handleChange}
                      />
                    )}

                    {item.type === "file" && (
                      <div className="h-fit flex gap-[20px]">
                        <div className="w-full flex flex-col pt-[1.2rem]">
                          <input
                            type="file"
                            id={`preview-${item.name}`}
                            title={item.name}
                            disabled={
                              form[step]?.[element.title]?.[item.name]?.length >
                              3
                            }
                            className="hidden"
                            onChange={(e) =>
                              handleUpload(e, element.title, item.name)
                            }
                          />
                          <label
                            htmlFor={`preview-${item.name}`}
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
                          {form[step]?.[element.title]?.[item.name] &&
                            form[step][element.title][item.name].map(
                              (upload: any, index: number) => {
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
                                        handleDeleteFile(
                                          element.title,
                                          item.name,
                                          index
                                        )
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
                              }
                            )}
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
  );
}
