import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import Preview from "./components/Preview";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: "", body: "" });
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );

  function toggleIsOpen() {
    setIsOpen((prev) => !prev);
  }

  function toggleIsPreview() {
    setIsPreview((prev) => !prev);
  }

  function toggleIsDark() {
    setIsDark((prev) => !prev);
  }

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("save note to local");
    // console.log(localStorage.getItem("notes"));
  }, [notes]);

  return (
    <div className={`App ${isDark && "dark"}`}>
      <Navbar
        currentNoteId={currentNote.id}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
        isPreview={isPreview}
        toggleIsPreview={toggleIsPreview}
      />
      {isOpen && (
        <Sidebar
          setCurrentNote={setCurrentNote}
          notes={notes}
          setNotes={setNotes}
          toggleIsOpen={toggleIsOpen}
          isDark={isDark}
          toggleIsDark={toggleIsDark}
        />
      )}
      <Split
        className="split"
        sizes={isPreview ? [55, 45] : [0, 100]}
        minSize={isPreview ? 100 : 0}
        gutterSize={isPreview ? 15 : 0}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="vertical"
      >
        <Preview currentNote={currentNote} />
        <Editor
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          setNotes={setNotes}
          notes={notes}
        />
      </Split>
    </div>
  );
}
