import Styles from './Input.module.css'

function Input({name, handleOnChange, value, placeholder}){
  return(
    <div className={Styles.form__group}>
      <input type="text" name={name} onChange={handleOnChange} value={value} placeholder={placeholder} className={Styles.form__field}  required/>
    </div>
  )
}

export default Input