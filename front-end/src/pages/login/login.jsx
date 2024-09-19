import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setIsConnected,
  setToken,
  setData,
  setRemember,
  clearRemember,
} from '../../utils/slice'
import { baseUrl } from '../../utils/api'
import '../../main.css'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const rememberedEmail = useSelector((state) => state.remember.email)
  const isConnected = useSelector((state) => state.connexion.isConnected)
  const [email, setEmail] = useState(rememberedEmail || '')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberedEmail !== '')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRememberMe(true)
    }
  }, [rememberedEmail])

  /* redirection page profile si utilisateur connecté */

  useEffect(() => {
    if (isConnected) {
      navigate('/profile')
      console.log(isConnected)
    }
  }, [isConnected, navigate])

  /* fonction de login */

  const logSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(baseUrl + '/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const data = await response.json()
      const token = data.body.token
      console.log(data)

      if (token) {
        dispatch(setToken(token))
        dispatch(setIsConnected({ isConnected: true }))

        const profileResponse = await fetch(baseUrl + '/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        if (profileResponse.ok) {
          const profileData = await profileResponse.json()
          dispatch(
            setData({
              firstName: profileData.body.firstName,
              lastName: profileData.body.lastName,
              userName: profileData.body.userName,
            })
          )

          if (rememberMe) {
            dispatch(setRemember({ rememberMe: true, email }))
          } else {
            dispatch(clearRemember())
          }
        } else {
          console.error('Token not found')
        }
      } else {
        console.error('Login failed')
      }
    } else {
      setError(true)
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={logSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
          {error && <div className="error">Email ou mot de passe invalide</div>}
        </form>
      </section>
    </main>
  )
}

export default Login
