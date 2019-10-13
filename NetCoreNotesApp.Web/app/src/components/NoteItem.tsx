import React from "react";

const NoteItem = ({ note }: any) => {
  const severityClasses: { [key: string]: string } = {
    Low: "green",
    Normal: "yellow",
    High: "red"
  };

  return (
    <li className="note-list-item">
      <a href="#" className={severityClasses[note.Severity] + " " + "note"}>
        <p>{note.Text}</p>
        <ul className="note-tags-list">
          {note.Tags.map((tag: string) => (
            <li className="note-tags-list-item">{tag}</li>
          ))}
        </ul>
      </a>
    </li>
  );
};

export default NoteItem;
