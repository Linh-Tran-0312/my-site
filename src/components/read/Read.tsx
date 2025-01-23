import { forwardRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import SectionWrapper from '../share/SectionWrapper';
import './Read.css';
const arr = [
  {
    color: '#A6C8E0',
    title: 'React Anti-Patterns',
    author: 'Juntao Qiu',
    width: '88%',
    height: '20%',
    margin: '40px',
  },
  {
    color: '#C3A6C8',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    width: '94%',
    height: '20%',
    margin: '25px',
  },

  {
    color: '#A6D8C3',
    title: 'The Art of Micro Frontends',
    author: 'Florian Rappl',
    width: '96%',
    height: '22%',
    margin: '1px',
  },
  {
    color: '#C3E4F7',
    title: 'Design for Developers',
    author: 'Adrian Twarog & George Moller',
    width: '90%',
    height: '22%',
    margin: '20px',
  },
  {
    color: '#8b8d61',
    title: 'Clean Code Cookbook',
    author: 'Maximiliano Contieri',
    width: '100%',
    height: '23%',
    margin: '5px',
  },
];

const Read = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <SectionWrapper title='📚 What I Read' ref={ref}>
      <Row className='py-2 mt-4'>
        <Col lg={6} md={12} xs={12}>
          <div className='p-5 book-background h-100'>
            <div className='w-100 h-100 p-4'>
              <h4>
                Reading books is still a gorgeous way to explore the world and
                the IT field is no exception.
              </h4>
              <p>
                Reviews of the recent books I have read and the interesting
                things I learned from them.
              </p>
            </div>
          </div>
        </Col>
        <Col
          lg={6}
          md={12}
          xs={12}
          className='d-flex flex-column align-items-center book-stack-container'
        >
          <div
            style={{ width: '90%' }}
            className='h-100 d-flex flex-column align-items-center mt-4'
          >
            {arr.map((b) => (
              <div
                className='pointer book rounded d-flex justify-content-between align-items-center px-3 mt-2'
                style={{
                  height: b.height,
                  width: b.width,
                  backgroundColor: b.color,
                  marginRight: b.margin,
                }}
              >
                <span className='book__title'>{b.title}</span>
                <i>{b.author}</i>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </SectionWrapper>
  );
});

export default Read;
