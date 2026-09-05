const API_URL = import.meta.env.VITE_API_URL;

export const updateStatusOfBook = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/user-books/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating book status:", error.message);
    throw error;
  }
};

export const deleteUserBook = async (id) => {
  try {
    const response = await fetch(`${API_URL}/user-books/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting book:", error.message);
    throw error;
  }
};

export const addUserBook = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/user-books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: id, status }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add book");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding book:", error.message);
    throw error;
  }
};
