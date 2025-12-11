import { useState, useEffect } from 'react'

function UpdateNote({ note, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({ ...note })
  const [tagInput, setTagInput] = useState('')

  const categories = ['Theory', 'Character Analysis', 'Gameplay', 'Lore', 'Fan Art Ideas', 'Other']

  useEffect(() => {
    setFormData({ ...note })
  }, [note])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.content.trim()) {
      alert('Note content cannot be empty!')
      return
    }
    onUpdate(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="update-note">
      <h2>✏️ Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="My Omori Theory..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your thoughts about Omori here..."
            rows="8"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (press Enter to add):</label>
          <div className="tags-input">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., spoilers, fanart, analysis"
            />
            <button type="button" onClick={addTag} className="add-tag-btn">
              Add
            </button>
          </div>
          <div className="tags-list">
            {formData.tags && formData.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="remove-tag"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Update Note
          </button>
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateNote









