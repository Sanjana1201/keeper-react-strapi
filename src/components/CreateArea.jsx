import React, { useState } from "react";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  
  const [note, setNote] = useState({
    Title: "",
    Body: ""
  });

  function handleChange(event) {
    console.log(event.target.name);
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    console.log(note);
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    event.preventDefault();
    const newNote = {
      Title: note.Title,
      Body: note.Body
    }
    axios.post("https://keeper-strapi.herokuapp.com/notes", newNote);
    setNote({
      Title: "",
      Body: ""
    });
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="Title"
            onChange={handleChange}
            value={note.Title}
            placeholder="Title"
          />
        )}

        <textarea
          name="Body"
          onClick={expand}
          onChange={handleChange}
          value={note.Body}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
