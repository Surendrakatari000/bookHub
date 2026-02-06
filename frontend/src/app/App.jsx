import Login from "../auth/login.jsx";
import Signup from "../auth/signup.jsx";
import HomePage from "../pages/HomePage/index.jsx";
import DetailedViewPage from "../pages/detailedBookPage/index.jsx";
import { Routes, Route } from "react-router-dom";
import GlobelBooks from "../pages/Bookshelves/GlobalBooks.jsx";
import UserBooks from "../pages/Bookshelves/UserBooks.jsx";
import UserRoutes from "../protectedRoutes/UserRoutes.jsx";
import PublicOnlyRoute from "../protectedRoutes/PublicOnlyRoute.jsx";
import AdminRoutes from "../protectedRoutes/AdminRoutes.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFound.jsx";
import VerifyMail from "../auth/verify-email.jsx";
import Books from "../admin/pages/book/books.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/admin/books"
        element={
          <AdminRoutes>
            <Books />
          </AdminRoutes>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoutes>
            <HomePage />
          </AdminRoutes>
        }
      />
      <Route
        path="/auth/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <PublicOnlyRoute>
            <Signup />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/auth/verify-mail/:token"
        element={
          <PublicOnlyRoute>
            <VerifyMail />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/"
        element={
          <UserRoutes>
            <HomePage />
          </UserRoutes>
        }
      />

      <Route
        path="/books"
        element={
          <UserRoutes>
            <GlobelBooks />
          </UserRoutes>
        }
      />

      <Route
        path="/books/:id"
        element={
          <UserRoutes>
            <DetailedViewPage />
          </UserRoutes>
        }
      />

      <Route
        path="/user-books"
        element={
          <UserRoutes>
            <UserBooks />
          </UserRoutes>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
