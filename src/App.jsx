import Home from './Home/Home'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Conteiner from './layout/Container'

function App() {

  return (
    <>
      <Navbar />

      <Conteiner customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Conteiner>

    </>
  )
}

export default App
