import { useState } from 'react'
import './App.css'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import LocationList from './components/LocationList'

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [activeTab, setActiveTab] = useState('characters')

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

  return (
    <div className="app">
      <header className="app-header">
        <h1>OMORI FAN WORLD</h1>
        <p>Explore the universe of this game!</p>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'characters' ? 'active' : ''}
          onClick={() => setActiveTab('characters')}
        >
          CHARACTERS
        </button>
        <button 
          className={activeTab === 'locations' ? 'active' : ''}
          onClick={() => setActiveTab('locations')}
        >
          LOCATIONS
        </button>
      </nav>

      <div className="app-content">
        {activeTab === 'characters' ? (
          <>
            <CharacterList 
              characters={characters}
              onCharacterSelect={setSelectedCharacter}
              selectedCharacter={selectedCharacter}
            />
            <CharacterDetail character={selectedCharacter} />
          </>
        ) : (
          <LocationList locations={locations} />
        )}
      </div>
    </div>
  )
}

export default App





























