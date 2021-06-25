import React, { useCallback } from 'react';
import logoImg from '../../assets/logo.svg'
import emptyQuestionsImg from '../../assets/empty-questions.svg'


import './styles.scss';
import Button from '../Button';
import { useHistory } from 'react-router-dom';

interface EmptyPageProps {
  titleStrong: string;
  paragraph: string;
  isActiveLogo?: boolean;
  isActiveBtnBack?: boolean;
}

const EmptyPage: React.FC<EmptyPageProps> = ({titleStrong, paragraph, isActiveLogo=false, isActiveBtnBack=false}:EmptyPageProps) => {
  const history = useHistory();

  const handleBackButton = useCallback(() => {
    history.goBack();
  }, [history])
  return (
    <main className="empty-questions">
      {isActiveLogo && (
        <div className="room-title">
          <img src={logoImg} alt="Letmeask" />
        </div>
      )}

      <div className="empty">
        <img className="empty-img" src={emptyQuestionsImg} alt="Não há perguntas" />
        <strong>{titleStrong}</strong>
        <p>{paragraph}</p>
      </div>
      {isActiveBtnBack && <Button title="Voltar" type="button" onClick={handleBackButton}/>}
    </main>
  );
}

export default EmptyPage;
