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
          <div className='p-4 book-background h-100'>
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
          className='d-flex flex-column align-items-center book-stack-container mb-4'
        >
          <div
            style={{ width: '90%' }}
            className='h-100 d-flex flex-column align-items-center'
          >
            {books.map((b, i) => (
              <a
                href={b.link}
                target='_blank'
                className={`pointer book rounded d-flex justify-content-between align-items-center px-3 ${i !== 0 ? 'mt-2' : ''}`}
                style={{
                  height: b.height,
                  width: b.width,
                  backgroundColor: b.color,
                  marginRight: b.margin,
                }}
                title='View review of this book'
                referrerPolicy='no-referrer'
              >
                <span className='book__title'>{b.title}</span>
                <i>{b.author}</i>
              </a>
            ))}
          </div>
        </Col>
      </Row>
    </SectionWrapper>
  );
});

export default Read;
