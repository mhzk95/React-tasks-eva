
import './app.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'

function App() {
  return (
    <div className='App'>
      <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
      </Router>
    </div>
  )
}

export default App
