import { useEffect, useState } from "react"

import styles from './Message.module.css'

function Message({msg, type}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if(!msg) {
      setVisible(false)
    }
    setVisible(true)

    const timer = setTimeout(() => {
      setVisible(false)
    }, 3500)

    return () => clearTimeout(timer)
  },[msg])
  return(
    <>
      {visible &&(
        <div className={`${styles.messageConteiner} ${styles[type]}`}>{msg}</div>
      )}
    </>
  )
}

export default Message