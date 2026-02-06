import { useEffect, useState } from "react";
import Header from "../../../components/layout/header";
import getBooks from "../../services/getBooksForAdmin";
import Rating from "react-rating";
import { ProgressBar } from "react-loader-spinner";
import {
  FaStar,
  FaSearch,
  FaSyncAlt,
  FaPlus,
  FaPen,
  FaTrash,
} from "react-icons/fa";

import AddBook from "../addBook/AddBook";
import EditBook from "../addBook/EditBook";
import ViewBook from "../addBook/ViewBook";
import DeleteBook from "../addBook/DeleteBook";
import "./books.css";

// --- StarRating Component ---
const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      <Rating
        readonly
        initialRating={rating}
        emptySymbol={<FaStar className="star empty" />}
        fullSymbol={<FaStar className="star full" />}
        fractions={10}
      />
      <span className="rating-text">{Number(rating).toFixed(1)}</span>
    </div>
  );
};

// --- SearchAddFilter Component ---
const SearchAddFilter = ({
  searchValue,
  onChangeSearch,
  setSortOrder,
  onAddBook,
  onRefresh,
  isRefreshing,
}) => {
  return (
    <div className="search-filter-bar">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search books..."
          value={searchValue}
          onChange={(e) => onChangeSearch(e.target.value)}
        />
      </div>

      <div className="filter-actions">
        <div className="sort-group">
          <span className="sort-label">Sort:</span>
          <select
            className="styled-select"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Default</option>
            <option value="newest">Recently Added</option>
            {/* <option value="oldest">Oldest Added</option> */}
            <option value="rating-desc">Rating: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="title-asc">Title: A-Z</option>
            <option value="title-desc">Title: Z-A</option>
          </select>
        </div>

        <button
          className={`btn-secondary ${isRefreshing ? "spin-icon" : ""}`}
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <FaSyncAlt className={isRefreshing ? "spin" : ""} />
          {isRefreshing ? "Loading..." : "Refresh"}
        </button>

        <button className="btn-primary" onClick={onAddBook}>
          <FaPlus /> Add Book
        </button>
      </div>
    </div>
  );
};

// --- Book Component (Card UI) ---
const Book = ({ bookdetails, onView, onEdit, onDelete }) => {
  const { title, coverPic, authorName, rating } = bookdetails;

  return (
    <div className="each-book-con" onClick={() => onView(bookdetails)}>
      <div className="book-img-wrapper">
        <img src={coverPic} className="image-cover-pic-book" alt={title} />
      </div>

      <div className="details-book-con">
        <div className="book-info-top">
          <h2 className="heading-title" title={title}>
            {title}
          </h2>
          <p className="para-author">{authorName}</p>
          <StarRating rating={rating} />
        </div>

        <div className="card-actions">
          <button
            className="card-btn edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(bookdetails);
            }}
          >
            <FaPen size={12} /> Edit
          </button>

          <button
            className="card-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(bookdetails);
            }}
          >
            <FaTrash size={12} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Container ---
const Books = () => {
  const [searchValue, setValue] = useState("");
  const [allGlobalBooks, setAllGlobalBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const getBooksBYFun = async () => {
    try {
      const allBooks = await getBooks();
      setAllGlobalBooks(allBooks);
    } catch (error) {
      console.error(error);
    }
  };

  // --- REFRESH LOGIC ---
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setAllGlobalBooks([]); // 1. Make books disappear immediately
    await new Promise((resolve) => setTimeout(resolve, 500));
    await getBooksBYFun(); // 2. Fetch and make them reappear
    setIsRefreshing(false);
  };

  // Handlers
  const handleView = (book) => {
    setSelectedBook(book);
    setIsViewOpen(true);
  };
  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsEditOpen(true);
  };
  const handleDelete = (book) => {
    setSelectedBook(book);
    setIsDeleteOpen(true);
  };

  useEffect(() => {
    getBooksBYFun();
  }, []);

  // --- Sorting & Filtering Logic ---
  const filteredAndSortedBooks = [...allGlobalBooks]
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.authorName.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case "rating-asc":
          return a.rating - b.rating;
        case "rating-desc":
          return b.rating - a.rating;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "newest":
          // Try to use createdAt, fallback to _id (timestamp embedded)
          const dateA = a.createdAt ? new Date(a.createdAt) : a._id;
          const dateB = b.createdAt ? new Date(b.createdAt) : b._id;
          return dateA < dateB ? 1 : -1; // Descending
        // case "oldest":
        //   const dateA_Old = a.createdAt ? new Date(a.createdAt) : a._id;
        //   const dateB_Old = b.createdAt ? new Date(b.createdAt) : b._id;
        //   return dateA_Old > dateB_Old ? 1 : -1; // Ascending
        default:
          return 0;
      }
    });

  return (
    <div className="admin-books-main-con">
      <Header />

      <SearchAddFilter
        searchValue={searchValue}
        onChangeSearch={setValue}
        setSortOrder={setSortOrder}
        onAddBook={() => setIsAddOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <AddBook
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onRefresh={handleRefresh}
      />

      <ViewBook
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        book={selectedBook}
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
      />

      <EditBook
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        bookToEdit={selectedBook}
        onRefresh={handleRefresh}
      />

      <DeleteBook
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        book={selectedBook}
        onRefresh={handleRefresh}
      />

      <div className="books-con-admin">
        {filteredAndSortedBooks.length > 0 ? (
          filteredAndSortedBooks.map((book) => (
            <Book
              key={book._id}
              bookdetails={book}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="no-books-msg">
            {isRefreshing ? <ProgressBar /> : "No books found."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
