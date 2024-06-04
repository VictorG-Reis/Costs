import styles from './Input.module.css'

function Select({name, text, options, value, handleChange}) {
  return(
    <div className={styles.select_container}>
      <label htmlFor={name}>{text}</label>
      <select name={name} id={name} value={value || ''} className={styles.select_box} onChange={handleChange}>
        <options>Escolha uma opção</options>
        {options.map((opps) => (
          <option value={opps.id} key={opps.id}>{opps.name}</option>
          ))}
      </select >
    </div>
  )
}

export default Select