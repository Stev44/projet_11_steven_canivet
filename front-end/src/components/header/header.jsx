import '../../main.css'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsConnected, clearToken } from '../../utils/slice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isConnected = useSelector((state) => state.connexion.isConnected)
  const isSaved = useSelector((state) => state.save.isSaved)
  const { firstName, userName } = useSelector((state) => state.data)

  const handleSignOut = () => {
    dispatch(setIsConnected({ isConnected: false }))
    dispatch(clearToken())
    navigate('/')
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={'/'}>
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {!isConnected ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        ) : (
          <div>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {isSaved && userName !== '' ? userName : firstName}
            </Link>
            <Link className="main-nav-item" onClick={handleSignOut} to="/">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header
