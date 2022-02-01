import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default"
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "",
    description: "",
    tag: "default"})
    props.showAlert("Added Successfully","success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-4 border border-success">
      <h1 className="p-2 mx-3 my-3">Add a Note </h1>
      <form className="p-2 mx-3 my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <h5> Title </h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="tile"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            maxLength={30}
            minLength={5}
            required
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlfor="description" className="form-label">
            <h5> Description </h5>
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            style={{"height":"200px"}}
            required
            minLength={5}
            value={note.description}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
          <h5> Tag </h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            maxLength={15}
            required
            value={note.tag}
          />
        </div>

        <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
