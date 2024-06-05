import { Link } from "react-router-dom"
import Conteiner from "./Container"
import logo from '../img/costs_logo.png'

import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar_container}>
      <Conteiner>
        
        <Link to='/'>
          <img src={logo} alt="" />
        </Link>

        <ul className={styles.navbar_ul}>
          <li className={styles.navbar_link}> <Link to="/">Home</Link></li>
          <li className={styles.navbar_link}>Projetos</li>
          <li className={styles.navbar_link}><Link to='/newProject'>Criar projetos</Link></li>
        </ul>

      </Conteiner>
    </nav>
  )
}

export default Navbar