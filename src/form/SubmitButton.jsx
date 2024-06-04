import styles from './SubmitButton.module.css'

function SubmitButton({text}){
  return(
    <div>
      <button className={`${styles.submit_container} ${styles.submit_box}` }>{text}</button>
    </div>
  )
}

export default SubmitButton