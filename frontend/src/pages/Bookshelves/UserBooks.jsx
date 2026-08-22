import Header from "../../components/layout/header";
import { useState, useEffect } from "react";
import Footer from "../../components/layout/Footer";
import "./index.css";
import Cookies from "js-cookie";
import SideBar from "./SideBar";
import BooksBar from "./BookBar";
import { useSearchParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


const UserBooks = () => {
  const [userBooks, setuserBooks] = useState([]);
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status"); // want_to_read, completed, etc.

  useEffect(() => {
    let url = `${API_URL}user-books`;

    if (status) {
      url += `?status=${status}`;
    }

    // const token = Cookies.get("token");

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setuserBooks(data.books);
      })
      .catch((err) => console.error(err));
  }, [status]);

  return (
    <>
      <Header />
      <div className="body-bookshelves-con">
        <SideBar />
        <BooksBar books={userBooks} />
      </div>
      <Footer />
    </>
  );
};

export default UserBooks;
