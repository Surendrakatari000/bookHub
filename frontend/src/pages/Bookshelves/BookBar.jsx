import { useState } from "react";
import "./index.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const BooksBar = ({ books }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const isAllSection =
    location.pathname === "/user-books" && !searchParams.has("status");

  const filteredBooks = books.filter((item) => {
    const book = item.book ? item.book : item;
    if (!book) return false;
    const searchValue = search.toLowerCase();
    return (
      book.title?.toLowerCase().includes(searchValue) ||
      book.authorName?.toLowerCase().includes(searchValue)
    );
  });

  const headingSearch = () => (
    <div className="header-con-bookshelves">
      <h1 className="header-header">Books</h1>
      <input
        className="my-input"
        placeholder="Search by title or author..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );

  const eachBook = (item) => {
    const book = item.book ? item.book : item;
    return (
      <Link to={`/books/${book._id}`} key={book._id} className="link-book">
        <div className="book-con">
          <img
            src={book.coverPic}
            alt={book.title}
            className="book-cover_page"
          />
          <div className="book-desc">
            <h3>{book.title}</h3>
            <p>Author: {book.authorName}</p>
            <p>Rating: ⭐ {book.rating}</p>

            {isAllSection && (
              <p className="book-status">
                Status: {item.status.replace(/_/g, " ")}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  };

  const allBooksFun = () => (
    <div className="books-con">
      {filteredBooks.length > 0 ? (
        filteredBooks.map((item) => eachBook(item))
      ) : (
        <img
          src="https://res.cloudinary.com/dz39z2hyf/image/upload/v1768986957/image_kxtjdi.png"
          alt="no books"
          className="image-no-books"
        />
      )}
    </div>
  );

  return (
    <div>
      {headingSearch()}
      {allBooksFun()}
    </div>
  );
};

export default BooksBar;
