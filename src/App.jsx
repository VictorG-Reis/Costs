import Home from './Home/Home'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Conteiner from './layout/Container'
import NewProjects from './Home/NewProjects'

function App() {

  return (
    <>
      <Navbar />

      <Conteiner customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/newProject' element={<NewProjects/>}/>
        </Routes>
      </Conteiner>

    </>
  )
}

export default App
