import React, { useState } from "react";
import NotesList from "./NotesList";
import NotesInput from "./NotesInput";
import Modal from 'react-modal';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#111',
      padding: '30px'
    },
};
Modal.setAppElement('#modal');

const AppBody = ({ notes, addNewNote, onDelete, onArchive }) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }
    
    const closeModal = () => {
        setIsOpen(false);
    }
    
    return (
        <div className="note-app__body">
            <h2 className="note-body__heading">Welcome to BetHup Note!</h2>
            <button className="note-body__add-note-button" onClick={openModal}>Add new note</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal" 
                closeTimeoutMS={200}       
            >
                <NotesInput addNewNote={addNewNote} closeModal={closeModal}/>
            </Modal>
            <h2>Active Notes</h2>
            <NotesList notesList={notes.filter(note => note.archived === false)} onDelete={onDelete} onArchive={onArchive} />
            <h2>Archive</h2>
            <NotesList notesList={notes.filter(note => note.archived === true)} onDelete={onDelete} onArchive={onArchive} />
        </div>
    );
}

export default AppBody;