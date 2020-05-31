import { NoteFormState } from "../types/StoreTypes";
import { severityDefaultValue } from "../common/Consts";

const SET_NOTE_VALUE: string = "SET_NOTE_VALUE";
const VALIDATE_NOTE_VALUES: string = "VALIDATE_NOTE_VALUES";

export const actionCreators = {
  setNoteValue: (value: any) => {
    return {
      type: SET_NOTE_VALUE,
      value,
    };
  },
  validateNoteValues: (errors: any) => ({
    type: VALIDATE_NOTE_VALUES,
    errors,
  }),
};

const initialState: NoteFormState = {
  values: {
    id: 0,
    text: "",
    severity: severityDefaultValue,
    tags: [],
  },
  errors: {},
};

export const reducer = (state: NoteFormState, action: any) => {
  state = state || initialState;

  switch (action.type) {
    case SET_NOTE_VALUE: {
      return {
        ...state,
        values: {
          ...state.values,
          ...action.value,
        },
      };
    }
    case VALIDATE_NOTE_VALUES: {
      return {
        ...state,
        errors: action.errors,
      };
    }
    default: {
      return state;
    }
  }
};
