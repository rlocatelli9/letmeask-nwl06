import React from 'react';
import Button from '../../components/Button';

import illustrantionImg from '../../assets/illustration.svg'
import logoImg from '../../assets/logo.svg'

import './styles.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const NewRoom: React.FC = () => {
  const {user} = useAuth();
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrantionImg} alt="Ilustração simbolizando perguntas e respostas"/>
        <strong>Crie sala de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma sala</h2>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button  title="Entrar na sala" type="submit"/>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}

export default NewRoom;
