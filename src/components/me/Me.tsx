import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';
import { forwardRef, useMemo, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Typewriter from 'typewriter-effect';
import color from '../../tokens/color';
import './Me.css';
const profileIcons = {
  github: faGithub,
  linkedin: faLinkedin,
};
export type About = {
  greeting: string;
  introduction: string;
  profiles: { type: keyof typeof profileIcons; title: string; link: string }[];
};

const getGreeting = () => {
  const now = new Date();
  const hour = now.getHours();
  if (hour > 5 && hour < 12) return 'Good Morning!';
  if (hour > 5 && hour < 17) return 'Good Afternoon!';
  else {
    return 'Good Evening!';
  }
};
const Me = forwardRef<HTMLDivElement, { me: About }>(({ me }, ref) => {
  const greeting = useMemo(() => getGreeting(), []);
  const [showHi, setShowHi] = useState(true);
  return (
    <Container
      ref={ref}
      id='0'
      className='d-flex justify-content-center align-items-center container'
      style={{ minHeight: 'calc(100vh - 160px)' }}
    >
      <Row className='container p-5 mt-2'>
        <Col
          xs={12}
          lg={5}
          sm={12}
          className='slideInDown my-3 d-flex align-items-center justify-content-center'
        >
          <div className='img-ava-container'>
            <Image src='profile.jpg' className='img-ava' />
          </div>
        </Col>
        <Col xs={12} lg={7} sm={12} className='my-3'>
          <h2 className='d-flex'>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(75)
                  .changeDeleteSpeed(50)
                  .typeString(
                    `<span style="color: ${color.primary}"> ${greeting}</span>`
                  )
                  .callFunction(() => setShowHi(true))
                  .start()
                  .pauseFor(3000)
                  .callFunction(() => setShowHi(false))
                  .deleteAll()
                  .typeString(
                    `<span style="color: ${color.highlight}">${me.greeting}</span>`
                  )
                  .pauseFor(2000)
                  .deleteAll()
                  .typeString(
                    `<span style="color: ${color.secondary}">This is my portfolio site</span>`
                  )
                  .pauseFor(4000);
              }}
              options={{
                loop: true,
                cursor: '',
              }}
            />
            {showHi && <span className='ps-2'>👋</span>}
          </h2>
          {parse(me.introduction)}
          <div className='d-flex justify-content-start align-items-start'>
            {me.profiles.map((p) => (
              <a
                title={p.title}
                target='_blank'
                href={p.link}
                className='pointer social-link'
              >
                <Icon
                  icon={profileIcons[p.type]}
                  fontSize={26}
                  className='pe-3'
                />
              </a>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default Me;
