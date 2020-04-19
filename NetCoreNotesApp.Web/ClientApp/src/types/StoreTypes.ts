import { DefaultRootState } from "react-redux";
import { INote } from "../entities";

export type RequestNotesActionState = DefaultRootState & {
  type: string;
  notes?: Array<INote>;
  error?: any;
};

export type INotesState = DefaultRootState & {
  isNotesFetching: boolean;
  notesFetchError: any;

  items: Array<INote>;
  selectedItem: any;
};
