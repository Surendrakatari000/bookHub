import "../index.css";

const SideImage = (props) => {
  const { imageUrl } = props;
  return (
    <div className="login-page-image">
      <img
        src={imageUrl}
        alt=""
        className="login-page-image-img"
      />
      <div className="login-page-image-overlay">
        <p className="login-page-image-kicker">Book Hub</p>
        <h2 className="login-page-image-title">
          Find your next favourite book
        </h2>
        <p className="login-page-image-copy">
          A quieter place to browse, save, and return to the stories you love.
        </p>
      </div>
    </div>
  );
};

export default SideImage;
