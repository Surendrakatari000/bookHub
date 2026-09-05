import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import "./index.css";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        display: "block",
        background: "#c4c1c8",
        height: "40px",
        width: "40px",
        borderRadius: "50%",
        right: "-40px",
        position: "absolute",
        top: "40%",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {/* &gt; */}
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        display: "block",
        background: "#c4c1c8",
        height: "40px",
        width: "40px",
        borderRadius: "50%",
        left: "-40px",
        position: "absolute",
        top: "40%",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {/* &lt; */}
    </div>
  );
};

const SimpleSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const API_URL = import.meta.env.VITE_API_URL;

  const [topratedBooks, setTopratedBooks] = useState([]);
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${API_URL}/global/top-rated-books`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setTopratedBooks(data.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="carosal-container">
      <div className="carosal-header-container">
        <h1 className="books-heading-corosal">Top Rated Books</h1>

        {isAdmin ? (
          <Link to="/admin/books">
            <button className="find-books-button">Find Books</button>{" "}
          </Link>
        ) : (
          <Link to="/books">
            <button className="find-books-button">Find Books</button>{" "}
          </Link>
        )}
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {topratedBooks.map((book) => (
            <Link
              to={`/books/${book._id}`}
              key={book._id}
              className="link-book"
            >
              <div className="book-con-carosel" key={book._id}>
                <div className="image-con">
                  <img src={book.coverPic} className="image-book" />
                </div>
                <h4 className="book_title">{book.title}</h4>
                <p className="book_author">{book.authorName}</p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SimpleSlider;
