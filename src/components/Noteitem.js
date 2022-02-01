import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const {note, updateNote} = props;
  return (
    <div className="col my-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h3 className="card-title p-2 flex-grow-1">{note.title}</h3>
            <h5 className="card-title p-2 my-3"><i className="fas fa-tag mx-3">&nbsp; {note.tag} </i></h5>
            <i className="far fa-edit mx-3 my-3 p-2" onClick={()=>{updateNote(note)}}></i>
            <i className="far fa-trash-alt mx-3 my-3 p-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success")}}></i>
          </div>
          <p className="card-text">{note.description} </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
