import React from "react";
import NoteItem from "./NoteItem";

const NotesList = ({ notesList, onDelete, onArchive }) => {
    return (
        <>
            { notesList.length !== 0 ?
                <div className="notes-list">
                {
                    notesList.map(item => (
                        <NoteItem key={item.id} note={item} onDelete={onDelete} onArchive={onArchive} />
                    ))
                }
                </div> :
                <p className="notes-list__empty-message">No notes here.</p>
            }
        </>
    )
}

export default NotesList;