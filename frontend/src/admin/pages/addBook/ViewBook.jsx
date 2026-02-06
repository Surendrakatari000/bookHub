import "./AddBook.css";

const ViewBook = ({ isOpen, onClose, book, onEditClick, onDeleteClick }) => {
  if (!isOpen || !book) return null;

  const { title, coverPic, authorName, rating, aboutBook, aboutAuthor } = book;

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal view-book-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="view-book-content">
          {/* Header Section */}
          <div className="book-header-section">
            <img src={coverPic} alt={title} className="view-book-cover" />
            <div className="header-info">
              <h2>{title}</h2>
              <h4>By {authorName}</h4>
              <div className="rating-badge">
                ★ {Number(rating).toFixed(1)} / 5
              </div>
            </div>
          </div>

          {/* Body Section */}
          <div className="book-details-body">
            <span className="section-label">About the Book</span>
            <p className="body-text">{aboutBook}</p>

            <span className="section-label">About the Author</span>
            <p className="body-text">{aboutAuthor}</p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Close
          </button>
          <button
            className="blue-button"
            onClick={() => {
              onClose();
              onEditClick(book);
            }}
          >
            Edit Book
          </button>
          <button
            className="red-button"
            onClick={() => {
              onClose();
              onDeleteClick(book);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
