import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import SignUp from './components/SignUp'
import './App.css'

function App() {

  return (
    <div className='Cover'>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path='/new-user' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
