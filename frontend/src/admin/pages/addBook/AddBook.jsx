import { useState } from "react";
import BookModal from "../../components/model/Model";
import "./AddBook.css";

const AddBook = ({ isOpen, onClose, onRefresh }) => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    authorName: "",
    rating: "",
    coverPic: "",
    aboutBook: "",
    aboutAuthor: "",
  });

  if (!isOpen) return null;

  const handleCreateBook = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4073/admin/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookDetails),
      });

      if (!res.ok) {
        throw new Error("Failed to create book");
      }

      await res.json();

      // Clear form
      setBookDetails({
        title: "",
        authorName: "",
        rating: "",
        coverPic: "",
        aboutBook: "",
        aboutAuthor: "",
      });

      if (onRefresh) onRefresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Add New Book</h2>
        <BookModal
          onClose={onClose}
          bookDetails={bookDetails}
          setBookDetails={setBookDetails}
          buttonText="Create Book"
          onSubmit={handleCreateBook}
        />
      </div>
    </div>
  );
};

export default AddBook;
