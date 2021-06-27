import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { LocalGasStation } from "@material-ui/icons";

function App() {
  const [Mynotes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }
  
  useEffect(() => {
    fetch("https://keeper-strapi.herokuapp.com/notes").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setNotes(jsonRes))
  });

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {Mynotes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.Title}
            content={noteItem.Body}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
