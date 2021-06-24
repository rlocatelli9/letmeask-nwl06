import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button';

import './styles.scss';

import RoomCode from '../../components/RoomCode';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

interface RoomParams {
  id: string;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}>

interface Question {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}


const Room: React.FC = () => {
  const {user} = useAuth();
  const {id} = useParams<RoomParams>()
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`);

    // let count = 0;

    // roomRef.on('child_added', (snap) => {
    //   count++;
    //   console.log('added:', snap.key);
    // });

    roomRef.on('value', room => {
      const {title, questions} = room.val();

      const firebaseQuestions:FirebaseQuestions = questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      })

      setTitle(title)
      setQuestions(parsedQuestions);
    })

  }, [id])

  const handleSendQuestion = useCallback( async (event: FormEvent) => {
    event.preventDefault();

    if(newQuestion.trim() === ''){
      return;
    }

    if(!user){
      throw new Error('Você precisa está logado!')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${id}/questions`).push(question)

    setNewQuestion('')
  }, [id, newQuestion, user])

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div><RoomCode code={`${id}`} /></div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (
            <span>{questions.length} perguntas</span>
          )}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ): (
              <span>Para enviar uma pergunta, <button>faça seu login</button></span>
            )}
            <Button title="Enviar pergunta" type="submit" disabled={!user}/>
          </div>
        </form>

        {JSON.stringify(questions)}
      </main>
    </div>
  );
}

export default Room;
