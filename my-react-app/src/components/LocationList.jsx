import './LocationList.css'

function LocationList({ locations }) {
  return (
    <div className="location-list">
      <h2>LOCATIONS OF OMORI WORLD</h2>
      <p>Explore the locations of Headspace!</p>
      <div className="locations-container">
        {locations.map(location => (
          <div key={location.id} className="location-card">
            <div className="location-type">{location.type}</div>
            <h3>{location.name}</h3>
            <p>{location.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LocationList






