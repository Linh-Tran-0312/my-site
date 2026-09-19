import { forwardRef } from 'react';
import SectionWrapper from '../share/SectionWrapper';
import HexagonDiagram from './Hexagons/HexagonDiagram';
import { getDefaultHexagonsByCompany } from './Hexagons/defaultHexagons';
import { HexCell } from './Hexagons/hexTypes';
import { Col, Row } from 'react-bootstrap';
import './Work.css';
export type Experience = {
  period: string;
  position: string;
  company: string;
  descriptionParagraphs: string[];
  hexagons: HexCell[];
};
const Work = forwardRef<HTMLDivElement, { experience: Experience[] }>(
  ({ experience }, ref) => {
    return (
      <SectionWrapper ref={ref} title='🏢 Where I Work'>
        {experience.map((e, i) => (
          <Row
            className={i % 2 === 0 ? 'mb-5' : 'row-reverse mb-5'}
            key={`${e.company}-${i}`}
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
                {e.descriptionParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Col>
            <Col lg={6} xs={12} className='d-flex-center p-4'>
              <HexagonDiagram
                cells={
                  e.hexagons?.length
                    ? e.hexagons
                    : getDefaultHexagonsByCompany(e.company)
                }
              />
            </Col>
          </Row>
        ))}
      </SectionWrapper>
    );
  }
);

export default Work;
