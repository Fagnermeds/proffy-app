import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import optionsSelect from '../../utils/optionsSelect';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';

interface TeachersProps {
  id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: number;
}

const TeacherList = () => {
  const [teachers, setTeachers] = useState<TeachersProps[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const handleSearchTeachers = async (event: FormEvent) => {
    event.preventDefault();

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    setTeachers(response.data);
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
          <Select 
            defaultValue=""
            name="subject" 
            label="Matéria"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            options={optionsSelect.subjects}
          />

          <Select
            defaultValue=""
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(event) => setWeekDay(event.target.value)}
            options={optionsSelect.daysOfTheWeek}
          />

          <Input
            type="time" 
            name="time"
            label="Hora"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map(item => (
          <TeacherItem key={item.id} itemData={item} />
        ))}
      </main>
    </div>
  );
}

export default TeacherList;