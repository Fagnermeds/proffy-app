import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars1.githubusercontent.com/u/30529908?s=400&u=d90e713c54d559b135e5ec8b5b62e6b3626718dd&v=4" alt="Fagner Medeiros"/>
        <div>
          <strong>Fagner Medeiros</strong>
          <span>Programação</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnoligias de programação web.
        <br/>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id facere placeat nisi, provident iure fuga sint quaerat.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 20,00</strong>
        </p>
        <button>
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;