import { Button } from 'react-bootstrap';
import { MODE } from './constant';

function GreetingMode({ setMode, setGreeted }) {
  const handleSayYes = () => {
    setMode(MODE.CHATTING);
    setGreeted(true);
  };
  return (
    <div className='pa-3 border ai-greeting-container'>
      <div className='text-chat'>
        Hello! My name's Sâu (it's pronounced like "Soul"),
        <p>
          I'm a cute cat and an AI assistant, trained on the GPT-4 model by my
          owner, Linh.
        </p>
        <p>
          Would you like to talk with me? You can ask me anything about my owner
          or my capabilities.
        </p>
      </div>
      <div className='d-flex justify-start'>
        <Button variant='default' className='yes-button' onClick={handleSayYes}>
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
    </div>
  );
}

export default GreetingMode;
