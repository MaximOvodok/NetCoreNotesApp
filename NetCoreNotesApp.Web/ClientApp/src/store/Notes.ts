import NoteService from "../services/NoteService";
import INote from "../entities/INote";
import { DefaultRootState } from "react-redux";

const requestNotesType: string = "REQUEST_NOTES";
const receiveNotesSuccessType: string = "RECEIVE_NOTES_SUCCESS";
const receiveNotesErrorType: string = "RECEIVE_NOTES_ERROR";
const chooseNoteType: string = "CHOOSE_NOTE";

export const actionCreators = {
  chooseNote: () => ({ type: chooseNoteType }),
  requestNotes: () => async (dispatch: any, getState: any) => {
    dispatch({ type: requestNotesType });

    try {
      const notes: Array<INote> = await NoteService.getNotes();

      dispatch({ type: receiveNotesSuccessType, notes });
    } catch (error) {
      dispatch({ type: receiveNotesErrorType, error });
    }
  }
};

type INotesState = DefaultRootState & {
  isNotesFetching: boolean;
  notesFetchError: any;

  items: Array<INote>;
  selectedItem: any;
};

const initialState: INotesState = {
  items: [],
  selectedItem: null,
  isNotesFetching: false,
  notesFetchError: null
};

export const reducer = (state: INotesState, action: any): INotesState => {
  state = state || initialState;

  switch (action.type) {
    case requestNotesType: {
      return {
        ...state,
        isNotesFetching: true,
        selectedItem: null,
        notesFetchError: null,
        items: []
      };
    }
    case receiveNotesSuccessType: {
      return {
        ...state,
        isNotesFetching: false,
        selectedItem: null,
        notesFetchError: null,
        items: action.notes
      };
    }
    case receiveNotesErrorType: {
      return {
        ...state,
        isNotesFetching: false,
        selectedItem: null,
        notesFetchError: action.error,
        items: []
      };
    }
    case chooseNoteType: {
      return {
        ...state,
        selectedItem: action.selectedItem
      };
    }
    default: {
      return state;
    }
  }
};
