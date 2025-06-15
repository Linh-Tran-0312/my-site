import { forwardRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import SectionWrapper from '../share/SectionWrapper';
import { CustomCard, CardProps } from '../share/custom-card/CustomCard';
import './Write.css';

const Write = forwardRef<HTMLDivElement, { blogs: CardProps[] }>(
  ({ blogs }, ref) => {
    return (
      <SectionWrapper title='✍️ What I Write' ref={ref}>
        <Row className='d-flex mt-4'>
          <Row className='mb-4'>
            <Col lg={8} sm={12}>
              <div className='border w-100 h-100 desk-background p-4'>
                <Row className='h-100'>
                  <Col lg={6}></Col>
                  <Col
                    lg={6}
                    sm={12}
                    className='d-flex justify-content-center h-100 align-items-end'
                  >
                    <div className='bg-white-blur p-4'>
                      <h5> Write to Reflect and Share</h5>
                      <p className='text-secondary'>
                        I started my own series,
                        <a
                          href='https://linhnote.hashnode.dev/'
                          target='_blank'
                          className='text-link'
                        >
                          <> Technical Blog of Linh Tran</>
                        </a>
                        , as a way to take notes, practice my writing skills,
                        and share knowledge with those who need it.
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={4} sm={12}>
              <CustomCard {...blogs[0]} tooltip='View this article' />
            </Col>
          </Row>
          <Row>
            {blogs.map((blog, index) =>
              index !== 0 ? (
                <Col key={blog.id} lg={4} sm={12} className='mb-4'>
                  <CustomCard {...blog} tooltip='View this article' />
                </Col>
              ) : null
            )}
          </Row>
        </Row>
      </SectionWrapper>
    );
  }
);

export default Write;
