import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SectionWrapper from '../share/SectionWrapper';
import './Study.css';
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
    const ribbonRef = useRef<HTMLDivElement>(null);
    const [showLogo, setShowLogo] = useState<boolean>(false);

    useLayoutEffect(() => {
      const MIN_WIDTH = 300;
      const handleResize = () => {
        if (ribbonRef.current) {
          const rect = ribbonRef.current.getBoundingClientRect();
          const reachMinWidth = rect.width < MIN_WIDTH;
          setShowLogo(!reachMinWidth);
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
      <SectionWrapper title='🎓 What I Study' ref={ref}>
        <Row className='py-2 mt-4' gap={12}>
          <Col lg={4} md={12} className='mb-4 pe-4'>
          <h5>Education</h5>
            <Row className='mt-42'>
              <Col xs={12}>
                <div className='ribbon' ref={ribbonRef}>
                  <div className='d-flex align-items-center p-4 w-100 h-100'>
                    <img
                      alt='HCMUS logo'
                      src={
                        'https://cdn.haitrieu.com/wp-content/uploads/2021/11/Logo-DH-Khoa-Hoc-Tu-Nhien-%E2%80%93-HCMUS.png'
                      }
                      width={'90px'}
                      className={showLogo ? 'me-4' : 'd-none'}
                    />
                    <div className='mt-4 overflow-hidden pe-4'>
                      <p className='text-university'>University of Science</p>
                      <p className='text-degree'>
                        Bachelor's degree of Infomation Technology
                      </p>
                    </div>
                  </div>

                  <div className='wrap'>
                    <span className='ribbon6'>VNUHCM</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={8} md={12}>
          <h5>Certifications</h5>
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
