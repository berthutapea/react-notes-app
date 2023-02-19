import React, { useState } from "react";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const toastId1 = 'toast-1';
const toastId2 = 'toast-2';
const toastId3 = 'toast-3';

const NotesInput = ({ addNewNote, closeModal }) => {
    const [formData, setFormData] = useState({
        title: '',
        noteBody: '',
        noteBodyLength: 0
    });

    const onTitleChange = (event) => {
        event.preventDefault();
        if (event.target.value.length <= 50) {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
                noteBodyLength: event.target.value.length
            })
        } else {
            toast.error('Max length for note body is 50', { toastId: toastId1 });
        }
    }

    const onBodyChange = (event) => {
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }


    const onSubmitForm = (event) => {
        event.preventDefault();
        if (formData.title === '') {
            toast.error('Title cannot be empty!', { toastId: toastId2 });
        } else if (formData.noteBody === '') {
            toast.error('Note body cannot be empty!', { toastId: toastId3 });
        } else {
            const newData = {
                id: +new Date(),
                title: formData.title,
                body: formData.noteBody,
                archived: false,
                createdAt: new Date(),
            }
            const result = addNewNote(newData);
            if (!result.error) {
                toast.success('New note saved!');
                setFormData({
                    ...formData,
                    title: '',
                    noteBody: '',
                    noteBodyLength: 0
                })
                closeModal();
            } else {
                toast.error('New note failed to save!');
            }
        }
    }

    return (
        <div className="note-input">
            <i className="note-input__title__closebuton" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
            </i>
            <h2 className="note-input__title__note">Take Note</h2>
            <form>
                <h3>Title</h3>
                <input
                    className="note-input__title"
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    value={formData.title}
                    onChange={onTitleChange}
                />
                <p className="note-input__title__char-limit">Character left: {50 - formData.noteBodyLength}</p>
                <h3>Notes</h3>
                <textarea
                    className="note-input__body"
                    type="text"
                    name="noteBody"
                    placeholder="Your notes here ..."
                    required
                    value={formData.noteBody}
                    onChange={onBodyChange}
                ></textarea>
                <button type="submit" onClick={onSubmitForm}>Add note</button>
            </form>
        </div>
    )
}

export default NotesInput;