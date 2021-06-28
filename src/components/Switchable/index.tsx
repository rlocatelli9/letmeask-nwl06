import React from 'react';
import { shade } from 'polished';
import Switch from "react-switch";
import useTheme from '../../hooks/useTheme';
import { RiLightbulbFlashLine as Bulb} from 'react-icons/ri';

const Switchable: React.FC = () => {
  const {toggleTheme, current} = useTheme()

  return (
    <div className="container">
      <Switch
        onChange={toggleTheme}
        checked={current === 'light'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={15}
        width={40}
        handleDiameter={20}
        offColor={shade(0.20, current === 'light' ? '#988BC7' : '#E1E1E6')}
        onColor={current === 'light' ? '#44475a' : '#988BC7'}

      />
      <Bulb size={25} color={current === 'light' ? '#E7DE79' : '#988BC7'} className={`icon ${current === 'light' ? 'active' : ''}`}/>
    </div>
  )
}

export default Switchable;
