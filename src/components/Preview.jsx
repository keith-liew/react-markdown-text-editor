import React from "react";
import Showdown from "showdown";

function Preview(props) {
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
    noHeaderId: true,
    simpleLineBreaks: true
  });

  var html = converter.makeHtml(props.currentNote.body);

  return (
    <div className="preview" dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}

export default Preview;
