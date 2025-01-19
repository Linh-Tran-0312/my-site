import { forwardRef } from "react";
import { Col, Row } from "react-bootstrap";
import SectionWrapper from "../SectionWrapper";
import './Read.css';
const arr = [
  {
    color: "#A6C8E0",
    title: "Design for Developers",
    author: "John Doe",
    width: '88%'
  },
  {
    color: "#C3A6C8",
    title: "Software Testing Principles",
    author: "Michael Brown",
    width: '94%'
  },
 
  {
    color: "#A6D8C3",
    title: "Clean Code",
    author: "Adrian Twarog",
    width: '89%'
  },
  {
    color: "#C3E4F7",
    title: "React Made Easy",
    author: "Adrian Twarog",
    width: '98%'
  },
  {
    color: "#E0A6D8",
    title: "Mastering JavaScript",
    author: "John Doe",
    width: '92%'
  },
];
function randomMarginLeft(max: number) {
  // Generate a random number between 0 and max (inclusive)
  const marginValue = Math.floor(Math.random() * (max + 1));
  // Return the value as a string with 'px'
  return `${marginValue}px`;
}
const Read = forwardRef<HTMLDivElement, {}>(({}, ref) => {
  return (
    <SectionWrapper title="📚 What I Read" ref={ref}>
      <Row className="py-2 mt-4">
      <Col md={6} sm={12} xs={12} >
           <div className="p-5 book-background h-100">

           
           <div className="w-100 h-100 p-4">
             <h1> Book bucket list for 2025</h1> 
            </div>
            </div>
         </Col>
        <Col md={6} sm={12} xs={12} className="d-flex flex-column ">
          {arr.map((b) => (
            <div
              className="pointer book rounded d-flex justify-content-between align-items-center px-3 mt-2"
              style={{ height: 80, width: b.width, backgroundColor: b.color, marginRight: randomMarginLeft(40) }}
            >
              <h5>{b.title}</h5>
              <i>{b.author}</i>
            </div>
          ))}
        </Col>
       
      </Row>
    </SectionWrapper>
  );
});

export default Read;
