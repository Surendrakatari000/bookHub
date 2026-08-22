import Header from "../../components/layout/header";
import { useState, useEffect } from "react";
import Footer from "../../components/layout/Footer";
import "./index.css";
import Cookies from "js-cookie";
import SideBar from "./SideBar";
import BooksBar from "./BookBar";
const API_URL = import.meta.env.VITE_API_URL;

const GlobelBooks = () => {
  const [globalBooks, setglobalBooks] = useState(null);

  useEffect(() => {
    // const token = Cookies.get("token");
    const url = `${API_URL}/global/books`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setglobalBooks(data.data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []); // ✅ FIX HERE

  return (
    <>
      <Header />
      <div className="body-bookshelves-con">
        <SideBar />
        {globalBooks ? <BooksBar books={globalBooks} /> : <p>loading...</p>}
      </div>
      <Footer />
    </>
  );
};

export default GlobelBooks;
