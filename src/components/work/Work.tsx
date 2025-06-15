import parse from 'html-react-parser';
import { forwardRef } from 'react';
import SectionWrapper from '../share/SectionWrapper';
import SalesHood from './Hexagons/SalesHood';
import Moatable from './Hexagons/Moatable';
import { Col, Row } from 'react-bootstrap';
import './Work.css';
export type Experience = {
  period: string;
  position: string;
  company: 'SalesHood' | 'Moatable';
  description: string;
};
const HexagonMap = {
  SalesHood: <SalesHood />,
  Moatable: <Moatable />,
};
const Work = forwardRef<HTMLDivElement, { experience: Experience[] }>(
  ({ experience }, ref) => {
    return (
      <SectionWrapper ref={ref} title='💻 Where I Work'>
        {experience.map((e, i) => (
          <Row
            className={i % 2 === 0 ? 'mb-5' : 'row-reverse mb-5'}
            key={e.company}
          >
            <Col lg={6} xs={12}>
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
            </Col>
            <Col lg={6} xs={12} className='d-flex-center p-4'>
              {HexagonMap[e.company]}
            </Col>
          </Row>
        ))}
      </SectionWrapper>
    );
  }
);

export default Work;
