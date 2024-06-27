import { useEffect, useState } from "react"
import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"

import styles from './ProjectForm.module.css'
import Message from "../layout/Message"

function ProjectForm({projectData, handleSubmit, btnName}) {
  const [categories, setCategories] = useState([])
  const [projects, setProjects] = useState({projectData})
  const [emptyImput, setEmptyImput] = useState(false)
  

  useEffect(()=>{
    fetch('http://localhost:5000/categories', {
      headers:{'Content-Type': 'application/json'},
      method: 'GET',
    })
    .then((resp) => resp.json())
    .then((dados) => setCategories(dados))
    .then((err) => console.log(err))
  },[])


  const submit = (e) =>{
    e.preventDefault()
    if(projects.text == null ||
      projects.budget == null ||
      projects.budget.length == 0) {
      return setEmptyImput(true)
      
    }
    handleSubmit(projects)
  }

  const handleChange = (e) => {
    setProjects({...projects, [e.target.name] : e.target.value})
    setEmptyImput(false)
  }

  function handleSelect(e){
    if(e.target.value == null) {
      setProjects({...projects, category: {
      id: e.target.value,
      name: 'Infra'
    },
    })
    }else{
    setProjects({...projects, category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text
    },
    })
    }
  }


  return(
    <>
      <div className={styles.messagePosition}>
        {emptyImput && <Message type='error' msg='Preencha os campos vazios'/>}
      </div>

      <form onSubmit={submit} className={styles.form_container}>

        <div className={styles.form_inputs}>
          <h1>Seu novo projeto</h1>
          <p>Crie seu projeto para depois adicionar serviços</p>

          <Input type='text' name='text' placeholder='Insira o nome do projeto' text='Nome do projeto' handleOnChange={handleChange} 
          value={projects.name} />

          <Input type='number' name='budget' placeholder='Insira o Valor do projeto' text='Valor do projeto' handleOnChange={handleChange} 
          value={projects.budget? projects.budget:''}/>

          <Select name="project_id" text='Selecione uma opção:' handleChange={handleSelect} value={projects.category? projects.category.id : ''} options={categories}  />

          <SubmitButton text={btnName}/>
        </div>
      </form>
    
    </>
  )

}

export default ProjectForm