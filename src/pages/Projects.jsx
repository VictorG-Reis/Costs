import { useEffect, useState } from "react"
import Button from "../layout/Button"
import Conteiner from "../layout/Container"
import { useLocation } from "react-router-dom"

function Projects() {
  
  const [projects, setProjects] = useState([])
  const [RemoveLoading, setRemoveLoading] = useState(false)
  const [MessageProject, setMessageProject] = useState('')
  
  const location = useLocation()

  let message = ''
  if(location.state){
    message= location.state.message
  }


  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/projects', {
        method: 'GET',
        headers: {'Content-Type': 'application/json',}
      })
      .then((resp) => resp.json())
      .then((dados) => {
        setProjects(dados)
        setMessageProject(true)
      })
      .catch((err) => console.log(err))
    }, 1000)
  },[])


  const removeProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type' : 'application/json'}
    })
    .then((resp) => resp.json())
    .then((data) => {
      setProjects(projects.filter((project) => project.id !== id))
      setMessageProject('Projeto deletado com sucesso!')
    })
    .catch((err) => console.log(err))
    
  }

  return(
    <div>
      <div>
        <h1>Meus Projetos</h1>
        <Button text='criar projeto' to='/newProject'/>
      </div>

      <Conteiner customClass='start'>


      </Conteiner>
    </div>
  )
}

export default Projects