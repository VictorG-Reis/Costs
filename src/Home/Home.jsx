import savingsLogo from '../img/savings.svg'
import Button from '../layout/Button'

function Home() {
  return(
    <section>
      <h1>Bem vindo ao <span>costs!</span></h1>
      <p>faca seu projeto</p>
      <Button to='#' name='criar projeto'/>
      <img src={savingsLogo} alt="logo costs" />
    </section>
  )
}

export default Home