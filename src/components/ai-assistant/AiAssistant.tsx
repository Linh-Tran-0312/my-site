import { useState } from 'react';
import './AiAssistant.css';
import Cat from './Cat';
import ChatBox from './ChatMode';
import GreetingMode from './GreetingMode';
import { MODE } from './constant';

const verCatSrc = {
  static: 'chat/static-cat-1.png',
  active: 'chat/active-cat-1.gif',
};

function AiAssistant() {
  const [mode, setMode] = useState(MODE.SLEEPING);
  const [greeted, setGreeted] = useState(false);

  const handleClick = () => {
    if (mode === MODE.SLEEPING) {
      if (greeted) {
        setMode(MODE.CHATTING);
      } else {
        setMode(MODE.GREETING);
      }
      return;
    }
    if (mode === MODE.GREETING || mode === MODE.CHATTING) {
      setMode(MODE.SLEEPING);
    }
  };

  return (
    <>
      {mode === MODE.CHATTING ? <ChatBox setMode={setMode} /> : null}
      {mode === MODE.GREETING ? (
        <GreetingMode setMode={setMode} setGreeted={setGreeted} />
      ) : null}

      {[MODE.SLEEPING, MODE.GREETING].includes(mode) ? (
        <div
          className='assistant-button pointer'
          onClick={handleClick}
          title='Cuddle me'
          role='button'
        >
          <img
            width={30}
            src='chat/star.png'
            className={mode === MODE.SLEEPING ? 'ai-star-icon' : 'd-none'}
          />
          <Cat width={70} src={verCatSrc} />
        </div>
      ) : null}
    </>
  );
}

export default AiAssistant;
