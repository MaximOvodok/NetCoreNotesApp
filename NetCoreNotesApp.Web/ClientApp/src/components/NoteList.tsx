import React from "react";
import NoteItem from "./NoteItem";
import INote from "../entities/INote";

const NoteList = ({ notes }: any) => {
  return (
    <ul className="notes-list">
      {notes.map((note: INote) => (
        <NoteItem note={note} />
      ))}
    </ul>
  );
};

export default NoteList;
