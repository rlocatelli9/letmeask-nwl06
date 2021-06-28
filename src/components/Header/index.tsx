import React, { useCallback } from 'react';
import logoImg from '../../assets/logo.svg';
import logoDarkImg from '../../assets/logo-dark.svg';

import RoomCode from '../../components/RoomCode';
import Button from '../../components/Button';

import { database } from '../../services/firebase';
import { useHistory } from 'react-router-dom';

import './styles.scss';
import useTheme from '../../hooks/useTheme';
import Switchable from '../Switchable';

interface HeaderProps {
  roomId: string;
  isAdminPage?: boolean
}

const Header: React.FC<HeaderProps> = ({roomId, isAdminPage=false}: HeaderProps) => {
  const {current, toggleTheme} = useTheme()
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
        <img src={current === 'light' ? logoDarkImg : logoImg} alt="Letmeask" />
        <Switchable />
        <div className="header-right">
          <div><RoomCode code={`${roomId}`} /></div>
          {isAdminPage && <Button title="Encerrar aula" type="button" onClick={handleEndRoom}/>}
        </div>
      </div>
    </header>
  )
}

export default Header;
