import { forwardRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import SectionWrapper from '../SectionWrapper';
import parseHtml from 'html-react-parser';
import Badge, { BadgeProps } from './badge/Badge';

export type StudyProps = {
  education: {
    title: string;
    details: string[];
  };
  certificates: {
    title: string;
    details: BadgeProps[];
  };
};

const Study = forwardRef<HTMLDivElement, { study: StudyProps }>(
  ({ study }: { study: StudyProps }, ref) => {
    return (
      <SectionWrapper title='🎓 What I Study' ref={ref}>
        <Row className='py-2 mt-4'>
          <Col sm={6} xs={12} className='mb-4'>
            <h4>{study.education.title}</h4>
            <Row className='mt-4'>
              <Col xs={2}>
                <img
                  alt='HCMUS logo'
                  src={
                    'https://cdn.haitrieu.com/wp-content/uploads/2021/11/Logo-DH-Khoa-Hoc-Tu-Nhien-%E2%80%93-HCMUS.png'
                  }
                  width={'100%'}
                />
              </Col>
              <Col xs={10}>
                {study.education.details.map((detail) => (
                  <p key={detail}>{parseHtml(detail)}</p>
                ))}
              </Col>
            </Row>
          </Col>
          <Col sm={6} xs={12}>
            <h4>{study.certificates.title}</h4>
            <div className='d-flex-inline '>
              {study.certificates.details.map((i) => (
                <Badge {...i} />
              ))}
            </div>
          </Col>
        </Row>
      </SectionWrapper>
    );
  }
);

export default Study;
