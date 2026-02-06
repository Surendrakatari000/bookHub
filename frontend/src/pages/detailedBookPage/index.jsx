import Header from "../../components/layout/header";
import Footer from "../../components/layout/Footer";
import { useParams } from "react-router-dom";
import detailedBookButton from "../../utils/buttons";
import {
  updateStatusOfBook,
  deleteUserBook,
  addUserBook,
} from "../../services/book_api";

import "./index.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// const token = Cookies.get("token"); // cookie name

const DetailedViewPage = () => {
  const { id } = useParams();
  const [bookDetailed, setBook] = useState(null);
  const [bookStatus, setBookStatus] = useState("not user book");

  const fetchBookById = async () => {
    try {
      const response = await fetch(`http://localhost:4073/user-books/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonBook = await response.json();
      console.log(jsonBook);
      setBookStatus(jsonBook.statusOfBook);
      // console.log(jsonBook.book);
      // console.log(jsonBook.statusOfBook);
      setBook(jsonBook.book);
    } catch (error) {
      console.error("Error fetching book:", error.message);
    }
  };

  useEffect(() => {
    fetchBookById();
  }, []);

  const buttonsdata = detailedBookButton(bookStatus);

  const buttonAddUpdateDelteFun = async (id, statusValue) => {
    const NOT_USER_BOOK = "not user book";
    const REMOVE = "remove from list";
    try {
      if (bookStatus === NOT_USER_BOOK) {
        await addUserBook(id, statusValue);
      } else if (statusValue === REMOVE) {
        await deleteUserBook(id);
      } else {
        await updateStatusOfBook(id, statusValue);
      }

      // 🔁 Refresh book status after API call
      await fetchBookById();
    } catch (error) {
      console.error("Action failed:", error);
    }
  };

  return (
    <div>
      {bookDetailed ? (
        <>
          <Header />
          <div className="main-detaield-viw_page-con">
            <div className="main-con">
              <div className="detailed-con">
                <img src={bookDetailed.coverPic} className="image" />
                <div className="book-desc-con">
                  <h1>{bookDetailed.title}</h1>
                  <p>Authors :{bookDetailed.authorName}</p>
                  <p>Avg Rating : ⭐ {bookDetailed.rating}</p>
                  {bookStatus !== "not user book" && (
                    <span>Status : {buttonsdata.zero} </span>
                  )}
                  {bookStatus === "not user book" && (
                    <hr className="first-line" />
                  )}
                  <div>
                    <button
                      className="first-button actions-button"
                      onClick={() => {
                        buttonAddUpdateDelteFun(id, buttonsdata.first);
                      }}
                    >
                      {buttonsdata.first}
                    </button>
                    <button
                      className="second-button actions-button"
                      onClick={() => {
                        buttonAddUpdateDelteFun(id, buttonsdata.second);
                      }}
                    >
                      {buttonsdata.second}
                    </button>
                    <button
                      className={`${
                        buttonsdata.third === "remove from list"
                          ? "third-button"
                          : "orange-button"
                      } actions-button`}
                      onClick={async () => {
                        buttonAddUpdateDelteFun(id, buttonsdata.third);
                      }}
                    >
                      {buttonsdata.third}
                    </button>
                  </div>
                </div>
              </div>
              <hr className="line" />
              <div className="about-con">
                <h1>About Author</h1>
                <p>{bookDetailed.aboutAuthor}</p>
                <h1>About Book</h1>
                <p>{bookDetailed.aboutBook}</p>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <p>loading...</p>
        </>
      )}
    </div>
  );
};

export default DetailedViewPage;
