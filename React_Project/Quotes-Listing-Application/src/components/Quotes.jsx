import { useEffect, useState } from "react";
import axios from "axios";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.freeapi.app/api/v1/public/quotes",
        );
        setQuotes(response.data.data.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setError("Failed to fetch quotes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500 bg-red-50 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500"
        >
          <p className="text-gray-700 text-lg italic mb-4 leading-relaxed">
            "{quote.content}"
          </p>
          <div className="border-t pt-4">
            <p className="text-gray-900 font-semibold text-sm">
              — {quote.author}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quotes;
