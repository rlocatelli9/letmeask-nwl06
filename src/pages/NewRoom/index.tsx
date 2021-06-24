import React, { FormEvent, useCallback, useState } from 'react';
import Button from '../../components/Button';

import illustrantionImg from '../../assets/illustration.svg'
import logoImg from '../../assets/logo.svg'

import './styles.scss';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import firebase from 'firebase';

const NewRoom: React.FC = () => {
  const {user} = useAuth();
  const history = useHistory()
  const [nameNewRoom, setNameNewRoom] = useState('');

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    if(nameNewRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: nameNewRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)

  }, [history, nameNewRoom, user?.id])

  const handleInputChange = useCallback((inputValue) => {
    setNameNewRoom(inputValue)
  }, [])

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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => handleInputChange(event.target.value)}
              value={nameNewRoom}
            />
            <Button  title="Criar sala" type="submit"/>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}

export default NewRoom;
