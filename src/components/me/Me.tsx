import parse from 'html-react-parser';
import { forwardRef, useMemo } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Typewriter from 'typewriter-effect';
import color from '../../tokens/color';
import './Me.css';
 
const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour > 5 && hour < 12) return "Good Morning!";
    if (hour > 5 && hour < 17) return "Good Afternoon!";
    else {
        return "Good Evening!"
    }
}
const  Me = forwardRef<HTMLDivElement, {me: any}>(({me}, ref) => {
  const greeting = useMemo(() => getGreeting(), [])
  return (
    <Container
      ref={ref}
      id="0"
      className="d-flex justify-content-center align-items-center container"
      style={{ minHeight: "calc(100vh - 160px)" }}
    >
      <Row className="container p-5 mt-2">
        <Col
          xs={12}
          lg={5}
          sm={12}
          className="slideInDown my-3 d-flex align-items-center justify-content-center"
        >
          <div className="img-ava-container pointer">
            <Image src="profile.jpg" className="img-ava" />
          </div>
        </Col>
        <Col xs={12} lg={7} sm={12} className="my-3">
          <h2 className="my-name">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(75)
                  .changeDeleteSpeed(50)
                  .typeString(`<span style="color: ${color.primary}">${greeting}</span>`)
                  .pauseFor(2500)
                  .deleteAll()
                  .typeString(
                    `<span style="color: ${color.secondary}">This is my portfolio site</span>`
                  )
                  .pauseFor(1500)
                  .deleteAll()
                  .typeString(`<span style="color: ${color.highlight}">${me.greeting}</span>`)
                  .pauseFor(4000)
                  .start();
              }}
              options={{
                loop: true,
              }}
            />
          </h2>
          {parse(me.introduction)}
        </Col>
      </Row>
    </Container>
  );
})

export default Me;
