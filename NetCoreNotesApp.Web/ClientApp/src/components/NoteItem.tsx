import React from "react";
import { ITag } from "../entities";
import { severityClasses } from "../common/Consts";
import { Link } from "react-router-dom";
import { INoteItemProps } from "../types/ComponentsPropsTypes";

const NoteItem = (props: INoteItemProps) => {
  const severityClass = props.note.severity
    ? severityClasses[props.note.severity.text].concat(" ", "note").trim()
    : "note";

  return (
    <li className="note-list-item" onClick={props.onClick}>
      <Link
        to={{ pathname: "/edit", state: { isOpen: true, note: props.note } }}
        className={severityClass}
      >
        <p>{props.note.text}</p>
        <ul className="note-tags-list">
          {props.note.tags.map((tag: ITag) => (
            <li key={tag.id} className="note-tags-list-item">
              {tag.name}
            </li>
          ))}
        </ul>
      </Link>
    </li>
  );
};

export default NoteItem;
