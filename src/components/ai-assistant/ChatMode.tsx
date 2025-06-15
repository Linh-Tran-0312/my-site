import {
  faPaw,
  faUpRightAndDownLeftFromCenter,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import Typewriter from 'typewriter-effect';
import Cat from './Cat';
import { MODE } from './constant';

const hozCatSrc = {
  static: 'chat/static-cat-2.png',
  active: 'chat/active-cat-2.png',
};
const ChatBox: React.FC<{ setMode: (mode: string) => void }> = ({
  setMode,
}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className='ai-chat-container'>
      <div className='position-relative d-flex flex-column'>
        <div
          className='ai-chat-cat'
          onClick={() => setMode(MODE.SLEEPING)}
          title='Bye'
        >
          <Cat src={hozCatSrc} width={100} />
        </div>
        <div className='d-flex justify-space-between align-items-center'>
          <div style={{ width: 300 }}>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(175)
                  .changeDeleteSpeed(50)
                  .typeString(`Hmmm.....`)
                  .start()
                  .pauseFor(1000);
              }}
              options={{
                loop: true,
                cursor: '',
              }}
            />
          </div>
          <div className='d-flex'>
            <Button size='sm' variant='light'>
              <Icon icon={faUpRightAndDownLeftFromCenter} />
            </Button>
            <Button
              size='sm'
              variant='light'
              className='ms-2'
              onClick={() => setMode(MODE.SLEEPING)}
            >
              <Icon icon={faXmark} />
            </Button>
          </div>
        </div>
      </div>
      <div className='w-100 d-flex flex-column justify-space-between'>
        <ListGroup
          className='mb-3'
          style={{ height: '300px', overflowY: 'auto' }}
        >
          {messages.map((message, index) => (
            <ListGroup.Item key={index}>{message}</ListGroup.Item>
          ))}
        </ListGroup>
        <div className='d-flex'>
          <InputGroup className='flex-grow-1'>
            <FormControl
              type='text'
              placeholder='Say something hooman...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </InputGroup>
          <Button variant='light' onClick={handleSend} className='ms-2'>
            <Icon icon={faPaw} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
