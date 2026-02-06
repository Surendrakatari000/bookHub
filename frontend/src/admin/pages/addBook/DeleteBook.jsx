import "./AddBook.css";

const DeleteBook = ({ isOpen, onClose, book, onRefresh }) => {
  if (!isOpen || !book) return null;

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:4073/admin/delete-book/${book._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      onRefresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to delete book");
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-icon-circle">
          {/* Simple trash icon character or use React Icons <FaTrash /> */}
          🗑
        </div>

        <h3 style={{ margin: "10px 0", color: "#111827" }}>Delete Book?</h3>

        <p style={{ color: "#6b7280", marginBottom: "5px" }}>
          Are you sure you want to delete <strong>{book.title}</strong>?
        </p>

        <p className="warning-text">This action cannot be undone.</p>

        <div
          className="button-model-con"
          style={{ justifyContent: "center", borderTop: "none" }}
        >
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="red-button" onClick={handleDelete}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
