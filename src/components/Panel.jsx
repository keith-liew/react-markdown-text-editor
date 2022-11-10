import React from "react";
import {
  FaHeading,
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaLink,
  FaQuoteRight,
  FaCode,
  FaImage,
  FaListUl,
  FaListOl,
  FaCheck,
  FaSave
} from "react-icons/fa";

function Panel(props) {
  const settings = [
    { button: "heading", syntax: ["#"] },
    { button: "bold", syntax: ["**", "**"] },
    { button: "italic", syntax: ["*", "*"] },
    { button: "strike-through", syntax: ["~~", "~~"] },
    { button: "link", syntax: ["[", "](url)"] },
    { button: "quote", syntax: [">"] },
    { button: "code", syntax: ["`", "`"] },
    {
      button: "image",
      syntax: ["![", "](https://example.com/your-image.png)"]
    },
    { button: "unorder-list", syntax: ["\n- "] },
    { button: "order-list", syntax: ["\n1. "] },
    { button: "check-list", syntax: ["\n- [ ] "] }
  ];

  function insertSyntax(content, selection, settingKey) {
    const { head, tail } = selection;
    const textBeforeHead = content.slice(0, head);
    const textAfterTail = content.slice(tail);
    const textInMiddle = content.slice(head, tail);
    const { syntax } = settings.find(
      (setting) => setting.button === settingKey
    );
    let insertText = "";

    if (head === tail) {
      //Selection checking
      if (syntax.length === 1) {
        insertText = syntax[0];
        props.setSelection((prev) => ({
          head: prev.tail + insertText.length,
          tail: prev.tail + insertText.length
        }));
      } else {
        insertText = syntax.join(" ");
        props.setSelection((prev) => ({
          head: prev.head + syntax[0].length,
          tail: prev.tail + syntax[0].length + 1
        }));
      }
    } else {
      //Different Selection
      if (syntax.length === 1) {
        insertText = syntax[0];
        props.setSelection((prev) => ({
          head: prev.tail - textInMiddle.length + insertText.length,
          tail: prev.tail - textInMiddle.length + insertText.length
        }));
      } else {
        insertText = syntax.join(textInMiddle);
        props.setSelection((prev) => ({
          head: prev.head + syntax[0].length,
          tail: prev.tail + syntax[0].length
        }));
      }
    }
    props.setCurrentNote((prev) => ({
      ...prev,
      body: textBeforeHead + insertText + textAfterTail
    }));
  }

  function saveNote() {
    props.setNotes((prev) => [
      ...prev.filter((note) => note.id !== props.currentNote.id),
      {
        id: props.currentNote.id,
        body: props.currentNote.body
      }
    ]);
  }
  return (
    <div className="panel">
      <div className="panel-category panel-style">
        <button
          onClick={() =>
            insertSyntax(props.currentNote.body, props.selection, "heading")
          }
        >
          <FaHeading />
        </button>
        <button
          onClick={() =>
            insertSyntax(props.currentNote.body, props.selection, "bold")
          }
        >
          <FaBold />
        </button>
        <button
          onClick={() =>
            insertSyntax(props.currentNote.body, props.selection, "italic")
          }
        >
          <FaItalic />
        </button>
        <button
          onClick={() =>
            insertSyntax(
              props.currentNote.body,
              props.selection,
              "strike-through"
            )
          }
        >
          <FaStrikethrough />
        </button>
      </div>
      <div className="panel-category panel-attachment">
        <button
          onClick={() =>
            insertSyntax(props.currentNote.body, props.selection, "link")
          }
        >
          <FaLink />
        </button>
        <button
          onClick={() =>
            insertSyntax(props.currentNote.body, props.selection, "quote")
          }
        >
          <FaQuoteRight />
        </button>
        <button
          onClick={() =>
            insertSyntax(props.currentNote.body, props.selection, "code")
          }
        >
          <FaCode />
        </button>
        <button
          onClick={() =>
            insertSyntax(props.currentNote.body, props.selection, "image")
          }
        >
          <FaImage />
        </button>
      </div>
      <div className="panel-category panel-list">
        <button
          onClick={() =>
            insertSyntax(
              props.currentNote.body,
              props.selection,
              "unorder-list"
            )
          }
        >
          <FaListUl />
        </button>
        <button
          onClick={() =>
            insertSyntax(props.currentNote.body, props.selection, "order-list")
          }
        >
          <FaListOl />
        </button>
        <button
          onClick={() =>
            insertSyntax(props.currentNote.body, props.selection, "check-list")
          }
        >
          <FaCheck />
        </button>
      </div>
      <div className="panel-category panel-save">
        <button onClick={saveNote}>
          <FaSave />
        </button>
      </div>
    </div>
  );
}

export default Panel;
