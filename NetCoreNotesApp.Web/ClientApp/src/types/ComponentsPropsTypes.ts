import { INote } from "../entities";
import { RouteProps } from "react-router";

export interface INoteFormProps extends RouteProps {}

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
