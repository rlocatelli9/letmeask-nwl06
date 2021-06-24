import React, { useCallback } from 'react';
import logoImg from '../../assets/logo.svg'
import emptyQuestions from '../../assets/empty-questions.svg'


import './styles.scss';
import Button from '../Button';
import { useHistory } from 'react-router-dom';

const EmptyPage: React.FC = () => {
  const history = useHistory();

  const handleBackButton = useCallback(() => {
    history.goBack();
  }, [history])
  return (
    <main className="empty-questions">
      <div className="room-title">
        <img src={logoImg} alt="Letmeask" />
      </div>

      <div className="empty">
        <img className="empty-img" src={emptyQuestions} alt="Não há perguntas" />
        <strong>Nenhuma pergunta por aqui...</strong>
        <p>Entre em uma sala inserindo um código válido e comece a responder perguntas!</p>
      </div>
      <Button title="Voltar" type="button" onClick={handleBackButton}/>
    </main>
  );
}

export default EmptyPage;
