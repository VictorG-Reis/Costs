import { useEffect, useState } from "react"
import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"

import styles from './ProjectForm.module.css'

function ProjectForm({projectData, handleSubmit, btnName}) {
  const [categories, setCategories] = useState([])
  const [projects, setProjects] = useState({projectData})

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
    handleSubmit(projects)
  }

  const handleChange = (e) => {
    setProjects({...projects, [e.target.name] : e.target.value})
  }

  function handleSelect(e){
    setProjects({...projects, category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text
    },
    })
  }


  return(
    <>
      <form onSubmit={submit} className={styles.form_container}>

        <>
          <Input type='text' name='text' placeholder='Insira o nome do projeto' text='Nome do projeto: ' handleOnChange={handleChange} 
          value={projects.name} />

          <Input type='number' name='budget' placeholder='Insira o valor do projeto' text='valor do projeto: ' handleOnChange={handleChange} 
          value={projects.budget? projects.budget:''}/>

          <Select name="project_id" text='Selecione uma opção' handleChange={handleSelect} value={projects.category ? projects.category.id : ''} options={categories} />

          <SubmitButton text={btnName}/>
        </>
      </form>
    
    </>
  )

}

export default ProjectForm