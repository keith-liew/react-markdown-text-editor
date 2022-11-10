import React from "react";

import { MdPreview, MdOutlinePreview, MdMenu, MdMenuOpen } from "react-icons/md";

function Navbar(props) {
  return (
    <div className="navbar">
      {props.isOpen && <h1 className="navbar-title">Markdown Note Editor</h1>}
      <div className="navbar-bars-icon">
        <div className="tooltip">
          {props.isOpen === false ? (
            <MdMenu
              className="bar-icon navbar-icon"
              onClick={props.toggleIsOpen}
            />
          ) : (
            <MdMenuOpen
              className="bar-icon navbar-icon"
              onClick={props.toggleIsOpen}
            />
          )}
          <span className="tooltiptext">Menu</span>
        </div>
      </div>
      {!props.isOpen && props.currentNoteId !== "" && (
        <h1 className="navbar-title">ID: {props.currentNoteId}</h1>
      )}
      <div className="navbar-preview-icon">
        <div className="tooltip">
          { props.isPreview ? <MdPreview
            className="bar-icon navbar-icon"
            onClick={props.toggleIsPreview}
          /> : <MdOutlinePreview
          className="bar-icon navbar-icon"
          onClick={props.toggleIsPreview}
        />}
          <span className="tooltiptext">Preview</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
