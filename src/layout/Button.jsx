import { Link } from "react-router-dom"

import styles from './Button.module.css'

function Button({to, name}){
  return(
    <Link className={styles.bnt_container} to={to}>{name}</Link>
  )
}

export default Button