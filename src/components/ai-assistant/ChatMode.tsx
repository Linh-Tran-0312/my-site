import {
  faChevronDown,
  faFileArrowDown,
  faPaw,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Typewriter from 'typewriter-effect';
import { CHAT_API_URL } from '../../config/api';
import Cat from './Cat';
import { MODE } from './constant';
import { Lead } from './lead';

const hozCatSrc = {
  static: `${import.meta.env.BASE_URL}chat/static-cat-2.png`,
  active: `${import.meta.env.BASE_URL}chat/active-cat-2.png`,
};

const MAX_HISTORY_MESSAGES = 10;

type ChatRole = 'user' | 'model';
type Attachment = { type: 'file'; url: string; fileName: string };
type ChatMessage = {
  role: ChatRole;
  text: string;
  time: string;
  attachment?: Attachment;
};

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const ChatBox: React.FC<{ setMode: (mode: string) => void; lead: Lead }> = ({
  setMode,
  lead,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const history = messages.slice(-MAX_HISTORY_MESSAGES);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed, time: formatTime() },
    ]);
    setInput('');
    setIsLoading(true);
    setIsInputFocused(false);

    try {
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history, leadId: lead.id }),
      });
      if (!res.ok) {
        throw new Error(`Chat request failed with status ${res.status}`);
      }
      const data: { reply?: string; attachment?: Attachment } =
        await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: data.reply ?? "Meow? I couldn't think of a reply.",
          time: formatTime(),
          attachment: data.attachment,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: 'Sâu is napping right now, try again in a bit!',
          time: formatTime(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
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
          <Cat
            src={hozCatSrc}
            width={100}
            forceActive={isInputFocused && !isLoading}
          />
        </div>
        <div className='ai-chat-header d-flex justify-content-between align-items-center'>
          <div style={{ width: 300 }}>
            {isLoading ? (
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
            ) : (
              <span className='text-muted'>Ask me anything about Linh!</span>
            )}
          </div>
          <div className='d-flex'>
            <Button
              size='sm'
              variant='light'
              className='ai-chat-hide-btn'
              onClick={() => setMode(MODE.SLEEPING)}
              title='Hide chat'
            >
              <Icon icon={faChevronDown} fontSize={12} />
            </Button>
          </div>
        </div>
      </div>
      <div className='ai-chat-body'>
        <div className='ai-chat-messages'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`ai-msg-row ${message.role === 'user' ? 'ai-msg-row--user' : 'ai-msg-row--bot'}`}
            >
              {message.role === 'model' && (
                <div className='ai-msg-avatar'>
                  <Icon icon={faPaw} />
                </div>
              )}
              <div className='ai-msg-col'>
                <div
                  className={`ai-msg-bubble ${message.role === 'user' ? 'ai-msg-bubble--user' : 'ai-msg-bubble--bot'}`}
                >
                  {message.text}
                </div>
                {message.attachment && (
                  <a
                    className='ai-attachment-card'
                    href={message.attachment.url}
                    download={message.attachment.fileName}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Icon icon={faFileArrowDown} className='me-2' />
                    <span className='ai-attachment-name'>
                      {message.attachment.fileName}
                    </span>
                  </a>
                )}
                <div className='ai-msg-time'>{message.time}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className='d-flex'>
          <InputGroup className='flex-grow-1'>
            <FormControl
              type='text'
              ref={inputRef}
              className='ai-chat-input'
              placeholder='Say something hooman...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              disabled={isLoading}
            />
          </InputGroup>
          <Button
            variant='light'
            onClick={handleSend}
            className='ms-2'
            disabled={isLoading || !input.trim()}
          >
            <Icon icon={faPaw} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
