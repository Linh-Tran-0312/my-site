import { useEffect, useRef, useState } from 'react';
import { Accordion, Alert, Spinner } from 'react-bootstrap';
import { ADMIN_LEADS_API_URL } from '../../../config/api';

type LeadMessage = { role: 'user' | 'model'; text: string; createdAt: string };
type LeadWithMessages = {
  id: number;
  name: string;
  company: string;
  createdAt: string;
  messages: LeadMessage[];
};

type Props = {
  password: string;
};

function LeadsSection({ password }: Props) {
  const [leads, setLeads] = useState<LeadWithMessages[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    fetch(ADMIN_LEADS_API_URL, {
      headers: { Authorization: `Bearer ${password}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load leads (status ${res.status})`);
        }
        return res.json();
      })
      .then((data: { leads: LeadWithMessages[] }) => setLeads(data.leads))
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Failed to load leads')
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeKey === null) {
      return;
    }
    const el = scrollRefs.current[activeKey];
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [activeKey]);

  if (error) {
    return <Alert variant='danger'>{error}</Alert>;
  }

  if (!leads) {
    return (
      <div className='d-flex justify-content-center py-4'>
        <Spinner animation='border' />
      </div>
    );
  }

  if (leads.length === 0) {
    return <p className='text-muted'>No one has chatted yet.</p>;
  }

  return (
    <Accordion
      activeKey={activeKey ?? undefined}
      onSelect={(k) => setActiveKey((k as string) ?? null)}
    >
      {leads.map((lead, index) => {
        const key = String(index);
        return (
          <Accordion.Item eventKey={key} key={lead.id}>
            <Accordion.Header>
              <div className='d-flex justify-content-between w-100 me-3'>
                <span>
                  <strong>{lead.name}</strong> — {lead.company}
                </span>
                <span className='text-muted'>
                  {new Date(lead.createdAt).toLocaleString()}
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {lead.messages.length === 0 ? (
                <p className='text-muted'>No messages yet.</p>
              ) : (
                <div
                  ref={(el) => {
                    scrollRefs.current[key] = el;
                  }}
                  style={{ maxHeight: '100vh', overflowY: 'auto' }}
                >
                  {lead.messages.map((message, i) => (
                    <div
                      key={i}
                      className='mb-2 p-2 rounded'
                      style={{
                        background:
                          message.role === 'user' ? '#f1efe9' : '#dceeff',
                        borderLeft: `3px solid ${message.role === 'user' ? '#a1876b' : '#0286f0'}`,
                      }}
                    >
                      <strong
                        style={{
                          color:
                            message.role === 'user' ? '#7a5c3e' : '#0286f0',
                        }}
                      >
                        {message.role === 'user' ? lead.name : 'Sâu'}:
                      </strong>{' '}
                      {message.text}
                      <div className='text-muted' style={{ fontSize: '0.75rem' }}>
                        {new Date(message.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default LeadsSection;
