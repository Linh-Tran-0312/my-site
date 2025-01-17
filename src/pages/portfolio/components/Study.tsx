import { forwardRef } from "react";
import { Col, Row } from "react-bootstrap";
import SectionWrapper from "./SectionWrapper";
type StudyType = {
  education: {
    title: string;
    details: string[];
  };
  certificates: {
    title: string;
    details: string[];
  };
};

const Study = forwardRef<HTMLDivElement, { study: StudyType }>(
  ({ study }: { study: StudyType }, ref) => {
    return (
      <SectionWrapper title="🎓 What I Study" ref={ref}>
        <Row className="py-2 mt-4">
          <Col xs={6}>
            <h4>{study.education.title}</h4>
            {study.education.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </Col>
          <Col xs={6}>
            <h4>{study.certificates.title}</h4>
            {study.certificates.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </Col>
        </Row>
      </SectionWrapper>
    );
  }
);

export default Study;
