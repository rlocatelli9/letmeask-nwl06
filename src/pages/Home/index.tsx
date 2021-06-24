import React, { FormEvent, useCallback, useState } from 'react';
import {
  useHistory
} from 'react-router-dom';

import {useAuth} from '../../hooks/useAuth'
import illustrantionImg from '../../assets/illustration.svg'
import logoImg from '../../assets/logo.svg'
import googleIconImg from '../../assets/google-icon.svg'

import './styles.scss'
import Button from '../../components/Button';
import { database } from '../../services/firebase';

const Home: React.FC = () => {
  const history = useHistory();
  const {signIn, user} = useAuth();
  const [roomCode, setRoomCode] = useState('');

  const handleCreateRoom = useCallback(async () => {
    //TODO: criar try-catch e emitir popup de alerta em caso de erro
    if(!user){
      await signIn();
    }
    history.push('/rooms/new')
  }, [history, signIn, user])

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      alert('Código da sala é inválido.');
      return;
    }


    history.push(`/rooms/${roomCode}`)
  }, [history, roomCode])

  const handleInputChange = useCallback((inputValue) => {
    setRoomCode(inputValue)
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
          <button className="create-room-btn" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Digite o código da sala"
            onChange={event => handleInputChange(event.target.value)}
            value={roomCode}
          />
            <Button title="Entrar na sala" type="submit"/>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;
