import { forwardRef } from "react";
import { Col, Row } from "react-bootstrap";
import SectionWrapper from "../SectionWrapper";
import "./Write.css";
type Blog = {
  id: number;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
  link: string;
};

const CustomCard = ({ blog }: { blog: Blog }) => {
  return (
    <div className="custom-card">
      <div className="custom-card__content">
        <p className="custom-card__category">{blog.category}</p>
        <h2 className="custom-card__title">{blog.title}</h2>
        <p className="custom-card__subtitle">{blog.description}</p>
      </div>
      <div className="custom-card__image">
        <img src={blog.thumbnail} alt="The Anxious Generation book cover" />
      </div>
    </div>
  );
};

const Write = forwardRef<HTMLDivElement, { blogs: Blog[] }>(
  ({ blogs }, ref) => {
    return (
      <SectionWrapper title="✍️ What I Write" ref={ref}>
        <Row className="d-flex mt-4 custom">
          <Row className="mb-4">
            <Col lg={8} sm={6}>
              <div className="border w-100 h-100 desk-background p-4">
                <Row className="h-100">
                  <Col lg={6}></Col>
                  <Col
                    lg={6}
                    sm={12}
                    className="d-flex justify-content-center h-100  align-items-end"
                  >
                    <div className="white-blur-background w-100 p-4">
                      <h5> Write to Reflect and Share</h5>
                      <p>
                        I started my own series,
                        <a
                          href="https://linhnote.hashnode.dev/"
                          target="_blank"
                          className="text-link"
                        >
                          <> Technical Blog of Linh Tran</>
                        </a>
                        , as a way to take notes, practice my writing skills,
                        and share knowledge with those who need it.
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={4} sm={6}>
              <CustomCard blog={blogs[0]} />
            </Col>
          </Row>
          <Row>
            {blogs.map((blog, index) =>
              index !== 0 ? (
                <Col key={blog.id} lg={4} sm={6} className="mb-4">
                  <CustomCard blog={blog} />
                </Col>
              ) : null
            )}
          </Row>
        </Row>
      </SectionWrapper>
    );
  }
);

export default Write;
