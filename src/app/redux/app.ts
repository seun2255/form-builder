import { createSlice } from "@reduxjs/toolkit";
import JsonData from "../input.json";

const initialState = {
  data: JsonData.data,
  customQuestions: [
    {
      step: "Personal Informtion",
      elements: [],
    },
    {
      step: "Professional Informtion",
      elements: [],
    },
    {
      step: "Questions",
      elements: [],
    },
  ],
  exports: [
    {
      step: "Personal Informtion",
      elements: [],
      open: false,
    },
    {
      step: "Professional Informtion",
      elements: [],
      open: false,
    },
    {
      step: "Questions",
      elements: [],
      open: false,
    },
  ],
  step: null,
  showQuestionModal: false,
};

interface Display {
  payload: {
    step: number;
  };
}

interface Exports {
  payload: {
    step: number;
    data: any;
  };
}

interface setModal {
  payload: {
    display: boolean;
  };
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStepDisplay: (state: any, action: Display) => {
      if (state.step === action.payload.step) {
        state.step = null;
      } else {
        state.step = action.payload.step;
      }
    },
    setStepExports: (state: any, action: Exports) => {
      state.exports[action.payload.step] = action.payload.data;
    },
    setStepCustomQuestions: (state: any, action: Exports) => {
      state.customQuestions[action.payload.step] = action.payload.data;
    },
    setQuestionModal: (state: any, action: setModal) => {
      state.showQuestionModal = action.payload.display;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setStepDisplay,
  setStepExports,
  setQuestionModal,
  setStepCustomQuestions,
} = appSlice.actions;

export default appSlice.reducer;
