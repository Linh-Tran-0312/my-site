import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
  faCode
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import { forwardRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import useMediaQuery from "../../hooks/useMediaQuery";
import SectionWrapper from "../SectionWrapper";
import "./Code.css";

type Project = {
  id: number;
  img: string;
  title: string;
  summary: string;
  source: string;
  themeColor: string;
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
        <Row className="ms-0 d-flex w-100 mt-4 d-flex align-items-center justify-content-center showcase">
          <Col
            md={6}
            className={`d-flex flex-column justify-content-between align-items-center py-4 px-4 showcase__left ${
              isMobile ? "d-none" : ""
            }`}
          >
            <div className="d-flex flex-column align-items-center w-100">
              <h5>{project.title}</h5>

              <PillList
                length={projects.length}
                activeIndex={index}
                activeColor={project.themeColor}
              />

                <img src={project.img} className="showcase__image mt-4" />
            </div>
            <div className="w-100" style={{ color: project.themeColor }}>
              <Button className="showcase__button" onClick={handlePrev}>
                <Icon icon={faChevronLeft} className="pe-2" />
                <span>Prev</span>
              </Button>
            </div>
          </Col>
          <Col
            md={6}
            sm={12}
            style={{
              backgroundColor: project.themeColor,
            }}
            className="bw-mask position-relative  text-white h-100 d-flex flex-column justify-content-between position-relative py-4 px-4  showcase_right"
          >
            <div>
              <div className="d-flex justify-content-between align-items-center w-100">
                <h5 className="text-truncate vertical-middle">
                  {isMobile ? project.title : "Details"}
                </h5>
                <a
                  href={project.source}
                  target="_blank"
                  rel="noreferrer"
                  id={"git"}
                >
                  <Button className="showcase__git-button" size="sm" style={{color: project.themeColor}}>
                   Open in <Icon icon={faGithub} className="ps-1" />
                  </Button>
                </a>
              </div>
              <div className="mt-4">
                {isMobile && (
                  <img
                    src={project.img}
                    className="showcase__image mb-4"
                  />
                )}
                <div className="showcase__detail-content">
                  {parse(project.summary)}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button
                className="showcase__button"
                onClick={handleNext}
              >
                <span className="pe-2">Next</span>
                <Icon icon={faChevronRight} />
              </Button>
            </div>
          </Col>
        </Row>
      </SectionWrapper>
    );
  }
);

export default Code;
