import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import logoImg from '../../assets/logo.svg'
import deleteImg from '../../assets/delete.svg'

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
            <EmptyPage />
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
                    >
                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <img src={deleteImg} alt="Remover pergunta" />
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
