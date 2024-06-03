import savingsLogo from '../img/savings.svg'
import Button from '../layout/Button'
import styles from './Home.module.css'

function Home() {
  return(
    <section className={styles.home_container}>
      <h1>Bem vindo ao <span>costs!</span></h1>
      <p>faca seu projeto</p>
      <Button to='#' name='criar projeto'/>
      <img src={savingsLogo} alt="logo costs" />
    </section>
  )
}

export default Home