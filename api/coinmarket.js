import axios from "axios";

const API_KEY = "ba72748f5bcb4b34b05eeca8bcba086c";

export const fetchCryptoNews = async () => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`
    );
    if (response.status === 200) {
      const articles = response.data.articles.slice(0, 5); // Get the first 5 articles
      return articles;
    } else {
      throw new Error("Failed to fetch news articles");
    }
  } catch (error) {
    console.error("Error fetching cryptocurrency news:", error.message);
    return []; // Return an empty array in case of an error
  }
};
