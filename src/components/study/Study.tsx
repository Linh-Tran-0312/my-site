import { forwardRef } from "react";
import SectionWrapper from "../share/SectionWrapper";
import "./Study.css";
import { BadgeProps } from "./badge/Badge";
import "./style.css";

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
      <SectionWrapper title="🎓 What I Study" ref={ref}>
        <div className="study-grid">
          <div className="study-card">
            <h3 className="card-title">Education</h3>
            <div className="education-item">
              <img
                width={"90px"}
                src="./study/hcmus-logo.webp"
                alt="education"
              />
              <div>
                <p className="edu-school">University of Science</p>
                <p className="edu-degree">
                  Bachelor's degree of Information Technology (Second Degree)
                </p>
                <p className="edu-time">2019 – 2022</p>
              </div>
            </div>
          </div>

          <div className="study-card">
            <h3 className="card-title">Certifications</h3>
            <div style={{ display: "flex" }}>
              <ul className="cert-list me-5">
                {study.certificates.details.slice(0, 3).map((i) => (
                  <li key={i.title} title={`View this certificate`}>
                    <img width="30" src={i.logo} alt="certificate" />
                    <a
                      href={`${location.href}${i.link}`}
                      target="_blank"
                      className="badge__link"
                    >
                      <span className="ml-5">{i.subtitle}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="cert-list">
                {study.certificates.details.slice(3).map((i) => (
                  <li key={i.title} title={`View this certificate`}>
                    <img width="20" src={i.logo} alt="certificate" />
                    <a
                      href={`${location.href}${i.link}`}
                      target="_blank"
                      className="badge__link"
                    >
                      <span className="ml-5">{i.subtitle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>
    );
  }
);

export default Study;
