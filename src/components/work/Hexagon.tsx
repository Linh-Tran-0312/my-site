import parse from 'html-react-parser';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './Hexagon.css';
const sh = {
  clientSite: {
    title: 'SalesHood | Client Site',
    content:
      '<p>Client Site in one of the primary features in SalesHood product, which enahnces sales performance by working as an digital sales rooms.</p><ul><li>Sell how buyers want to buy. </li><li>Empower your sellers to create Digital Sales Rooms, complete with mutual plans, call notes, and AI content recommendations.</li> <li>Report on which buyers are engaged and how much pipeline is influenced. </li></ul>',
  },
  tech: {
    title: 'SalesHood | Technology',
    content:
      '<ul><li>Developed applications following the microservices architecture, ensuring scalability and modularity.</li><li>Cloud-based infrastructure: Amazon Web Services (AWS) Database: MySQL</li><li>Back end frameworks: Ruby on Rails, Hanami (Ruby language).</li><li>Front end libraries: React, Redux, React Query, Ant Design.</li><li>Design tool: Figma.</li><li>Development environments: Docker, Nix.</li><li>Tools: Bitbucket, Jira, Jenkins.</li><li>Methodologies: Agile Scrum.</li></ul>',
  },
  myRole: {
    title: 'SalesHood | My Role',
    content:
      '<p>Focusing on Frontend development, get hands-on experience on: Typescript, React, Redux, React Query, Axios, Ant Design, Storybook, Jest, Testing Library, Playwright, Figma.</p><p>Developed and maintained Client Sites - a micro frontend project, optimized performance using code splitting, lazy loading, reducing bundle size and improving page load time by 2 seconds.</p><p>Contribute to UI kit development.</p>',
  },
};
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
      const targetId = target.id as keyof typeof sh;
      if (sh[targetId]) {
        setShow(true);
        setItem(sh[targetId]);
      }
    }
  };
  return (
    <div>
      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header>{item.title}</Modal.Header>
        <Modal.Body>{parse(item.content)}</Modal.Body>
      </Modal>
      <div className='w-100 hex-container' onClick={handleClick}>
        <div className='hex-wrap'>
          <div
            id='clientSite'
            className='hex bg-white-1 text-blue-1 pointer'
            title='Time at the company'
          >
            Client Site
          </div>
          <div className='hex' title='Company logo'>
            <img src='./work/shlogo.png' width={'100%'} />
          </div>
          <div id='tech' className='hex bg-blue-1 text-white pointer'>
            Tech
          </div>
          <div id='myRole' className='hex bg-blue-2 text-white pointer'>
            My Role
          </div>
        </div>
        <div className='hex-wrap'>
          <div className='hex bg-blue-1 text-white' title='Company name'>
            SalesHood
          </div>
          <div className='hex hex-empty'></div>
          <div className='hex bg-green-1 text-white'>Product</div>
          <div className='hex hex-empty'></div>
        </div>
      </div>
    </div>
  );
}

export default SalesHood;
