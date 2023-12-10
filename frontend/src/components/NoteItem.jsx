import { useSelector } from "react-redux"
import noteService from "../features/notes/noteService"

function NoteItem({ note }) {
    const { user } = useSelector((state) => state.auth)

    return( 
        <div className="note" style={{
            backgroundColor: noteService.isStaff ? 'rgba(0, 0, 0, 0.7)' : "#fff",
            color: noteService.isStaff ? '#fff' : "#000",
        }}>
            <h4>Note from {noteService.isStaff ? <span>Staff</span> : <span>{user.name}</span>}</h4>
            <p>{note.text}</p>
            <div className="note-date">
                {new Date(note.createdAt).toLocaleString('en-US')}
            </div>
        </div>
    )
}

export default NoteItem