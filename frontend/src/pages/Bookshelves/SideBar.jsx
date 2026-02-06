import "./index.css";
import { Link, useLocation } from "react-router-dom";

const shelves = [
  { label: "Suggested", path: "/books" },
  { label: "Want to Read", path: "/user-books?status=want_to_read" },
  { label: "Currently Reading", path: "/user-books?status=current_reading" },
  { label: "Completed", path: "/user-books?status=completed" },
  { label: "All", path: "/user-books" },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="side-con">
      <h2>Bookshelves</h2>
      <ul className="side-list">
        {shelves.map((shelf) => {
          const isActive = location.pathname + location.search === shelf.path;
          return (
            <li key={shelf.label}>
              <Link
                to={shelf.path}
                className={isActive ? "active-link" : "link"}
              >
                {shelf.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
