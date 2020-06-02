import { DefaultRootState } from "react-redux";
import { INote } from "../entities";

export type NotesPayload = {
  type: string;
  notes?: Array<INote>;
  error?: any;
};

export type NotesState = {
  isNotesFetching: boolean;
  notesFetchError: any;

  items: Array<INote>;
  selectedItem: any;
};

export type NotesContainerState = DefaultRootState & {
  notes: NotesState;
};

export type NoteValuePayload = {
  type: string;
  value: any;
};

export type NoteFormState = {
  values: any;
  errors: any;
};

export type NoteFormContainerState = DefaultRootState & {
  noteForm: NoteFormState;
};
