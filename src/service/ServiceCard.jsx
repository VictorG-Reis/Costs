import styles from './ServiceCard.module.css';
import { BsFillTrashFill } from 'react-icons/bs';

function ServiceCard({ name, cost, description, id, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id, cost);
  };

  return (
    <div className={styles.project_card}>
      <div className={styles.info_card}>
        <h4>{name}</h4>
        <p className={styles.cost}><span>Custo do serviço:</span> R${cost}</p>
        <p className={styles.info_description}>{description}</p>
      </div>
      
      <div className={styles.bntsCards}>
        <button onClick={remove}>
          <BsFillTrashFill />
          Remover 
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;