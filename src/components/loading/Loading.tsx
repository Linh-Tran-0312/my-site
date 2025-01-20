import './Loading.css';
function LoadingScreen({ className }: { className?: string }) {
  return (
    <div
      className={`loading d-flex flex-column justify-content-center ${className}`}
    >
      <div className='loader'></div>
    </div>
  );
}

export default LoadingScreen;
