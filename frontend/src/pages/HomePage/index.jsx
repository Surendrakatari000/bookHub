import Header from "../../components/layout/header";
import Footer from "../../components/layout/Footer";
import SimpleSlider from "./carosal";

import "./index.css";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="homepage-con">
        <div className="desc-con">
          <h1 className="heading-desc">Find Your Next Favourite Books ?</h1>
          <p className="para-desc">
            You are in the right place. tell us what titles or you have enjoyed
            in the past , and we will give you surpisingly <br /> insightful
            recommendations
          </p>
        </div>
        <SimpleSlider />
      </div>
      <Footer />
    </>
  );
};
export default HomePage;
