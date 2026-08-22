const API_URL = import.meta.env.VITE_API_URL;  

const getBooks = async () => {
  const url = `${API_URL}/global/books`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data.data; // ✅ THIS is returned
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export default getBooks;
