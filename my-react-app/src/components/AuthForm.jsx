import { useState } from 'react'
import './AuthForm.css'


function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    favoriteCharacter: '',
    playStyle: 'Casual',
    agreeTerms: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)




  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
      
      if (!formData.favoriteCharacter) {
        newErrors.favoriteCharacter = 'Please select your favorite character'
      }
      
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the terms'
      }
    }
    
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))


    

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    
    if (Object.keys(validationErrors).length === 0) {
      // В реальном приложении здесь был бы запрос к API
      console.log('Form submitted:', formData)
      


      if (!isLogin) {
        const userData = {
          username: formData.username,
          email: formData.email,
          favoriteCharacter: formData.favoriteCharacter,
          playStyle: formData.playStyle,
          joinedDate: new Date().toISOString()
        }
        localStorage.setItem('omori-user', JSON.stringify(userData))
      }
      
      setIsSubmitted(true)
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        favoriteCharacter: '',
        playStyle: 'Casual',
        agreeTerms: false
      })
    } else {
      setErrors(validationErrors)
    }
  }

  const characters = [
    { value: '', label: 'Select character' },
    { value: 'omori', label: 'Omori / Sunny' },
    { value: 'aubrey', label: 'Aubrey' },
    { value: 'kel', label: 'Kel' },
    { value: 'hero', label: 'Hero' },
    { value: 'basil', label: 'Basil' },
    { value: 'mari', label: 'Mari' }
  ]

  const playStyles = [
    { value: 'Casual', label: 'Casual Player' },
    { value: 'Completionist', label: 'Completionist' },
    { value: 'Speedrunner', label: 'Speedrunner' },
    { value: 'LoreHunter', label: 'Lore Hunter' },
    { value: 'Artist', label: 'Fan Artist' }
  ]

  if (isSubmitted) {
    return (
      <div className="auth-success">
        <div className="success-icon">🎮✨</div>
        <h2>Welcome to Headspace!</h2>
        <p>
          {isLogin 
            ? 'You have successfully logged in! Explore the Omori universe.' 
            : 'Your account has been created! Check your email for confirmation.'
          }
        </p>
        <button 
          className="back-to-form"
          onClick={() => {
            setIsSubmitted(false)
            setIsLogin(true)
          }}
        >
          Back to Login
        </button>
      </div>
    )
  }

  return (
    <div className="auth-form-container">
      <div className="auth-header">
        <h2>{isLogin ? 'Welcome Back to Headspace' : 'Join Omori Fan World'}</h2>
        <p>{isLogin ? 'Sign in to your account' : 'Create your fan account'}</p>
      </div>

      <div className="auth-toggle">
        <button
          className={isLogin ? 'active' : ''}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? 'active' : ''}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {/* Username */}
        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {/* Confirm Password (only for register) */}
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>
        )}

        {/* Favorite Character (only for register) */}
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="favoriteCharacter">Favorite Character *</label>
            <select
              id="favoriteCharacter"
              name="favoriteCharacter"
              value={formData.favoriteCharacter}
              onChange={handleChange}
              className={errors.favoriteCharacter ? 'error' : ''}
            >
              {characters.map(char => (
                <option key={char.value} value={char.value}>
                  {char.label}
                </option>
              ))}
            </select>
            {errors.favoriteCharacter && (
              <span className="error-message">{errors.favoriteCharacter}</span>
            )}
          </div>
        )}

        {/* Play Style (only for register) */}
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="playStyle">Play Style</label>
            <select
              id="playStyle"
              name="playStyle"
              value={formData.playStyle}
              onChange={handleChange}
            >
              {playStyles.map(style => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Terms Agreement (only for register) */}
        {!isLogin && (
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className={errors.agreeTerms ? 'error' : ''}
            />
            <label htmlFor="agreeTerms">
              I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a> *
            </label>
            {errors.agreeTerms && (
              <span className="error-message">{errors.agreeTerms}</span>
            )}
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>

        <div className="auth-footer">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button type="button" onClick={() => setIsLogin(false)}>
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button type="button" onClick={() => setIsLogin(true)}>
                Sign in
              </button>
            </p>
          )}
        </div>
      </form>

      {/* Demo credentials */}
      <div className="demo-credentials">
        <h4>Demo Credentials:</h4>
        <p>Email: demo@omori.fan</p>
        <p>Password: omori123</p>
      </div>
    </div>
  )
}

export default AuthForm