function NoteDetail({ note, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="note-detail">
      <div className="note-detail-header">
        <h2>{note.title || 'Untitled Note'}</h2>
        <div className="note-detail-actions">
          <button className="edit-btn" onClick={onEdit}>
            Edit
          </button>
          <button className="delete-btn" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
      
      <div className="note-meta-info">
        <span className="note-category-badge">{note.category || 'General'}</span>
        <span className="note-date-info">
          Created: {formatDate(note.createdAt)}
        </span>
        {note.updatedAt !== note.createdAt && (
          <span className="note-date-info">
            Updated: {formatDate(note.updatedAt)}
          </span>
        )}
      </div>

      <div className="note-content">
        {note.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="note-tags">
          <strong>Tags:</strong>
          {note.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default NoteDetail











