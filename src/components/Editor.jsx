import React, { useState, useRef, useEffect } from "react";
import Panel from "./Panel";

function Editor(props) {
  const [selection, setSelection] = useState({ head: 0, tail: 0 });
  const textareaRef = useRef(null);

  function selectedRange(e) {
    const { selectionStart: headIndex, selectionEnd: tailIndex } = e.target;
    setSelection({ head: headIndex, tail: tailIndex });
  }

  function updateTextArea(e) {
    const timestamp = new Date().getTime();
    props.setCurrentNote((prev) => ({
      id: prev.id === "" ? timestamp : prev.id,
      body: e.target.value
    }));
    if (e.target.value === "") {
      setSelection({ head: 0, tail: 0 });
    }
  }

  useEffect(() => {
    const { head, tail } = selection;
    if (!head && !tail) return;
    textareaRef.current.setSelectionRange(head, tail);
    textareaRef.current.focus();
  }, [selection]);

  return (
    <div className="editor">
      <Panel
        currentNote={props.currentNote}
        setCurrentNote={props.setCurrentNote}
        selection={selection}
        setSelection={setSelection}
        setNotes={props.setNotes}
        notes={props.notes}
      />

      <textarea
        id="editor-textarea"
        ref={textareaRef}
        className="editor-textarea"
        value={props.currentNote.body}
        onChange={updateTextArea}
        onClick={selectedRange}
      ></textarea>
    </div>
  );
}

export default Editor;
