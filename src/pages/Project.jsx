import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from './Project.module.css';
import Container from "../layout/Container";
import Message from "../layout/Message";
import ProjectForm from "../project/ProjectForm";
import Loading from "../layout/Loading";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";
import { v4 as uuidv4 } from 'uuid';

function Project() {
  const { id } = useParams();
  
  const [services, setServices] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();

  const URL_API = 'https://costs-api.vercel.app/projects';

  useEffect(() => {
    setTimeout(() => {
      fetch(`${URL_API}/${id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data.services);
        setEditProject(data);
      })
      .catch((erro) => console.log(erro));
    }, 500);
  }, [id]);

  const createService = (project) => {
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();
    const lastServiceCost = parseFloat(lastService.cost);

    const newCost = parseFloat(editProject.cost) + lastServiceCost;

    if (newCost > parseFloat(editProject.budget)) {
      setMessage('Valor do serviço está acima do orçamento');
      setTypeMessage('error');
      project.services.pop();
      return false;
    }

    editProject.cost = newCost;
    editProject.services = [...editProject.services, lastService];

    setTimeout(() => {
      fetch(`${URL_API}/${editProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editProject)
      })
      .then((resp) => resp.json())
      .then(() => {
        setMessage('Serviço adicionado com sucesso!');
        setTypeMessage('success');
        if (showServiceForm) {
          setShowServiceForm(false);
        }
      })
      .catch((err) => console.log(err));
    }, 500);
  };

  const removeService = (id, cost) => {
    const servicesUpdate = editProject.services.filter((service) => service.id !== id);
    const projectUpdate = { 
      ...editProject, 
      services: servicesUpdate, 
      cost: parseFloat(editProject.cost) - parseFloat(cost) 
    };

    console.log("Remove Service - Project Update:", projectUpdate);

    fetch(`${URL_API}/${projectUpdate.id}`, {
      method: 'PATCH', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectUpdate)
    })
    .then((resp) => resp.json())
    .then(() => {
      setEditProject(projectUpdate);
      setServices(servicesUpdate);
      setMessage('Serviço removido com sucesso!');
      setTypeMessage('success');
    })
    .catch((err) => console.log(err));
  };

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };
  
  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm);
  };

  const editPost = (project) => {
    setMessage('');

    fetch(`${URL_API}/${editProject.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    })
    .then((resp) => resp.json())
    .then((data) => {
      setEditProject(data);
      setShowProjectForm(false);
      setMessage('Projeto atualizado com sucesso!');
      setTypeMessage('success');
    })
    .catch((err) => console.log(err));
  };

  return (
    <>
      {editProject ? (
        <div className={styles.projectInfoContainer}>
          <Container customClass='column' />
          <div className={styles.messagePosition}>
            {message && <Message msg={message} type={typeMessage} />}
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.resolve}>
              <h1> Projeto: {editProject.text}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
            </div>
            {!showProjectForm ? (
              <div className={styles.infoContainer}>
                <p><span>Categoria do Projeto: </span>{editProject.category?.name || 'Infra'}</p>
                <p><span>Valor total do projeto: </span>R${editProject.budget}</p>
                <p><span>Valor utilizado no projeto: </span>R${editProject.cost}</p>
              </div>
            ) : (
              <div className={styles.infoContainer}>
                <ProjectForm handleSubmit={editPost} btnName='Editar Projeto' projectData={editProject} />
              </div>
            )}
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.resolve}>
              <h2>Adicionar serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
            </div>
            <div className={styles.infoContainer}>
              {showServiceForm && (
                <div>
                  <ServiceForm btnText='Adicione serviço' projectData={editProject} handleSubmit={createService} />
                </div>
              )}
            </div>
          </div>

          <h2>Serviços</h2>
          <div className={styles.servicesContainer}>
            {services.map((service) => (
              <ServiceCard
                name={service.name}
                cost={service.cost}
                description={service.description}
                id={service.id}
                key={service.id}
                handleRemove={removeService}
              />
            ))}
            {services.length === 0 && <p>Não há serviços cadastrados</p>}
          </div>
          <Container />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
