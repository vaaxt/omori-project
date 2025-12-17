import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/Home'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import LocationList from './components/LocationList' 
import NoteDetail from './components/NoteDetail'
import CreateNote from './components/CreateNote'
import UpdateNote from './components/UpdateNote'
import AuthForm from './components/AuthForm'
import NotesList from './components/NotesList'

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [activeTab, setActiveTab] = useState('home')
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('omori-notes')
    return savedNotes ? JSON.parse(savedNotes) : []
  })
  const [selectedNote, setSelectedNote] = useState(null)
  const [isCreatingNote, setIsCreatingNote] = useState(false)
  const [isEditingNote, setIsEditingNote] = useState(false)


  useEffect(() => {
    localStorage.setItem('omori-notes', JSON.stringify(notes))
  }, [notes])

  const characters = [
    {
      id: 1,
      name: "  Omori / Sunny",
      role: "The protagonist",
      personality: "Quiet and aloof",
      description: "The protagonist who explores the dream world with his friends",
      image: "🎻",
      color: "#2a2a2aff"
    },
    {
      id: 2,
      name: "Aubrey",
      role: "Fighter",
      personality: "Energetic and hot-tempered",
      description: "A strong girl with pink hair armed with a baseball bat",
      image: "💗",
      color: "#ff69b4"
    },
    {
      id: 3,
      name: "Kel",
      role: "Support",
      personality: "Optimistic and energetic",
      description: "A tall, athletic guy who is always ready to help his friends.",
      image: "🏀",
      color: "#ffa500"
    },
    {
      id: 4,
      name: "Hero",
      role: "Healer",
      personality: "Caring and responsible",
      description: "Kel's older brother, who cooks well and takes care of his friends.",
      image: "🍪",
      color: "#4169e1"
    },
    {
      id: 5,
      name: "Basil",
      role: "---Support??",
      personality: "Anxious and kind",
      description: "A flower lover who always carries a camera with him",
      image: "🌻",
      color: "#54ab68ff"
    },
    {
      id: 6,
      name: "Mari",
      role: "Preceptor",
      personality: "Caring and patient",
      description: "Omori's older sister, who plays the piano.",
      image: "🎹",
      color: "#9370db"
    }
  ]

  const locations = [
    {
      id: 1,
      name: "White Space",
      description: "The empty white space where Omori's journey begins",
      type: "Dream"
    },
    {
      id: 2,
      name: "Neighbor's Room",
      description: "A room full of fun and games in the dream world",
      type: "Dream"
    },
    {
      id: 3,
      name: "Faraway Town",
      description: "The real city where the characters live",
      type: "Real world"
    },
    {
      id: 4,
      name: "Black Space",
      description: "A dark and scary version of White Space",
      type: "Nightmare"
    }
  ]


  const createNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      ...noteData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setNotes([...notes, newNote])
    setIsCreatingNote(false)
  }


  const selectNote = (note) => {
    setSelectedNote(note)
    setIsEditingNote(false)
  }

 
  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id 
        ? { ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    ))
    setSelectedNote(updatedNote)
    setIsEditingNote(false)
  }


  const deleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id))
      if (selectedNote && selectedNote.id === id) {
        setSelectedNote(null)
      }
    }
  }


  const clearAllNotes = () => {
    if (window.confirm('Delete all notes? This action cannot be undone!')) {
      setNotes([])
      setSelectedNote(null)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>OMORI FAN WORLD</h1>
        <p>Explore the universe of this game!</p>
      </header>

<nav className="tabs">
  <button 
    className={activeTab === 'home' ? 'active' : ''}
    onClick={() => {
      setActiveTab('home')
      setIsCreatingNote(false)
      setIsEditingNote(false)
    }}
  >
    HOME PAGE
  </button>
  <button 
    className={activeTab === 'characters' ? 'active' : ''}
    onClick={() => {
      setActiveTab('characters')
      setIsCreatingNote(false)
      setIsEditingNote(false)
    }}
  >
    CHARACTERS
  </button>
  <button 
    className={activeTab === 'locations' ? 'active' : ''}
    onClick={() => {
      setActiveTab('locations')
      setIsCreatingNote(false)
      setIsEditingNote(false)
    }}
  >
    LOCATIONS
  </button>
  <button 
    className={activeTab === 'notes' ? 'active' : ''}
    onClick={() => setActiveTab('notes')}
  >
    FAN NOTES
  </button>
  <button 
    className={activeTab === 'account' ? 'active' : ''}
    onClick={() => setActiveTab('account')}
  >
    ACCOUNT
  </button>
</nav>

      
    <div className="app-content">
  {activeTab === 'home' ? (
    <Home />
  ) : activeTab === 'characters' ? (
    <>
      <CharacterList 
        characters={characters}
        onCharacterSelect={setSelectedCharacter}
        selectedCharacter={selectedCharacter}
      />
      <CharacterDetail character={selectedCharacter} />
    </>
  ) : activeTab === 'locations' ? (
    <LocationList locations={locations} />
  ) : activeTab === 'notes' ? (
    <div className="notes-page">
      <div className="notes-page-header">
        <h2 className="fun-notes-title">FUN NOTES</h2>
        <p className="fun-notes-subtitle">Manage your personal Omori fan notes collection</p>
      </div>
      
      <div className="notes-crud-container">
        <div className="notes-sidebar">
          <div className="notes-header">
            <h3>Your Notes ({notes.length})</h3>
            <button 
              className="add-note-btn"
              onClick={() => {
                setIsCreatingNote(true)
                setIsEditingNote(false)
                setSelectedNote(null)
              }}
            >
              + New Note
            </button>
            {notes.length > 0 && (
              <button 
                className="clear-notes-btn"
                onClick={clearAllNotes}
              >
                🗑️ Clear All
              </button>
            )}
          </div>
          
          <NotesList 
            notes={notes}
            onSelectNote={selectNote}
            selectedNote={selectedNote}
            onDeleteNote={deleteNote}
            onEditNote={(note) => {
              setSelectedNote(note)
              setIsEditingNote(true)
            }}
          />
        </div>

        <div className="notes-detail">
          {isCreatingNote ? (
            <CreateNote 
              onCreate={createNote}
              onCancel={() => setIsCreatingNote(false)}
            />
          ) : isEditingNote && selectedNote ? (
            <UpdateNote 
              note={selectedNote}
              onUpdate={updateNote}
              onCancel={() => setIsEditingNote(false)}
            />
          ) : selectedNote ? (
            <NoteDetail 
              note={selectedNote}
              onEdit={() => setIsEditingNote(true)}
              onDelete={() => deleteNote(selectedNote.id)}
            />
          ) : (
            <div className="notes-empty">
              <h3>Select a note or create new one</h3>
              <p>This is your personal space for Omori fan theories, character analysis, and game notes!</p>
              <button 
                className="start-note-btn"
                onClick={() => setIsCreatingNote(true)}
              >
                Start Writing~
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : activeTab === 'account' ? (
    <div className="account-page">
      <div className="account-header">
        <h2>OMORI FAN ACCOUNT</h2>
        <p>Join our community of Omori fans!</p>
      </div>
      <AuthForm />
    </div>
  ) : null}
</div>




      <footer className="app-footer">
        <div className="footer-content">
          <p>Made by Victoria !!</p>
          {activeTab === 'notes' && (
            <p className="footer-stats">
              {notes.length} note{notes.length !== 1 ? 's' : ''} saved
            </p>
          )}
        </div>
      </footer>
    </div>
  )
}

export default App









