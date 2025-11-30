function CharacterDetail({ character }) {
  if (!character) {
    return (
      <div className="character-detail empty">
        <h2>Choose a character</h2>
        <p>← Click on the character's card to know more about them!</p>
      </div>
    )
  }

  return (
    <div className="character-detail">
      <div className="character-header" style={{ backgroundColor: character.color }}>
        <span className="character-emoji-large">{character.image}</span>
        <h2>{character.name}</h2>
      </div>
      <div className="character-content">
        <div className="info-section">
          <h3>ROLE:</h3>
          <p>{character.role}</p>
        </div>
        <div className="info-section">
          <h3>PERSONALITY:</h3>
          <p>{character.personality}</p>
        </div>
        <div className="info-section">
          <h3>DESCRIBTION:</h3>
          <p>{character.description}</p>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail






