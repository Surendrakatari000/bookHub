import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_API_URL;

import originalStatus from "../utils/statusUpdate";

export const updateStatusOfBook = async (id, updateSatusvalue) => {
  // const token = Cookies.get("token");

  try {
    const body = {
      status: originalStatus(updateSatusvalue),
    };
    console.log(body);
    const response = await fetch(`${API_URL}/user-books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonBook = await response.json();
    console.log(jsonBook);
  } catch (error) {
    console.error("Error fetching book:", error.message);
  }
};

export const deleteUserBook = async (id) => {
  // const token = Cookies.get("token");

  try {
    const response = await fetch(`${API_URL}/user-books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Deleted book:", result);

    return result; // ✅ important for UI update
  } catch (error) {
    console.error("Error deleting book:", error.message);
  }
};

export const addUserBook = async (id, addStatus) => {
  // const token = Cookies.get("token");

  // if (!token) {
  //   throw new Error("User not authenticated");
  // }

  const body = {
    bookId: id,
    status: originalStatus(addStatus),
  };
  console.log(originalStatus(addStatus));
  try {
    const response = await fetch(`${API_URL}/user-books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add book");
    }

    const result = await response.json();
    return result; // ✅ important
  } catch (error) {
    console.error("Error adding book:", error.message);
    throw error;
  }
};
