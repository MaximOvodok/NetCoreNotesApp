import React from "react";
import ITag from "../entities/ITag";
import { severityClasses } from "../common/Consts";

const NoteItem = ({ note }: any) => {
  return (
    <li className="note-list-item">
      <a
        href="#"
        className={severityClasses[note.severity.text] + " " + "note"}
      >
        <p>{note.text}</p>
        <ul className="note-tags-list">
          {note.tags.map((tag: ITag) => (
            <li className="note-tags-list-item">{tag.name}</li>
          ))}
        </ul>
      </a>
    </li>
  );
};

export default NoteItem;
