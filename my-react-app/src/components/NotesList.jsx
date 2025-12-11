function NotesList({ notes, onSelectNote, selectedNote, onDeleteNote, onEditNote }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="notes-list">
      {notes.length === 0 ? (
        <div className="notes-empty-list">
          <p>No notes yet. Create your first one!</p>
        </div>
      ) : (
        <div className="notes-items">
          {notes.map(note => (
            <div 
              key={note.id}
              className={`note-item ${selectedNote?.id === note.id ? 'selected' : ''}`}
              onClick={() => onSelectNote(note)}
            >
              <div className="note-item-header">
                <h4>{note.title || 'Untitled Note'}</h4>
                <div className="note-actions">
                  <button 
                    className="note-edit-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditNote(note)
                    }}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button 
                    className="note-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteNote(note.id)
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <p className="note-preview">
                {note.content.length > 100 
                  ? `${note.content.substring(0, 100)}...` 
                  : note.content}
              </p>
              <div className="note-meta">
                <span className="note-category">{note.category || 'General'}</span>
                <span className="note-date">{formatDate(note.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NotesList













