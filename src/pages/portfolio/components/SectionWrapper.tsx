import { forwardRef } from "react";
import { Container } from "react-bootstrap";

const SectionWrapper = forwardRef<
  HTMLDivElement,
  { title: React.ReactNode; children: React.ReactNode }
>(({ title, children }, ref) => {
  return (
    <Container className="my-5 scroll-margin-top" ref={ref}>
      <Container className="py-5">
        <h2 className="section-title">{title}</h2>
        {children}
      </Container>
    </Container>
  );
});

export default SectionWrapper;
