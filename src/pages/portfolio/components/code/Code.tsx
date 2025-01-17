import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import { forwardRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import SectionWrapper from "../SectionWrapper";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import "./Code.css";

type Project = {
  id: number;
  img: string;
  title: string;
  summary: string;
  source: string;
  backgroundColor: string;
};
type PillListProps = {
  length: number;
  activeIndex: number;
  activeColor: string;
};

const PillList = ({ length, activeIndex, activeColor }: PillListProps) => {
  const pills = Array.from({ length });

  return (
    <div className="pill-container">
      {pills.map((_, index) => (
        <div
          key={index}
          style={{
            backgroundColor: index === activeIndex ? activeColor : "white",
          }}
          className={`pill ${index === activeIndex ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

const Code = forwardRef<HTMLDivElement, { projects: Project[] }>(
  ({ projects }, ref) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [project, setProject] = useState(projects[0]);
    const [index, setIndex] = useState(0);
    const handleNext = () => {
      const newIndex = (index + 1) % projects.length;
      setIndex(newIndex);
      setProject(projects[newIndex]);
    };
    const handlePrev = () => {
      const newIndex = index - 1 < 0 ? projects.length - 1 : index - 1;
      setIndex(newIndex);
      setProject(projects[newIndex]);
    };
    return (
      <SectionWrapper
        ref={ref}
        title={
          <span>
            {<Icon icon={faCode} className="text-base" fontSize={26} />} What I
            code
          </span>
        }
      >
        <Row className="d-flex w-100 mt-4 d-flex align-items-center justify-content-center showcase">
          <Col
            lg={6}
            className={`position-relative d-flex flex-column justify-content-between align-items-center py-4 px-4 showcase__left ${
              isMobile ? "d-none" : ""
            }`}
          >
            <div className="d-flex flex-column align-items-center w-100">
              <h4>{project.title}</h4>

              <PillList
                length={projects.length}
                activeIndex={index}
                activeColor={project.backgroundColor}
              />

              <div className="d-flex justify-content-center align-items-start w-100 mt-4">
                <img
                  src={project.img}
                  style={{
                    width: "80%",
                    height: "400px",
                    objectFit: "contain",
                    borderRadius: 4,
                  }}
                />
              </div>
            </div>
            <div className="w-100 d-flex justify-content-end">
              <Button
                style={{ color: project.backgroundColor }}
                className="showcase__button showcase__button--prev"
                onClick={handlePrev}
              >
                <Icon icon={faChevronLeft} className="showcase__button-prev-icon" />
                <span className="showcase__button-prev-text ps-2">Prev</span>
              </Button>
            </div>
          </Col>
          <Col
            lg={6}
            xs={12}
            style={{ backgroundColor: project.backgroundColor }}
            className="position-relative  text-white h-100 d-flex flex-column justify-content-between position-relative py-4 px-4  showcase_right"
          >
            <div>
              <div className="d-flex justify-content-between align-items-center w-100">
                <h4 className="text-truncate vertical-middle">
                  {isMobile ? project.title : "Details"}
                </h4>
                <a href={project.source} target="_blank" rel="noreferrer">
                  <Button className="showcase__git-button" size="sm">
                    Open In <Icon icon={faGithub} className="ps-1"/>
                  </Button>
                </a>
              </div>
              <div className="mt-4">
                {isMobile && (
                  <img
                    src={project.img}
                    className="w-100 h-auto bg-white mb-4"
                  />
                )}
                <div className="showcase__detail-content">
                  {parse(project.summary)}
                </div>
              </div>
            </div>
            <div>
              <Button
                className="showcase__button showcase__button--next"
                onClick={handleNext}
              >
                <span className="showcase__button-next-text pe-2">Next</span>
                <Icon icon={faChevronRight} className="showcase__button-next-icon" />
              </Button>
            </div>
          </Col>
        </Row>
      </SectionWrapper>
    );
  }
);

export default Code;
