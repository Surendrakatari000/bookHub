import Header from "../../components/layout/header";
import Footer from "../../components/layout/Footer";
import { useParams } from "react-router-dom";
import getBookActions from "../../utils/buttons";
import {
  updateStatusOfBook,
  deleteUserBook,
  addUserBook,
} from "../../services/book_api";

const API_URL = import.meta.env.VITE_API_URL;

import "./index.css";
import { useEffect, useState } from "react";

// =============================================================================
// Skeleton Loader
// =============================================================================
const SkeletonLoader = () => (
  <div className="skeleton-page">
    <Header />
    <div className="skeleton-content">
      <div className="skeleton-card">
        <div className="skeleton-hero">
          <div className="skeleton-cover" />
          <div className="skeleton-info">
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-subtitle" />
            <div className="skeleton-line skeleton-small" />
            <div className="skeleton-line skeleton-badge" />
            <div className="skeleton-line skeleton-btn" />
          </div>
        </div>
        <div className="skeleton-divider" />
        <div className="skeleton-about">
          <div className="skeleton-line skeleton-about-title" />
          <div className="skeleton-line skeleton-about-text" />
          <div className="skeleton-line skeleton-about-text-short" />
          <div className="skeleton-line skeleton-about-title" style={{ marginTop: 12 }} />
          <div className="skeleton-line skeleton-about-text" />
          <div className="skeleton-line skeleton-about-text" />
          <div className="skeleton-line skeleton-about-text-short" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// =============================================================================
// Status Icons
// =============================================================================
const statusIcons = {
  neutral: "📚",
  info: "📖",
  warning: "📗",
  success: "✅",
};

// =============================================================================
// Main Component
// =============================================================================
const DetailedViewPage = () => {
  const { id } = useParams();
  const [bookDetailed, setBook] = useState(null);
  const [bookStatus, setBookStatus] = useState("not user book");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // tracks which action value is loading

  const fetchBookById = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/user-books/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonBook = await response.json();
      setBookStatus(jsonBook.statusOfBook);
      setBook(jsonBook.book);
    } catch (err) {
      console.error("Error fetching book:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookById();
  }, []);

  // ---------------------------------------------------------------------------
  // Action handler
  // ---------------------------------------------------------------------------
  const handleAction = async (actionValue) => {
    setActionLoading(actionValue);
    try {
      if (bookStatus === "not user book") {
        // Adding book to library
        await addUserBook(id, actionValue);
      } else if (actionValue === "remove") {
        // Removing book from library
        await deleteUserBook(id);
      } else {
        // Updating status
        await updateStatusOfBook(id, actionValue);
      }
      // Refresh book status after API call
      await fetchBookById();
    } catch (err) {
      console.error("Action failed:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // ---------------------------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------------------------
  if (isLoading) {
    return <SkeletonLoader />;
  }

  // ---------------------------------------------------------------------------
  // Error state
  // ---------------------------------------------------------------------------
  if (error || !bookDetailed) {
    return (
      <div className="detailed-error">
        <span className="detailed-error-icon">😔</span>
        <h2 className="detailed-error-title">Couldn't load the book</h2>
        <p className="detailed-error-msg">{error || "Something went wrong"}</p>
        <button className="detailed-retry-btn" onClick={() => { setIsLoading(true); fetchBookById(); }}>
          Try Again
        </button>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Get actions for current status
  // ---------------------------------------------------------------------------
  const { statusLabel, statusVariant, actions } = getBookActions(bookStatus);

  return (
    <div className="detailed-page">
      <Header />

      <div className="detailed-page-content">
        <div className="detailed-card">
          {/* ── Hero Section ── */}
          <div className="detailed-hero">
            <div className="detailed-cover-wrapper">
              <img
                src={bookDetailed.coverPic}
                alt={bookDetailed.title}
                className="detailed-cover"
              />
            </div>

            <div className="detailed-info">
              <h1 className="detailed-title">{bookDetailed.title}</h1>
              <p className="detailed-author">by {bookDetailed.authorName}</p>

              <span className="detailed-rating">
                <span className="detailed-rating-star">⭐</span>
                {bookDetailed.rating} / 5
              </span>

              {bookDetailed.bookUrl && (
                <a
                  href={bookDetailed.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detailed-read-link"
                >
                  📖 Read this Book
                </a>
              )}

              {/* Status Badge */}
              <div className="detailed-status-row">
                <span className="detailed-status-label">Status</span>
                <span className={`detailed-status-badge badge-${statusVariant}`}>
                  {statusIcons[statusVariant]} {statusLabel}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="detailed-actions">
                {actions.map((action) => (
                  <button
                    key={action.value}
                    className={`action-btn action-btn-${action.variant}`}
                    disabled={actionLoading !== null}
                    onClick={() => handleAction(action.value)}
                  >
                    {actionLoading === action.value ? (
                      <span className="btn-spinner" />
                    ) : null}
                    {actionLoading === action.value ? "Processing..." : action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <hr className="detailed-divider" />

          {/* ── About Sections ── */}
          <div className="detailed-about">
            {bookDetailed.aboutAuthor && (
              <div className="about-section">
                <h2 className="about-section-title">About the Author</h2>
                <p className="about-section-text">{bookDetailed.aboutAuthor}</p>
              </div>
            )}
            {bookDetailed.aboutBook && (
              <div className="about-section">
                <h2 className="about-section-title">About the Book</h2>
                <p className="about-section-text">{bookDetailed.aboutBook}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailedViewPage;
