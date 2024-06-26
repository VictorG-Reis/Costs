import { Link } from "react-router-dom"
import Conteiner from "./Container"
import logo from '../img/costs_logo.png'

import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar_container}>
      <Conteiner>
        <div className={styles.imgContainer}>
          <Link to='/'>
            <img src={logo} alt="" />
          </Link>
        </div>
      

        <ul className={styles.navbar_ul}>
          <li className={styles.navbar_link}> <Link to="/">Home</Link></li>
          <li className={styles.navbar_link}> <Link to='/projects'>Projetos</Link></li>
          <li className={styles.navbar_link}><Link to='/newProject'>Criar projetos</Link></li>
        </ul>

      </Conteiner>
    </nav>
  )
}

export default Navbar