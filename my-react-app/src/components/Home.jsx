import { useEffect, useState } from 'react'
import lamp from '../images/lamp.jpg'
import wecome from '../images/welcome.jpg'
import './Home.css'


function Home() {
  const [showImages, setShowImages] = useState(false)

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowImages(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="home-page">
      <div className="home-images-container">
        {}

        {}
        <div className={`home-image-wrapper ${showImages ? 'show' : ''}`} style={{ animationDelay: '0.5s' }}>
          <img 
            src= {lamp}
            alt="Omori Logo" 
            className="lamp-image"
          />
        </div>
        

        <div className={`home-image-wrapper ${showImages ? 'show' : ''}`} style={{ animationDelay: '0.5s' }}>
          <img 
            src= {wecome}
            alt="Omori Logo" 
            className="welcome-image"
          />
        </div>
      </div>


    <div className={`welcome-text-container ${showImages ? 'show' : ''}`} style={{ animationDelay: '0.8s' }}>
          <h1 className="welcome-title">Welcome to OMORI FAN WORLD~</h1>
          <p className="welcome-subtitle">
            Explore the characters, locations, and the delicate line between dream and reality.
          </p>
          <p className="welcome-description">
            A space for fans to connect and discover.
          </p>
        </div>

        <div className={`contacts-text-container ${showImages ? 'show' : ''}`} style={{ animationDelay: '0.8s' }}>
          <h1 className="contacts">CONTACTS~</h1>
          <p className="contacts-subtitle">
            +996 550 045 571
            @ivaschenko_v@iuca.kg

          </p>
      
        </div>

    </div>
  )
}



export default Home