import './Loading.css';
function LoadingScreen({className}: {className?: string}) {
  return (
    <div
      className={`loading d-flex flex-column justify-content-center ${className}`}
    >
      {/* <h1 className=" fontLg">Welcome to my site</h1> */}
      <div className="loader"></div>
    </div>
  );
}

export default LoadingScreen;
