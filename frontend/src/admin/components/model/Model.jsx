import "./Model.css";

const BookModal = ({
  onClose,
  bookDetails,
  setBookDetails,
  buttonText,
  onSubmit,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cancelButtonFun = () => {
    // Only close. Do not clear state here to support Edit mode.
    onClose();
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Cover URL</label>
        <input
          type="text"
          name="coverPic"
          value={bookDetails.coverPic}
          onChange={handleChange}
          required
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={bookDetails.title}
          onChange={handleChange}
          required
          placeholder="Enter book title"
        />
      </div>

      <div className="textarea-con">
        <label>About Book</label>
        <textarea
          rows="4"
          name="aboutBook"
          value={bookDetails.aboutBook}
          onChange={handleChange}
          required
          placeholder="Description of the book..."
        />
      </div>

      <div>
        <label>Author</label>
        <input
          type="text"
          name="authorName"
          value={bookDetails.authorName}
          onChange={handleChange}
          required
          placeholder="Author's name"
        />
      </div>

      <div className="textarea-con">
        <label>About Author</label>
        <textarea
          rows="4"
          name="aboutAuthor"
          value={bookDetails.aboutAuthor}
          onChange={handleChange}
          required
          placeholder="Short biography..."
        />
      </div>

      <div>
        <label>Rating (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          step="0.1"
          name="rating"
          value={bookDetails.rating}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Book URL</label>
        <input
          type="text"
          name="bookUrl"
          value={bookDetails.bookUrl || ""}
          onChange={handleChange}
          placeholder="https://example.com/book-link"
        />
      </div>

      <div className="button-model-con">
        <button type="button" onClick={cancelButtonFun}>
          Cancel
        </button>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  );
};

export default BookModal;
