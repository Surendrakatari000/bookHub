const getBooks = async () => {
  const url = "http://localhost:4073/books";

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
