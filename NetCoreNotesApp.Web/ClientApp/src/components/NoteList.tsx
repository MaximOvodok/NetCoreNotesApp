import React from "react";
import NoteItem from "./NoteItem";
import INote from "../entities/INote";

const NoteList = ({ notes, onItemClick }: any) => {
  return (
    <ul className="notes-list">
      {notes.map((note: INote) => (
        <NoteItem key={note.id} note={note} onClick={onItemClick} />
      ))}
    </ul>
  );
};

export default NoteList;
