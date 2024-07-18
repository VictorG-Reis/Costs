import savingsLogo from '../img/savings.svg'
import Button from '../layout/Button'
import styles from './Home.module.css'

function Home() {
  return(
    <section className={styles.home_container}>
      <div className={styles.home_infos}>
        <h1>Bem vindo ao <span>costs!</span></h1>
        <p>Faça o planejamento de custos dos seus projetos</p>
        <Button to='/newProject' text='Criar projeto'/>
      </div>
      <div className={styles.home_image}>
        <img src={savingsLogo} alt="logo costs" />
      </div>
    </section>
  )
}

export default Home