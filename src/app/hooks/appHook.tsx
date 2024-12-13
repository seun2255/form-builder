import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStepCustomQuestions, setStepExports } from "../redux/app";

const useStep = (step: number) => {
  const { data, exports, customQuestions } = useSelector(
    (state: any) => state.app
  );
  const dispatch = useDispatch();
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (step !== null) {
      if (step === 0) {
        setTitle("identity");
      } else if (step === 1) {
        setTitle("profession");
      } else {
        setTitle("questions");
      }

      var selected = exports[step].elements.map((item: any) => item.title);
      setSelectedElements(selected);
    }
  }, [step, exports]);

  const onSelectItem = (item: any) => {
    const temp = { ...exports[step] };
    if (!selectedElements.includes(item.title)) {
      var newElements = [...temp.elements];
      newElements.push(item);
      temp.elements = newElements;
      dispatch(setStepExports({ step: step, data: temp }));
    } else {
      const newElements = temp.elements.filter(
        (element: any) => element.title !== item.title
      );
      temp.elements = newElements;
      dispatch(setStepExports({ step: step, data: temp }));
    }
  };

  // const handleCustomItem = (item: any) => {
  //   const temp = { ...exports[step] };
  //   const customQuestionsTemp = { ...customQuestions[step] };
  //   if (!selectedElements.includes(item.title)) {
  //     var newElements = [...temp.elements];
  //     newElements.push(item);
  //     temp.elements = newElements;
  //     dispatch(setStepExports({ step: step, data: temp }));

  //     var newCustomElements = [...customQuestionsTemp.elements];
  //     newCustomElements.push(item);
  //     customQuestionsTemp.elements = newCustomElements;
  //     dispatch(
  //       setStepCustomQuestions({ step: step, data: customQuestionsTemp })
  //     );
  //   } else {
  //     const newElements = temp.elements.filter(
  //       (element: any) => element.title !== item.title
  //     );
  //     temp.elements = newElements;
  //     dispatch(setStepExports({ step: step, data: temp }));

  //     const newCustomElements = customQuestionsTemp.elements.filter(
  //       (element: any) => element.title !== item.title
  //     );
  //     customQuestionsTemp.elements = newCustomElements;
  //     dispatch(
  //       setStepCustomQuestions({ step: step, data: customQuestionsTemp })
  //     );
  //   }
  // };

  return { selected: selectedElements, title, onSelectItem };
};

export { useStep };
