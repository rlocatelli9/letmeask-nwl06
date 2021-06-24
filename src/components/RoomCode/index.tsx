import React, { useCallback } from 'react';
import copyImg from '../../assets/copy.svg'

import './styles.scss';

interface RoomCodeProps {
  code: string;
}

const RoomCode: React.FC<RoomCodeProps> = ({code}: RoomCodeProps) => {


  const copyRoomCodeToClipBoard = useCallback(() => {
    navigator.clipboard.writeText(`${code}`)
  }, [code])

  return (
    <div className="room-code" onClick={copyRoomCodeToClipBoard}>
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span>Sala #{code}</span>
    </div>
  );
}

export default RoomCode;
