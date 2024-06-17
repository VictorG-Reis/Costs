import Home from './pages/Home'
import NewProjects from './pages/NewProjects'
import Projects from './pages/Projects'
import Navbar from './layout/Navbar'
import Conteiner from './layout/Container'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Project from './pages/Project'


function App() {

  return (
    <>
      <Navbar />

      <Conteiner customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/newProject' element={<NewProjects/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/project/:id' element={<Project/>}/>
        </Routes>
      </Conteiner>

    </>
  )
}

export default App
