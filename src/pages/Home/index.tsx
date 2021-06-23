import React, { useCallback } from 'react';
import {
  useHistory
} from 'react-router-dom';

import {useAuth} from '../../hooks/useAuth'
import illustrantionImg from '../../assets/illustration.svg'
import logoImg from '../../assets/logo.svg'
import googleIconImg from '../../assets/google-icon.svg'

import './styles.scss'
import Button from '../../components/Button';

const Home: React.FC = () => {
  const history = useHistory();
  const {signIn, user} = useAuth();

  const handleCreteRoom = useCallback(async () => {
    console.info('user: ', user)
    if(!user){
      await signIn();
    }
    history.push('/rooms/new')
  }, [history, signIn, user])

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
          <button className="create-room-btn" onClick={handleCreteRoom}>
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button title="Entrar na sala" type="submit"/>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;
