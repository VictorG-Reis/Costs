import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { uuid } from "uuidv4"

import styles from './Project.module.css'
import Conteiner from "../layout/Container"
import Message from "../layout/Message"
import ProjectForm from "../project/ProjectForm"
import Loading from "../layout/Loading"

function Project() {
  const {id} = useParams()
  
  const [Service, setService] = useState([])
  const [EditProject, setEditProject] = useState([])
  const [ShowProjectForm, setShowProjectForm] = useState(false)
  const [ShowServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [TypeMessage, setTypeMessage] = useState()


  const createService = (project) => {
    setMessage('')
    const lastService = project.services[project.services.length - 1]
    
    lastService.id = uuid()

    const lastServiceCost = lastService.cost
    
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)


    if(newCost > parseFloat(project.cost)) {
      setMessage('Valor do serviço está acima do orçamento')
      setTypeMessage('error')
      project.services.pop()
      return false
    }

    project.cost = newCost


    fetch(`http://localhost:5000/projects/${project.id}`, {
      method :'PATCH',
      headers:{ 'Content-Type':'application/json'},
      body: JSON.stringify(project)
    })
    .then((resp)=> resp.json())
    .then((data) =>{
      console.log(data)
      setMessage('serviço adicionado com sucesso!')
      setTypeMessage('success')
      if(ShowServiceForm){
        setShowServiceForm(false)
      }
    })
    .catch((err)=> console.log(err))
  }

  function RemoveService(id, cost){
    const servicesUpdate = EditProject.services.filter((Service) => Service.id !== id)
    const projectUpdate = EditProject

    projectUpdate.services = servicesUpdate
    projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
      method: 'PATCH', 
      headers: {'Content-Type': 'application.json'},
      body: JSON.stringify(projectUpdate)
    })
    .then((resp) => resp.json())
    .then(() => {
      setEditProject(projectUpdate)
      setService(servicesUpdate)
      setMessage('Serviço removido com sucesso!')
      setTypeMessage('success')
    })
    .catch((err) => console.log(err))
  }

  function toggleProjectForm(){
    setShowProjectForm(!ShowProjectForm)
  }
  
  function toggleServiceForm(){
    setShowServiceForm(!ShowServiceForm)
  }

  function EditPost(Project){
    setMessage('')

    fetch(` http://localhost:5000/projects/${EditProject.id}`, {
      method: 'PATCH',
      headers:{ 'Content-Type' : 'Application/json'},
      body: JSON.stringify(Project)
    })
    .then((resp)=> resp.json())
    .then((data)=>{
      setEditProject(data)
      setShowProjectForm(false)
      setMessage('Projeto atualizado com sucesso!')
      setTypeMessage('success')
    })
    .catch((err)=> console.log(err))
  }

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/${id}`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
      })
      .then((resp) => resp.json())
      .then((data) => {
        setService(data.service)
        setEditProject(data)
      })
      .catch((erro) => console.log(erro))
    },500)

  }, [id])


  return(
    <>
    {EditProject.text ? (
      <div className={styles.ProjectInfo_Container}>
        <Conteiner custonClass='column'/>
        {Message && <Message msg={message} type={TypeMessage}/>}
         <div className={styles.info_Conteiner}>
            <div className={styles.resolve}>
              <h1>Projeto: {EditProject.text}</h1>
                <button className={styles.btn} onClick={toggleProjectForm}>
                  {!ShowProjectForm? 'Editar projeto':
                  'Fechar'
                  }
                </button>
            </div>
              {!ShowProjectForm? (
                <div className={styles.info_Conteiner} >
                  <p><span>Categoria do Projeto: </span>
                    {EditProject.category.name} </p>
                  <p><span>Valor total do projeto: </span>R${EditProject.budget}</p>
                  <p><span>Valor utilizado no projeto: </span>R${EditProject.cost}</p>
                </div>
                ):(
                  <div className={styles.info_Conteiner}>
                    <ProjectForm handleSubmit={EditPost} btnText='Editar Projeto'  projectData={Project}/>
                  </div>
                )}
          </div>
          <div className={styles.info_Conteiner}>
            <div className={styles.resolve}>
              <h2>Adicionar serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!ShowServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
            </div>
            <div className={styles.info_Conteiner}>
              {ShowServiceForm&&(
                <div>
                  <ServiceForm btnText='Adicione serviço' projectData={EditProject} handleSubmit={createService}/>
                </div>
              )}
            </div>
          </div>
              <h2>Serviços</h2>
            <Conteiner custonClass='start'>
            {Service.length > 0 && 
              Service.map((service)=> (
              <ServiceCard 
              name = {service.name}
              cost ={service.cost}
              description={service.description}
              id={service.id}
              key={service.id}
              handleRemove={RemoveService}
              />   
              
              ))
            }
            {Service.length ===0 && <p>Não há serviços cadastrados  </p>}
            </Conteiner>
          
        <Conteiner/>
      </div>
    ):(
      <Loading/>
    )}
  
  </>
  )
}

export default Project