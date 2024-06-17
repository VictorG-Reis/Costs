import styles from '../project/ProjectCard.module.css'

import {BsFillTrashFill} from 'react-icons/bs'


function ServiceCard({name, cost, description, id, handleRemove}){

  const remove = (e)=>{
    e.preventDefault()
    handleRemove(id, cost)
  }

  return(
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p><span>Custo do serviço</span> R$ {cost}</p>
      
      <p>{description}</p>
      <div className={styles.bntsCards}>
        <button onClick={remove}>
          <BsFillTrashFill/>
          Remover 
        </button>
      </div>

    
    </div>
  )
}

export default ServiceCard