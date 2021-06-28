import React, { useCallback } from 'react';
import logoImg from '../../assets/logo.svg';

import RoomCode from '../../components/RoomCode';
import Button from '../../components/Button';

import { database } from '../../services/firebase';
import { useHistory } from 'react-router-dom';

import './styles.scss';

interface HeaderProps {
  roomId: string;
  isAdminPage?: boolean
}

const Header: React.FC<HeaderProps> = ({roomId, isAdminPage=false}: HeaderProps) => {
  const history = useHistory()

  const handleEndRoom = useCallback(async () => {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    })

    history.push('/')
  }, [history, roomId])

  return (
    <header>
      <div className="content">
        <img src={logoImg} alt="Letmeask" />
        <div className="header-right">
          <div><RoomCode code={`${roomId}`} /></div>
          {isAdminPage && <Button title="Encerrar aula" type="button" onClick={handleEndRoom}/>}
        </div>
      </div>
    </header>
  )
}

export default Header;
