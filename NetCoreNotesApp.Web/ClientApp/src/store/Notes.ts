import { NoteService } from "../services";
import { INote } from "../entities";
import { NotesState, NotesPayload } from "../types/StoreTypes";

const requestNotesType: string = "REQUEST_NOTES";
const receiveNotesSuccessType: string = "RECEIVE_NOTES_SUCCESS";
const receiveNotesErrorType: string = "RECEIVE_NOTES_ERROR";
const chooseNoteType: string = "CHOOSE_NOTE";

export const actionCreators = {
  chooseNote: () => ({ type: chooseNoteType }),
  requestNotes: () => async (dispatch: any, getState: any) => {
    const requestNotesActionState: NotesPayload = {
      type: requestNotesType,
    };
    dispatch(requestNotesActionState);

    try {
      const notes: Array<INote> = await NoteService.getNotes();
      requestNotesActionState.type = receiveNotesSuccessType;
      requestNotesActionState.notes = notes;

      dispatch(requestNotesActionState);
    } catch (error) {
      requestNotesActionState.type = receiveNotesErrorType;
      requestNotesActionState.error = error;

      dispatch(requestNotesActionState);
    }
  },
};

const initialState: NotesState = {
  items: [],
  selectedItem: null,
  isNotesFetching: false,
  notesFetchError: null,
};

export const reducer = (state: NotesState, action: any): NotesState => {
  state = state || initialState;

  switch (action.type) {
    case requestNotesType: {
      return {
        ...state,
        isNotesFetching: true,
        selectedItem: null,
        notesFetchError: null,
        items: [],
      };
    }
    case receiveNotesSuccessType: {
      return {
        ...state,
        isNotesFetching: false,
        selectedItem: null,
        notesFetchError: null,
        items: action.notes,
      };
    }
    case receiveNotesErrorType: {
      return {
        ...state,
        isNotesFetching: false,
        selectedItem: null,
        notesFetchError: action.error,
        items: [],
      };
    }
    case chooseNoteType: {
      return {
        ...state,
        selectedItem: action.selectedItem,
      };
    }
    default: {
      return state;
    }
  }
};
