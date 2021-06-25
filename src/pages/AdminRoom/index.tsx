import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import logoImg from '../../assets/logo.svg'
import answerImg from '../../assets/answer.svg'



import { database } from '../../services/firebase';

import './styles.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';

import Button from '../../components/Button';
import EmptyPage from '../../components/EmptyPage';
import RoomCode from '../../components/RoomCode';
import Question from '../../components/Question';
import Loader from "react-loader-spinner";


interface RoomParams {
  id: string;
}

const AdminRoom: React.FC = () => {
  const {user} = useAuth();
  const history = useHistory()
  const [loading, setLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(true);
  // const [authorRoom, setAuthorRoom] = useState('');
  const {id} = useParams<RoomParams>()
  const {questions, title} = useRoom(id);

  useEffect(() => {
    if(id.trim() === '') {
      return;
    }

    database.ref(`rooms/${id}`).get()
    .then(result => {
      if(!result.exists()) {
        alert('Código da sala é inválido.');
        history.goBack();
      }

      if(result.val().closedAt) {
        alert('A sala foi encerrada!')
        history.goBack();
      }

      // setAuthorRoom(result.val().authorId)
      setIsBlocked(result.val().authorId !== user?.id ? true : false)
      setLoading(false);
    }).catch(error => {
      console.log(error)
    });




    // if(roomRef.val().authorId !== user?.id) {
    //   // alert(`${JSON.stringify(roomRef.val().authorId)} - ${user?.id}`)
    //   return;
    // }

    // setIsBlocked(user?.id !== roomRef.val().authorId ? true : false);
  }, [history, id, isBlocked, user?.id])

  const handleCheckQuestionAsAnswered = useCallback(async (questionId: string) => {
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isAnswered: true
    })
  }, [id])

  const handleHighlightQuestion = useCallback(async (questionId: string) => {
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }, [id])

  const handleDeleteQuestion = useCallback(async (questionId: string) => {
    if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
      await database.ref(`rooms/${id}/questions/${questionId}`).remove()
    }
  }, [id])

  const handleEndRoom = useCallback(async () => {
    await database.ref(`rooms/${id}`).update({
      closedAt: new Date(),
    })

    history.push('/')
  }, [history, id])

  return (
    <div id="page-room">
      {
        loading ? (
            <main className="loading">
              <Loader
                type="Puff"
                color="#835AFD"
                height={120}
                width={120}
                timeout={3000} //3 secs
              />
            </main>
        ) : (
          isBlocked ? (
            <EmptyPage
              titleStrong={"Ops! Parece que o ADM não é você..."}
              paragraph={"Acesse a página de convidado para fazer perguntas."}
              isActiveLogo
              isActiveBtnBack
            />
          ) : (
            <>
              <header>
                <div className="content">
                  <img src={logoImg} alt="Letmeask" />
                  <div className="header-right">
                    <div><RoomCode code={`${id}`} /></div>
                    <Button title="Encerrar aula" type="button" onClick={handleEndRoom}/>
                  </div>
                </div>
              </header>

              <main>
                <div className="room-title">
                  <h1>Sala {title}</h1>
                  {questions.length > 0 && (
                    <span>{questions.length} perguntas</span>
                  )}
                </div>

                <div className="question-list">
                  {questions.map(question => (
                    <Question
                      key={question.id}
                      author={question.author}
                      content={question.content}
                      isAnswered={question.isAnswered}
                      isHighlighted={question.isHighlighted}
                    >
                      <button
                        className={`${question.isAnswered && 'actived-btn'}`}
                        type="button"
                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                        title="Marcar pergunta como respondida"
                      >
                        {/* <img src={checkImg} alt="" /> */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>

                      {!question.isAnswered && (
                        <button
                          type="button"
                          onClick={() => handleHighlightQuestion(question.id)}
                          title="Dar destaque a pergunta"
                        >
                          {/* <img src={answerImg} alt="Dar destaque a pergunta" /> */}
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                      )}

                      <button
                        className="trash-btn"
                        type="button"
                        onClick={() => handleDeleteQuestion(question.id)}
                        title="Remover pergunta"
                      >
                        {/* <img src={deleteImg} alt="Remover pergunta" /> */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 5.99988H5H21" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </Question>
                  ))}
                </div>
              </main>
            </>
          )
        )
      }
    </div>
  );
}

export default AdminRoom;
