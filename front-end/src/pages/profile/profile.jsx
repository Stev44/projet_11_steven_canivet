import { useEffect, useState } from 'react'
import Account from '../../components/account/account'
import { baseUrl } from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  setData,
  clearUserName,
  setIsSaved,
  clearSaved,
} from '../../utils/slice'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const token = useSelector((state) => state.auth.token)
  const isConnected = useSelector((state) => state.connexion.isConnected)
  const { firstName, lastName, userName } = useSelector((state) => state.data)
  const isSaved = useSelector((state) => state.save.isSaved)

  useEffect(() => {
    if (!isConnected) {
      navigate('/login')
      console.log(isConnected)
    }
  }, [isConnected, navigate])

  const handleSubmitUserName = async (e) => {
    e.preventDefault()
    if (userName !== '') {
      if (token) {
        const response = await fetch(baseUrl + '/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName: userName }),
        })

        if (response.ok) {
          const data = await response.json()
          setIsEditing(false)
          dispatch(setIsSaved({ isSaved: true }))
          console.log('User name updated successfully:', data)
        } else {
          console.error('Failed to update user name:', response.statusText)
        }
      }
    } else {
      console.log('Entry canceled')
    }
  }
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {isSaved ? userName : `${firstName} ${lastName}`}
        </h1>
        {isEditing ? (
          <form className="edit-form" onSubmit={handleSubmitUserName}>
            <input
              type="text"
              value={userName}
              onChange={(e) => dispatch(setData({ userName: e.target.value }))}
              placeholder="Enter new username"
              required
            />
            <div className="button-wrapper">
              <button className="edit-button" type="submit">
                Save
              </button>
              <button
                className="edit-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="edit-button"
                onClick={() => {
                  dispatch(clearSaved())
                  dispatch(clearUserName())
                }}
              >
                Delete
              </button>
            </div>
          </form>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account />
    </main>
  )
}

export default Profile
