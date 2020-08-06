import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import warningIcon from '../../assets/images/icons/warning.svg';
import optionsSelect from '../../utils/optionsSelect';
import api from '../../services/api';

import './styles.css';

interface ScheduleProps {
  week_day: string;
  from: string;
  to: string;
}

const TeacherForm = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleProps[]>([
    { week_day: '', from: '', to: '' },
  ]);
  
  const history = useHistory();

  const addNewScheduleItem = () => {
    const newScheduleItem = { week_day: '', from: '', to: '' };
    
    setScheduleItems([
      ...scheduleItems,
      newScheduleItem,    
    ])
  };

  const changeScheduleItem = (itemPosition: number, key: string, value: string) => {
    const updatedSchedule = scheduleItems.map((item, index) => {
      if (itemPosition === index) {
        return {
          ...item,
          [key]: value,
        }
      }

      return item;
    }); 

    setScheduleItems(updatedSchedule);
  }

  const handleCreateClass = (event: FormEvent) => {
    event.preventDefault();

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    }).then(() => {
      alert('Cadastro realizado com sucesso!');

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro!');
    });
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>         
            <Input 
              name="name" 
              label="Nome completo" 
              value={name} 
              onChange={(event) => setName(event.target.value)} 
            />

            <Input 
              name="avatar" 
              label="Avatar"
              value={avatar}
              onChange={(event) => setAvatar(event.target.value)}
            />

            <Input 
              name="whatsapp" 
              label="Whatsapp"
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
            />
            
            <Textarea 
              name="bio" 
              label="Biografia" 
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            
            <Select 
              name="subject" 
              label="Matéria"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              options={optionsSelect.subjects}
            />
            <Input 
              name="cost" 
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
            />
    
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((item, index) => (
              <div key={index} className="schedule-item">
                <Select 
                  name="week_day"
                  label="Dia da semana"
                  value={item.week_day}
                  onChange={(event) => changeScheduleItem(index, 'week_day', event.target.value)}
                  options={optionsSelect.daysOfTheWeek}
                />

                <Input 
                  name="from" 
                  label="Das" 
                  type="time"
                  value={item.from}
                  onChange={(event) => changeScheduleItem(index, 'from', event.target.value)} 
                />
                <Input 
                  name="to" 
                  label="Até" 
                  type="time"
                  value={item.to} 
                  onChange={(event) => changeScheduleItem(index, 'to', event.target.value)} 
                />
              </div>
            ))}
          </fieldset>
       
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante"/>
              Importante! <br />
              Preencha todos os dados.
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
} 

export default TeacherForm;