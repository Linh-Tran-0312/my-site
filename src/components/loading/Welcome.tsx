import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Loading.css";
function Welcome() {
  return (
    <div className="d-flex justify-content-center welcome-container">
      <h2 className="text-slide-up welcome-text text-white">
        <span className="">
          <FontAwesomeIcon icon={faCode} /> Welcome to my site<span className="dot-slide-up">.</span>
        </span>
      </h2>
    </div>
  );
}

export default Welcome;
