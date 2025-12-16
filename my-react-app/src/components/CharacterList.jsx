import './CharacterList.css'

function CharacterList({ characters, onCharacterSelect, selectedCharacter }) {
  return (
    <div className="character-list">
      <h2>CHARACTERS</h2>
      <div className="characters-grid">
        {characters.map(character => (
          <div
            key={character.id}
            className={`character-card ${selectedCharacter?.id === character.id ? 'selected' : ''}`}
            onClick={() => onCharacterSelect(character)}
            style={{ borderLeftColor: character.color }}
          >
            <div className="character-emoji">{character.image}</div>
            <div className="character-info">
              <h3>{character.name}</h3>
              <p>{character.role}</p>
              <span className="personality">{character.personality}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CharacterList



