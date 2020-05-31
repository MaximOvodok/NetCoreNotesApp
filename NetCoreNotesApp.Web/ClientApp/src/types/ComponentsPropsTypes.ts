import { INote } from "../entities";
import { RouteComponentProps } from "react-router";
import { IFormData } from "./ComponentsStateTypes";

export type INoteFormProps = RouteComponentProps & {
  setNoteValue: (e: any, value: any) => void;
  values: IFormData;
  errors: { [key: string]: string };
  validateAction: (errors: any) => void;
};

export type NoteFormScreenProps = RouteComponentProps & {
  setNoteValue: (value: any) => void;
  values: IFormData;
  errors: { [key: string]: string };
  validateNote: (errors: any) => void;
};

export interface INoteProps {
  isNotesFetching: boolean;
  items: Array<INote>;
  notesFetchError: any;
  selectedItem: any;
  requestNotes: () => void;
  toggleNoteModal: (event: React.MouseEvent<any, MouseEvent>) => void;
  noteModalOpened: boolean;
}

export interface INoteItemProps {
  note: INote;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}
