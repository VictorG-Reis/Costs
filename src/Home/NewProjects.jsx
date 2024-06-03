import styles from './NewProjects.module.css'

function NewProjects() {
  return (
    <div className={styles.formProject_container}>
      <div className={styles.formTitles}>
        <h1>Crie seu novo projeto</h1>
        <p>Crie seu projeto para depois adicionar serviços</p>
      </div>

      <div className={styles.formProject}>
        <p>project form</p>
      </div>

    </div>
  )
}

export default NewProjects