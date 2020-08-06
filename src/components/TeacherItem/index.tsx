import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import api from '../../services/api';

interface TeacherItemProps {
  itemData: {
    id: string;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
    subject: string;
    cost: number;
  } 
}

const TeacherItem: React.FC<TeacherItemProps> = ({ itemData }) => {
  const createNewConnection = async () => {
    await api.post('/connections', {
      user_id: itemData.id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={itemData.avatar} alt={itemData.name}/>
        <div>
          <strong>{itemData.name}</strong>
          <span>{itemData.subject}</span>
        </div>
      </header>

      <p>{itemData.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{itemData.cost}</strong>
        </p>
        <a 
          onClick={createNewConnection}
          href={`https://wa.me/5508396183212`}
        >
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;