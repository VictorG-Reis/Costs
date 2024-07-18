import { useNavigate } from 'react-router-dom'
import styles from './NewProjects.module.css'
import ProjectForm from '../project/ProjectForm'

function NewProjects() {

  const URL_API = 'https://costs-api.vercel.app/projects'

  const navigate = useNavigate()

  const createPost = (project) => {

    project.cost = 0
    project.services = []

    fetch(URL_API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
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