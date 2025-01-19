import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Nav.css";

const NavItems = ["me", "work", "code", "write", "study"] as const;  
export type NavItemType= typeof NavItems[number];
type Props = {
    nav: {
        code: string,
        me: string,
        work: string,   
        write: string,      
        study: string
    },
    inView: {
        [key: string]: boolean  
    },
    scrollIntoView: (navItem: NavItemType) => void   ,
}
function NavBar({nav, inView, scrollIntoView }: Props) {
    return ( 
        <Navbar
        className=" border-bottom bg-white d-flex flex-row align-items-center"
        expand="md"
        style={{ zIndex: 800 }}
        sticky="top"
      >
        <Container className="">
          <Navbar.Brand
            href="/"
            className="h5 pl-2 pt-3 text-truncate text-color pointer"
          >
           About Linh
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto text-center h6 font-bold">
                {
                    NavItems.map((item: NavItemType) => (
                        <Nav.Link
                        className="d-flex flex-column justify-content-center align-items-center"
                        onClick={() => scrollIntoView(item)}    
                      >
                        <span
                          className={
                            inView[item]
                              ? "nav__item--active"
                              : "nav__item pointer"
                          }
                        >
                          {nav[item]}
                        </span>
                      </Nav.Link>
                    ))  
                }
              <Nav className="d-flex flex-row justify-content-center align-items-start">
                <Nav.Link
                  target="_blank"
                  href="https://github.com/Linh-Tran-0312"
                  className="pointer nav__icon"
                >
                  <Icon icon={faGithub} size="lg" />
                </Nav.Link>
                <Nav.Link
                  target="_blank"
                  href="https://www.linkedin.com/in/ch%C3%AD-linh-tr%E1%BA%A7n-a54928200/"
                  className="pointer nav__icon"
                >
                  <Icon icon={faLinkedin} size="lg" />
                </Nav.Link>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      
      </Navbar>
     );
}

export default NavBar;