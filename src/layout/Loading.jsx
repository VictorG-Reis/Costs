import styles from './Loading.module.css'

import loadingImg from '../img/loading.svg'

function Loading(){
  return (
    <div className={styles.Loading_Container}>
      <img className={styles.Loading_img} src={loadingImg} alt="loading costs :)" />
    </div>
  )
}


export default Loading