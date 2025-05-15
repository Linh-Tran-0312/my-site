import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  InputGroup,
  ListGroup,
} from 'react-bootstrap';
import Typewriter from 'typewriter-effect';
const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <Container className='w-100'>
     <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(175)
                  .changeDeleteSpeed(50)
                  .typeString(
                    `Hmmm.....`
                  )
                  .start()
                  .pauseFor(1000)
    
              }}
              options={{
                loop: true,
                cursor: '',
              }}
            />
      <ListGroup
        className='mb-3'
        style={{ height: '300px', overflowY: 'auto' }}
      >
        {messages.map((message, index) => (
          <ListGroup.Item key={index}>{message}</ListGroup.Item>
        ))}
      </ListGroup>
      <InputGroup>
        <Form.Control
          type='text'
          placeholder='Type a message...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant='primary' onClick={handleSend}>
          Send
        </Button>
      </InputGroup>
    </Container>
  );
};

export default ChatBox;
