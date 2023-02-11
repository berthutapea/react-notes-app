import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getInitialData } from '../utils/data';

import AppBody from './Body';
import Header from './Header';
import Footer from './Footer';

import 'react-toastify/dist/ReactToastify.min.css';
import autoBind from 'auto-bind';

class NotesApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getInitialData(),
            unfilteredNotes: getInitialData()
        }
        autoBind(this);
    }

    addNewNoteHandler(newNoteData) {
        try {
            this.setState((prevState) => {
                return {
                    notes: [ newNoteData, ...prevState.notes, ],
                    unfilteredNotes: [ newNoteData, ...prevState.unfilteredNotes, ]
                }
            })
            return {
                error: false,
                message: 'Success!'
            }
        }
        catch (error) {
            return {
                error: true,
                message: 'Failed!'
            }
        }
    }

    onDeleteHandler(id) {
        const result = window.confirm('Are you sure you want to delete this?');
        if (result) {
            this.setState((prevState) => {
                return {
                    notes: prevState.notes.filter(note => note.id !== id),
                    unfilteredNotes: prevState.unfilteredNotes.filter(note => note.id !== id),
                }
            })
            toast.success('Note deleted!');
        } else {
            toast.error('Deletion cancelled!');
        }
    }

    onArchiveHandler(id) {
        const noteToModify = this.state.unfilteredNotes.filter(note => note.id === id)[0];
        const modifiedNote = { ...noteToModify, archived: !noteToModify.archived };
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes.filter(note => note.id !== id),
                    modifiedNote
                ],
                unfilteredNotes: [
                    ...prevState.unfilteredNotes.filter(note => note.id !== id),
                    modifiedNote
                ],
            }
        });
        if (noteToModify.archived) {
            toast.success('Note moved to active!');
        } else {
            toast.success('Note archived!');
        }
    }

    onSearchHandler(text) {
        if (text.length !== 0 && text.trim() !== '') {
            this.setState({
                notes: this.state.unfilteredNotes.filter(note => note.title.toLowerCase().includes(text.toLowerCase())),
            })
        } else {
            this.setState({
                notes: this.state.unfilteredNotes,
            })
        }
    }
    
    render() {
        return (
            <div>
                <Header onSearch={this.onSearchHandler}/>
                <AppBody notes={this.state.notes} addNewNote={this.addNewNoteHandler} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />
                <Footer />
                <ToastContainer 
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        )
    }
}

export default NotesApp;