import "../index.css";

const SideImage = (props) => {
  const { imageUrl } = props;
  return (
    <div className="login-page-image">
      <img src={imageUrl} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default SideImage;
