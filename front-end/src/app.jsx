import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { store, persistor } from './utils/store'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Profile from './pages/profile/profile'
import Header from './components/header/header'
import Footer from './components/footer/footer'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
