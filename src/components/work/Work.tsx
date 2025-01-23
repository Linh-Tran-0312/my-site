import parse from 'html-react-parser';
import { forwardRef } from 'react';
import SectionWrapper from '../share/SectionWrapper';
import Hexagon from './Hexagon';
import { Col, Row } from 'react-bootstrap';
import './Work.css';
export type Experience = {
  period: string;
  position: string;
  company: string;
  description: string;
};
const Work = forwardRef<HTMLDivElement, { experience: Experience[] }>(
  ({ experience }, ref) => {
    return (
      <SectionWrapper ref={ref} title='💻 Where I Work'>
        <Row>
          <Col lg={6} xs={12}>
            {experience.map((e) => (
              <div className='mt-4'>
                <div className='d-flex w-100 justify-content-between'>
                  <h5>
                    <strong>{e.company}</strong>
                  </h5>
                  <p>{e.period}</p>
                </div>
                <p className='text-secondary'>{e.position}</p>
                {parse(e.description)}
              </div>
            ))}
          </Col>
          <Col lg={6} xs={12} className='d-flex-center p-4'>
            <Hexagon />
          </Col>
        </Row>
      </SectionWrapper>
    );
  }
);

export default Work;
