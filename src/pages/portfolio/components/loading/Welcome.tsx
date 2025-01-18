import './Loading.css';
function Welcome() {
  return (
    <div className="d-flex justify-content-center welcome-container">
      <h2
        className="text-slide-up welcome-text text-white"
        style={{ fontFamily: "Roobert" }}
      >
        <span className="">Welcome to my site</span>
        <span className="dot-slide-up">.</span>
      </h2>
     
    </div>
  );
}

export default Welcome;
