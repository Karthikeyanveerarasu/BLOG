import './home.css'
const FullscreenImage = ({ imageSrc, onClose }) => {
    return (
      <div className="fullscreen-wrapper" onClick={onClose}>
        <div className="fullscreen-overlay"></div>
        <div className="fullscreen-image text-center">
          <img src={imageSrc} alt="Fullscreen" />
        </div>
      </div>
    );
  };
  export default FullscreenImage;