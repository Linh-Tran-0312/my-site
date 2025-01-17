import { Container } from "react-bootstrap";
function LoadingScreen() {
  return (
    <Container
      style={{ height: "100vh" }}
      className="fadeIn 100vh loading d-flex flex-column justify-content-center align-items-center"
    >
      <h1 className=" fontLg">Welcome to my site</h1>
      <div className="loader"></div>
    </Container>
  );
}

export default LoadingScreen;
