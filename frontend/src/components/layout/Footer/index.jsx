import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="icon-con">
        <FaGoogle className="icon" />
        <FaTwitter className="icon" />
        <FaInstagram className="icon" />
        <FaYoutube className="icon" />
      </div>
      <p>Contact Us</p>
    </footer>
  );
};

export default Footer;
