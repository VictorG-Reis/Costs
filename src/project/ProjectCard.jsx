import { Link } from "react-router-dom"
import {FaPen, FaTrash} from 'react-icons/fa'

function ProjectCard({id, handleRemove, text, budget, category}) 
{
  const remove = (e) => {
    e.preventDefault()
    handleRemove(id)

  }

  return(
    <div>
      <h4>{text}</h4>
      <p>
        <span>Orçamento:</span> R${budget}
      </p>
      <p>
        <span>{category}</span>
      </p>

      <div>
        <Link to={`/project/${id}`}><FaPen/>Editar</Link>
        <button onClick={remove}><FaTrash/>Remover</button>
      </div>
    </div>
  )
}

export default ProjectCard