import { useNavigate } from 'react-router-dom'
import styles from './NewProjects.module.css'
import ProjectForm from '../project/ProjectForm'

function NewProjects() {

  const navigate = useNavigate()

  const createPost = (project) => {

    project.cost = 0
    project.services = []

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then((resp) => resp.json())
    .then(console.log(project))
    .then(navigate('/projects', { state: {message: 'Projeto criado com sucesso!'} }))
    .catch((err) => console.log(err))
  }

  return (
    <div className={styles.formProject_container}>

      <div className={styles.formProject}>
        <ProjectForm handleSubmit={createPost} btnName='Criar projeto'/>
      </div>

    </div>
  )
}

export default NewProjects