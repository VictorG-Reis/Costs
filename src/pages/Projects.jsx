import { useEffect, useState } from "react"
import Button from "../layout/Button"
import Conteiner from "../layout/Container"
import { useLocation } from "react-router-dom"

function Projects() {


  return(
    <div>
      <div>
        <h1>Meus Projetos</h1>
        <Button text='criar projeto' to='/newProject'/>
      </div>

      <Conteiner customClass='start'>


      </Conteiner>
    </div>
  )
}

export default Projects