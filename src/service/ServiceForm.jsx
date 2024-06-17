import { useState } from "react"

import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"

import styles from '../form/Input.module.css'
import Message from "../layout/Message"

function ServiceForm({handleSubmit, btnText, projectData}){
  const [Service, setService] = useState({})
  const [emptyImput, setEmptyImput] = useState(false)

  function submit(e){
    e.preventDefault()
    if(Service.name == null ||
      Service.cost == null ||
      Service.cost.length == 0) {
      return setEmptyImput(true)
      
    }
    projectData.services.push(Service)
    handleSubmit(projectData)
    

  }

  function handleChange(e){
    setService({...Service, [e.target.name]: e.target.value})
    setEmptyImput(false)
      console.log(Service);
  }


  return(
    <form onSubmit={submit} className={styles.form_container}> 
    <div className={styles.messagePosition}>
        {emptyImput && <Message type='error' msg='Preencha os campos vazio'/>}
      </div>
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