import styles from './Select.module.css'

function Select({name, text, options, value, handleChange}) {
  return(
    <div className={styles.select_container}>
      <label htmlFor={name}>{text}</label>
      <select name={name} id={name} value={value || options.id}  className={styles.select_box} onChange={handleChange}>
        {options.map((opps) => (
            <option value={opps.id} key={opps.id} >{opps.name}</option>
          ))}
      </select >
    </div>
  )
}

export default Select