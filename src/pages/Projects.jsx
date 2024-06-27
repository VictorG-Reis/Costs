import { useEffect, useState } from "react"
import Button from "../layout/Button"
import Conteiner from "../layout/Container"
//import { useLocation } from "react-router-dom"
import Message from "../layout/Message"
import ProjectCard from "../project/ProjectCard"
import Loading from "../layout/Loading"

import styles from './Projects.module.css'

function Projects() {
  
  const [Projects, setProjects] = useState([])
  const [RemoveLoading, setRemoveLoading] = useState(false)
  const [MessageProject, setMessageProject] = useState(false)
  
  //const location = useLocation()

  // let message = ''
  // if(location.state){
  //   message= location.state.message
  // }


  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/projects', {
        method: 'GET',
        headers:{
        'Content-Type': 'application/json',
        },
      })
      .then((resp) => resp.json())
      .then((dados) => {
        setProjects(dados)
        setRemoveLoading(true)
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
    .then(() => {
      setProjects(Projects.filter((project) => project.id !== id))
      setMessageProject(true)
      setTimeout(() => {
          setMessageProject(false);
        }, 4000);
    })
    .catch((err) => console.log(err))
    
  }

  return(
    <div className={styles.projects_container}>
      <div className={styles.projects_title}>
        <h1>Meus Projetos</h1>
        <Button text='Criar projeto' to='/newProject'/>
      </div>

      <Conteiner customClass='start'>
        <div className={styles.messagePosition}>
        {MessageProject && <Message msg='Projeto deletado com sucesso!' type='success'/>}
        </div>
        {
          Projects.length > 0 &&
          Projects.map((project) => (
            <ProjectCard
            key={project.id}
            text={project.text}
            budget={project.budget}
            category={project.category?.name || 'Infra'}
            id={project.id}
            handleRemove={removeProject}
            />
          ))
        }
        <div className={styles.noProjectMessage}>
          {!RemoveLoading && <Loading/>}
          {RemoveLoading && Projects == 0 && (
            <p >Não há projetos cadastrados</p>
          )}
        </div>
        
      </Conteiner>
    </div>
  )
}

export default Projects