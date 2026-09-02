import { useEffect, useState } from 'react';
import './AiAssistant.css';
import Cat from './Cat';
import ChatBox from './ChatMode';
import GreetingMode from './GreetingMode';
import { MODE } from './constant';
import { Lead, loadStoredLead, storeLead } from './lead';

const verCatSrc = {
  static: `${import.meta.env.BASE_URL}chat/static-cat-1.png`,
  active: `${import.meta.env.BASE_URL}chat/active-cat-1.gif`,
};

// Matches the Welcome overlay's `slideUp` animation duration (see Loading.css).
const WELCOME_ANIMATION_MS = 2500;
const BLINK_OPEN_MS = 500;
const BLINK_CLOSE_MS = 350;
const BLINK_COUNT = 2;

function AiAssistant() {
  const [mode, setMode] = useState(MODE.SLEEPING);
  const [lead, setLead] = useState<Lead | null>(() => loadStoredLead());
  const [isBlinking, setIsBlinking] = useState(false);

  const handleLeadCreated = (newLead: Lead) => {
    storeLead(newLead);
    setLead(newLead);
    setMode(MODE.CHATTING);
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = WELCOME_ANIMATION_MS;
    for (let i = 0; i < BLINK_COUNT; i++) {
      timers.push(setTimeout(() => setIsBlinking(true), t));
      t += BLINK_OPEN_MS;
      timers.push(setTimeout(() => setIsBlinking(false), t));
      t += BLINK_CLOSE_MS;
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleClick = () => {
    if (mode === MODE.SLEEPING) {
      if (lead) {
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
      {lead ? (
        <div className={mode === MODE.CHATTING ? '' : 'd-none'}>
          <ChatBox setMode={setMode} lead={lead} />
        </div>
      ) : null}
      {mode === MODE.GREETING ? (
        <GreetingMode setMode={setMode} onLeadCreated={handleLeadCreated} />
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
            src={`${import.meta.env.BASE_URL}chat/star.png`}
            className={mode === MODE.SLEEPING ? 'ai-star-icon' : 'd-none'}
          />
          <Cat width={70} src={verCatSrc} forceActive={isBlinking} />
        </div>
      ) : null}
    </>
  );
}

export default AiAssistant;
