import { forwardRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import SectionWrapper from '../share/SectionWrapper';
import './Read.css';
export type Book = {
  color: string;
  title: string;
  author: string;
  link: string;
  width: string;
  height: string;
  margin: string;
};

const Read = forwardRef<HTMLDivElement, { books: Book[] }>(({ books }, ref) => {
  return (
    <SectionWrapper title='📚 What I Read' ref={ref}>
      <Row className='py-2 mt-4'>
        <Col lg={6} md={12} xs={12} className='mb-4'>
          <div className='book-background h-100'>
            <div className='w-100 h-100 px-5 d-flex align-items-center'>
              <div>
              <h5>
                Reading books is still a gorgeous way 
               <br/>to explore the world and
                the IT field is no exception.
              </h5>
              <p className='text-secondary'>
                Reviews of the recent books I have read and the interesting
                things <br/> I learned from them.
              </p>
              </div>
            </div>
          </div>
        </Col>
        <Col
          lg={6}
          md={12}
          xs={12}
          className='d-flex flex-column align-items-center book-stack-container mb-4'
        >
          <div
            style={{ width: '90%' }}
            className='h-100 d-flex  align-items-end'
          >
            {books.map((b, i) => (
              <a
                href={b.link}
                target='_blank'
                className={`pointer book rounded d-flex  px-1 ${i !== 0 ? 'mt-2' : ''}`}
                style={{
                  height: 400 - Math.floor(Math.random() * 20),
                  backgroundColor: b.color,
                }}
                title={`View review of ${b.title}`}
                referrerPolicy='no-referrer'
                key={b.title}
              >
                <span className='book--title'>{b.title}</span>
                <i className='book--author'>{b.author}</i>
              </a>
            ))}
          </div>
        </Col>
      </Row>
    </SectionWrapper>
  );
});

export default Read;
