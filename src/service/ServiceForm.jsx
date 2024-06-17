import { useState } from "react"

import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"

import styles from '../form/Input.module.css'

function ServiceForm({handleSubmit, btnText, projectData}){
  const [Service, setService] = useState({})

  function submit(e){
    e.preventDefault()
    projectData.services.push(Service)
    handleSubmit(projectData)
    

  }

  function handleChange(e){
    setService({...Service, [e.target.name]: e.target.value})
  }


  return(
    <form onSubmit={submit} className={styles.form_container}> 
      <Input
        type='text'
        name='name'
        placeholder='Insira o nome do serviço'
        text='Nome do serviço:'
        handleOnChange={handleChange}
        
        />
      <Input
        type='number'
        name='cost'
        placeholder='Insira o valor do serviço'
        text='Custo do serviço:'
        handleOnChange={handleChange}
        />
      <Input
        type='text'
        name='description'
        placeholder='Descreva o serviço'
        text='Descrição do serviço:'
        handleOnChange={handleChange}
        />
        <SubmitButton text={btnText}/>
    </form>
  )

}

export default ServiceForm