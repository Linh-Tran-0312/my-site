import parse from 'html-react-parser';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './Hexagon.css';

const data = {
  saleshood: {
    tooltip: 'View SalesHood information',
    modal: {
      title: 'SalesHood | Information',
      content:
        '<p>SalesHood was founded in May 2013 by Elay Cohen and Arthur Do. The company is based in San Francisco, California</p><p></p>',
    },
  },
  clientSite: {
    tooltip: 'View Client Sites functionalities',
    modal: {
      title: 'SalesHood | Client Sites',
      content:
        '<p>Client Sites in one of the primary features in SalesHood product, which enahnces sales performance by working as digital sales rooms.</p><ul><li>Sell how buyers want to buy. </li><li>Empower your sellers to create Digital Sales Rooms, complete with mutual plans, call notes, and AI content recommendations.</li> <li>Report on which buyers are engaged and how much pipeline is influenced. </li></ul>',
    },
  },
  tech: {
    tooltip: 'View tech-stack of the product',
    modal: {
      title: 'SalesHood | Tech Stacks',
      content:
        '<ul><li>Cloud-based infrastructure: Amazon Web Services (AWS) </li><li>Database: MySQL</li><li>Back end frameworks: Ruby on Rails, Hanami (Ruby language).</li><li>Front end libraries: React, Redux, React Query, Ant Design.</li><li>Design tool: Figma.</li><li>Development environments: Docker, Nix.</li><li>Tools: Bitbucket, Jira, Jenkins.</li><li>Methodologies: Agile Scrum.</li></ul>',
    },
  },
  myRole: {
    tooltip: 'View my role',
    modal: {
      title: 'SalesHood | My Role',
      content:
        '<p>Focusing on Frontend development, get hands-on experience on: Typescript, React, Redux, React Query, Axios, Ant Design, Storybook, Jest, Testing Library, Playwright, Figma.</p><p>Developed and maintained Client Sites - a micro frontend project, optimized performance using code splitting, lazy loading, reducing bundle size and improving page load time.</p><p>Contribute to UI kit development.</p>',
    },
  },
  product: {
    tooltip: 'View product details',
    modal: {
      title: 'SalesHood | Product',
      content:
        "<p>SalesHood's platform includes these main features: </p><p><strong>Sales Content:</strong> Organize sales content in one place and measure revenue impact.</p><p><strong>Client Site-Digital Sales Rooms:</strong> Empower sellers to create Digital Sales Rooms, complete with mutual plans, and AI content recommendations</p><p><strong>Coaching:</strong> Scale pitch practice and messaging alignment with AI-powered video role-playing.</p><p><strong>Training:</strong> Create personalized Learning Paths for onboarding and ongoing training.</p>",
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
          {/* <div className='hex hex-empty'></div> */}
          <div
            id={keys.myRole}
            title={data[keys.myRole].tooltip}
            className='hex bg-blue-2 text-white pointer'
          >
            My Role
          </div>

          <div title='Visit Official Website' className='hex pointer'>
            <img src='./work/shlogo.png' width={'100%'} />
          </div>
          <div
            id={keys.clientSite}
            className='hex bg-white-1 text-blue-1 pointer'
            title={data[keys.clientSite].tooltip}
          >
            Client Sites
          </div>
        </div>
        <div className='hex-wrap'>
          <div
            id={keys.tech}
            title={data[keys.tech].tooltip}
            className='hex bg-blue-1 text-white pointer'
          >
            Tech Stack
          </div>

          <div className='hex hex-empty'></div>
          {/* <div
            id={keys.product}
            title={data[keys.product].tooltip}
            className='hex bg-green-1 text-white pointer'
          >
            Product
          </div> */}
          {/* <div className='hex hex-empty'></div> */}
          <div
            id={keys.saleshood}
            title={data[keys.saleshood].tooltip}
            className='hex bg-green-1 text-white pointer'
          >
            SalesHood
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesHood;
