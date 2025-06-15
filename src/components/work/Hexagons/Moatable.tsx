import parse from 'html-react-parser';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './Hexagon.css';

const data = {
  moatable: {
    tooltip: 'View Moatable information',
    modal: {
      title: 'Moatable | Information',
      content:
        "<p>Original name of Moatable is Renren Inc. It changed its name to Moatable on June 22, 2023.</p><p>Over the course of the last decade, Renren sold off its SNS business, divested its used car business, and shifted its business focus to a vertical SaaS model serving B2B customers. The Company's rebranding reflects its business model change from B2C internet to vertical B2B SaaS.</p>",
    },
  },
  loftyWork: {
    tooltip: 'View Project Details',
    modal: {
      title: 'Moatable | LoftyWork',
      content:
        "<p>LoftyWorks is a property management platform that powers customers' portfolio with a fully integrated solution covering supplier, document and list management, compliance monitoring and kanban-style works order processing.</p><p>Tech stack: <ul><li>Cloud-based infrastructure: Amazon Web Services (AWS) </li><li>Database: MySQL</li><li>Back end frameworks: AppSync and Java Spring Boot.</li><li>Front end libraries: React, Vite, Material Design.</li><li>Design tool: Figma.</li><li>Tools: Github, Jira.</li><li>Methodologies: Agile Scrum.</li></ul></p>",
    },
  },
  billingSystem: {
    tooltip: 'View Project Details',
    modal: {
      title: 'Moatable | Billing System',
      content:
        '<p>The Billing System is an internal tool that helps the sales team manage Lofty’s subscriptions.</p><p>Tech stack: <ul><li>Cloud-based infrastructure: Amazon Web Services (AWS) </li><li>Database: MySQL</li><li>Back end frameworks: Java Spring Boot.</li><li>Front end libraries: Vue, Webpack, Chime UI.</li><li>Design tool: Figma.</li><li>Tools: Gitlab, Jira.</li><li>Methodologies: Agile Scrum.</li></ul></p>',
    },
  },
  paymentSDK: {
    tooltip: 'View Project Details',
    modal: {
      title: 'Moatable | Payment SDK',
      content:
        'The Payment SDK is a JavaScript library that enables consumer applications (such as Lofty) to integrate with the Billing service. It provides a set of APIs to manage the card binding process via a secure iframe.<p>Technical details: <ul><li>After initialization, the SDK renders an iframe containing a form that allows users to bind their card information to the Billing System.</li><li>Internally, the SDK uses various APIs from supported payment gateways, such as NP and Stripe.</li></ul></p>',
    },
  },
  myRole: {
    tooltip: 'View my role',
    modal: {
      title: 'Moatable | My Role',
      content:
        '<p>Responsible for frontend development across multiple projects in the Lofty ecosystem, including LoftyWork and the Billing System</p><p>Worked with a range of frontend tools and libraries such as React, Vue, Material UI, Vite, Webpack, and more.</p><p>In addition to feature development, contributed to various enhancements and performance optimizations:<ul><li>Improved React application performance by applying best practices.</li><li>Boosted project quality and team collaboration by establishing coding standards and maintaining technical documentation.</li></ul></p>',
    },
  },
};

type Key = keyof typeof data;
const keys = (Object.keys(data) as Key[]).reduce<Record<Key, Key>>(
  (acc, curr) => {
    acc[curr] = curr;
    return acc;
  },
  {} as Record<Key, Key>
);
function SalesHood() {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState<{ title: string; content: string }>({
    title: '',
    content: '',
  });
  const handleClose = () => setShow(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target && target.id) {
      const targetId = target.id as Key;
      if (data[targetId]) {
        setShow(true);
        setItem(data[targetId]['modal']);
      }
    }
  };
  return (
    <div>
      <Modal show={show} centered onHide={handleClose} className='text-default'>
        <Modal.Header className='bg-default'>
          <strong>{item.title}</strong>
        </Modal.Header>
        <Modal.Body className='bg-default rounded'>
          {parse(item.content)}
        </Modal.Body>
      </Modal>
      <div className='w-100 hex-container' onClick={handleClick}>
        <div className='hex-wrap'>
          <div
            id={keys.myRole}
            title={data[keys.myRole].tooltip}
            className='hex bg-white-1 text-blue-1 pointer'
          >
            My Role
          </div>

          <a
            className='hex pointer'
            title='Visit Official Website'
            href='https://moatable.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='./work/moatable.jpeg' width={'100%'} />
          </a>
          <div
            id={keys.billingSystem}
            title={data[keys.billingSystem].tooltip}
            className='hex bg-blue-1 text-white pointer'
          >
            Billing System
          </div>

          <div
            id={keys.loftyWork}
            className='hex bg-blue-4 text-white pointer'
            title={data[keys.loftyWork].tooltip}
          >
            LoftyWork
          </div>
        </div>
        <div className='hex-wrap'>
          <div
            id={keys.moatable}
            title={data[keys.moatable].tooltip}
            className='hex bg-blue-3 text-white pointer'
          >
            Moatable
          </div>
          <div className='hex hex-empty'></div>
          <div
            id={keys.paymentSDK}
            title={data[keys.paymentSDK].tooltip}
            className='hex bg-white-1 text-blue-1 pointer'
          >
            Payment SDK
          </div>
          <div className='hex hex-empty'></div>
        </div>
      </div>
    </div>
  );
}

export default SalesHood;
