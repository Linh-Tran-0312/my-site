import React, { useState } from 'react';
import ChatBox from './ChatBox';
import './AiAssistant.css';
import { Button } from 'react-bootstrap';
const src =
  'https://cdn.pixabay.com/animation/2024/07/19/00/09/00-09-13-492_512.gif';
const srcActive =
  'https://cdn.pixabay.com/animation/2024/07/19/00/09/00-09-35-674_512.gif';
const MODE = {
  SLEEPING: 'sleeping',
  GREETING: 'greeting',
  CHATTING: 'chatting',
  BYE: 'bye',
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
  const handleSayYes = () => {
    setMode(MODE.CHATTING);
    setGreeted(true);
  };
  return (
    <div className=''>
      {![MODE.BYE, MODE.SLEEPING].includes(mode) ? (
        <div
          className={`chat-container border ${mode === MODE.CHATTING ? 'active-chat' : ''}`}
        >
          <div className='position-relative'>
            <div
              className={mode === MODE.CHATTING ? 'cat-active-chat' : 'd-none'}
              onClick={() => setMode(MODE.SLEEPING)}
              title='Bye'
            >
              <img src={srcActive} width={100} alt='cat-image' />
            </div>

            {mode === MODE.CHATTING ? (
              <ChatBox />
            ) : (
              <>
                <div>
                  Hello! My name's Sâu (it's pronounced like "Soul"),
                  <p>
                    I'm a cute cat and an AI assistant, trained on the GPT-4
                    model by my boss Linh
                  </p>
                  <p>
                    Would you like to talk with me? You can ask me anything
                    about my boss or my capabilities.
                  </p>
                </div>
                <div className='d-flex justify-start'>
                  <Button
                    variant='default'
                    className='yes-button'
                    onClick={handleSayYes}
                  >
                    Yes, I love it
                  </Button>
                  <Button
                    variant='default'
                    className='mx-2'
                    onClick={() => setMode(MODE.BYE)}
                  >
                    No, I don't like cat
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}

      {![MODE.BYE, MODE.CHATTING].includes(mode) ? (
        <div
          className='assistant-button pointer'
          onClick={handleClick}
          title='Cuddle me'
        >
          <img src={src} width={70} alt='terminal' />
        </div>
      ) : null}
    </div>
  );
}

export default AiAssistant;
