import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { forwardRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { CardProps, CustomCard } from '../share/custom-card/CustomCard';
import SectionWrapper from '../share/SectionWrapper';
import './Code.css';

const Code = forwardRef<HTMLDivElement, { projects: CardProps[] }>(
  ({ projects }, ref) => {
    return (
      <SectionWrapper
        ref={ref}
        title={
          <span>
            {<Icon icon={faCode} className='text-base' fontSize={26} />} What I
            Code
          </span>
        }
      >
        <Row className='d-flex mt-4 projects'>
          <Row className='mb-4 column-reverse'>
            <Col lg={4} sm={12}>
              <CustomCard {...projects[0]} tooltip='Open in Github' />
            </Col>
            <Col lg={8} sm={12}>
              <div className='border w-100 h-100 code-background p-4'>
                <Row className='h-100'>
                  <Col lg={6}></Col>
                  <Col
                    lg={6}
                    sm={12}
                    className='d-flex justify-content-center h-100 align-items-start'
                  >
                    <div className='bg-white-blur p-4 h-100'>
                      <h5> My Skills</h5>
                      <p>
                        <strong> Programming languages</strong>:
                        JavaScript/TypeScript, HTML, CSS, C#, Ruby
                      </p>
                      <p>
                        <strong>Backend</strong>: NodeJS, Express, SQL
                      </p>
                      <p>
                        <strong>Frontend</strong>: React, Redux, React Query,
                        Ant Design, Vite bundler, Jest, Testing Library
                      </p>
                      <p>
                        <strong>Others</strong>: Linux OS, Docker, Git version
                        control, CI/CD with Github Action
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            {projects.map((project, index) =>
              index !== 0 ? (
                <Col key={project.id} lg={4} sm={12} className='mb-4'>
                  <CustomCard {...project} tooltip='Open in Github' />
                </Col>
              ) : null
            )}
          </Row>
        </Row>
      </SectionWrapper>
    );
  }
);

export default Code;
