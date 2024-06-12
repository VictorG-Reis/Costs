import Styles from './Input.module.css'

function Input({name, handleOnChange, value, placeholder, type}){
  return(
    <div className={Styles.form__group}>
      <input type={type} name={name} onChange={handleOnChange} value={value} placeholder={placeholder} className={Styles.form__field} />
    </div>
  )
}

export default Input