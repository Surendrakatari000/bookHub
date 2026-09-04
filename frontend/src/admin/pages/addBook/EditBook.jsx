import { useState, useEffect } from "react";
import BookModal from "../../components/model/Model";
import "./AddBook.css";
const API_URL = import.meta.env.VITE_API_URL;  

const EditBook = ({ isOpen, onClose, bookToEdit, onRefresh }) => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    authorName: "",
    rating: "",
    coverPic: "",
    aboutBook: "",
    aboutAuthor: "",
    bookUrl: "",
  });

  useEffect(() => {
    if (bookToEdit) {
      setBookDetails(bookToEdit);
    }
  }, [bookToEdit, isOpen]);

  if (!isOpen) return null;

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_URL}/admin/edit-book/${bookToEdit._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bookDetails),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update book");
      }

      await res.json();
      if (onRefresh) onRefresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong updating the book");
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Edit Book</h2>
        <BookModal
          onClose={onClose}
          bookDetails={bookDetails}
          setBookDetails={setBookDetails}
          buttonText="Save Changes"
          onSubmit={handleUpdateBook}
        />
      </div>
    </div>
  );
};

export default EditBook;
