import Styles from './Input.module.css'

function Input({name, text, handleOnChange, value, placeholder}){
  return(
    <div className={Styles.input_container}>
      <label htmlFor={name}>{text}</label>
      <input type="text" name={name} onChange={handleOnChange} value={value} placeholder={placeholder} className={Styles.input_box} />
    </div>
  )
}

export default Input