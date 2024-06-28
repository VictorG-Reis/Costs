import { Link } from "react-router-dom"
import {FaPen, FaTrash} from 'react-icons/fa'

import styles from './ProjectCard.module.css'

function ProjectCard({id,text, budget, category, handleRemove}) {
  const remove = (e) => {
    e.preventDefault()
    handleRemove(id)

  }

  return(
    <div className={styles.project_card}>
      <h4>{text}</h4>
      <p>
        <span>Orçamento:</span> R${budget}
      </p>

      <p className={styles.category_text}>
        <span className={`${styles[category]}`}></span>{category}
      </p>

      <div className={styles.bntsCards}>
        <Link to={`/project/${id}`}><FaPen fontSize="1.3rem"/> Editar </Link>
        <button onClick={remove} ><FaTrash fontSize="1.3rem"/> Remover</button>
      </div> 
    </div>
  )
}

export default ProjectCard