import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { LEAD_API_URL } from '../../config/api';
import { MODE } from './constant';
import { Lead } from './lead';

type GreetingModeProps = {
  setMode: (mode: string) => void;
  onLeadCreated: (lead: Lead) => void;
};

function GreetingMode({ setMode, onLeadCreated }: GreetingModeProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedCompany = company.trim();
    if (!trimmedName || !trimmedCompany) {
      setError('Please fill in both fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(LEAD_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, company: trimmedCompany }),
      });
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data: { leadId: number } = await res.json();
      onLeadCreated({ id: data.leadId, name: trimmedName, company: trimmedCompany });
    } catch {
      setError('Something went wrong — please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='pa-3 border ai-greeting-container'>
      {!showForm && (
        <div className='text-chat'>
          Hello! My name's Sâu (it's pronounced like "Soul"),
          <p>
            I'm a cute cat and an AI assistant living on my owner Linh's portfolio site.
          </p>
          <p>
            Would you like to talk with me? Ask me anything about Linh — his work,
            projects, or experience!
          </p>
        </div>
      )}

      {!showForm ? (
        <div className='d-flex justify-start'>
          <Button
            variant='default'
            className='yes-button'
            onClick={() => setShowForm(true)}
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
      ) : (
        <Form onSubmit={handleSubmit}>
          <p className='text-secondary mb-2'>
            Before we chat, mind sharing who you are?
          </p>
          <Form.Group className='mb-2'>
            <Form.Control
              type='text'
              placeholder='Your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Control
              type='text'
              placeholder='Your company'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Form.Group>
          {error && (
            <Alert variant='danger' className='py-2'>
              {error}
            </Alert>
          )}
          <Button
            type='submit'
            variant='default'
            className='yes-button'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Please wait...' : "Okay, let's talk"}
          </Button>
        </Form>
      )}
    </div>
  );
}

export default GreetingMode;
