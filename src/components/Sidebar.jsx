import React, { useEffect, useRef } from "react";

import {
  MdNoteAdd,
  MdDelete,
  MdToggleOn,
  MdOutlineToggleOff
} from "react-icons/md";

function Sidebar(props) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        props.toggleIsOpen();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  function addNote() {
    const timestamp = new Date().getTime();
    props.setNotes((prev) => [
      ...prev,
      {
        id: timestamp,
        body: "new note " + timestamp
      }
    ]);
  }

  return (
    <div className="sidebar" ref={wrapperRef}>
      <div className="sidebar-item" onClick={addNote}>
        <p className="sidebar-item-text">Add Note</p>
        <MdNoteAdd className="bar-icon sidebar-item-add-icon" />
      </div>
      {props.notes
        .slice(0)
        .reverse()
        .map((note) => (
          <div className="sidebar-item" key={note.id}>
            <div
              className="sidebar-note"
              onClick={() => {
                props.setCurrentNote({ id: note.id, body: note.body });
              }}
            >
              <p className="sidebar-item-text">{note.body.substr(0, 20)} </p>
            </div>
            <MdDelete
              className="bar-icon sidebar-item-icon"
              onClick={() =>
                props.setNotes((prev) => prev.filter((n) => n.id !== note.id))
              }
            />
          </div>
        ))}
      <div className="sidebar-footer">
        {props.isDark ? (
          <MdOutlineToggleOff
            className="bar-icon"
            onClick={props.toggleIsDark}
          />
        ) : (
          <MdToggleOn className="bar-icon" onClick={props.toggleIsDark} />
        )}
      </div>
    </div>
  );
}

export default Sidebar;
