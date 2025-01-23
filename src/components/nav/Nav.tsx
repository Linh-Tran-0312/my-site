import { faBars, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Nav.css';
const NavItems = ['me', 'work', 'code', 'write', 'read', 'study'] as const;
export type NavItemType = (typeof NavItems)[number];

export type Nav = {
  [key in NavItemType]: string;
};
type Props = {
  nav: Nav;
  inView: {
    [key: string]: boolean;
  };
  scrollIntoView: (navItem: NavItemType) => void;
};
const ToggleIcons = {
  me: <Icon icon={faBars} />,
  work: '💻',
  code: (
    <Icon icon={faCode} className='navbar-toggler-emoji-code' fontSize={26} />
  ),
  write: '✍️',
  read: '📚',
  study: '🎓',
};

function NavBar({ nav, inView, scrollIntoView }: Props) {
  const inViewItem = useMemo(() => {
    for (const activeItem in inView) {
      if (inView[activeItem]) {
        return activeItem as keyof Nav;
      }
    }
    return 'me';
  }, [JSON.stringify(inView)]);
  return (
    <Navbar
      className='border-bottom bg-default d-flex flex-row align-items-center'
      expand='md'
      style={{ zIndex: 600 }}
      sticky='top'
    >
      <Container>
        <Navbar.Brand
          href='/'
          className='h5 pl-2 pt-3 text-default text-truncate pointer'
        >
          About Linh
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll'>
          <span className='navbar-toggler-emoji'>
            {ToggleIcons[inViewItem]}
          </span>
        </Navbar.Toggle>
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto text-center h6 font-bold'>
            {NavItems.map((item: NavItemType) => (
              <Nav.Link
                className='d-flex flex-column justify-content-center align-items-center nav-link'
                onClick={() => scrollIntoView(item)}
              >
                <span
                  className={
                    inView[item] ? 'nav__item--active' : 'nav__item pointer'
                  }
                >
                  {nav[item]}
                </span>
              </Nav.Link>
            ))}
            {/* <Nav className='d-flex flex-row justify-content-center align-items-start'>
              <Nav.Link
                target='_blank'
                href='https://github.com/Linh-Tran-0312'
                className='pointer nav__icon nav-link'
              >
                <Icon icon={faGithub} size='lg' />
              </Nav.Link>
              <Nav.Link
                target='_blank'
                href='https://www.linkedin.com/in/ch%C3%AD-linh-tr%E1%BA%A7n-a54928200/'
                className='pointer nav__icon nav-link'
              >
                <Icon icon={faLinkedin} size='lg' />
              </Nav.Link>
            </Nav> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
