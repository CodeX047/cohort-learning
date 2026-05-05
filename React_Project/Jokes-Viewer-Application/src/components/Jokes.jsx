import { useEffect, useState } from "react";

const Jokes = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJokes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomjokes",
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = await response.json();
      setJokes(json.data?.data || []);
    } catch (fetchError) {
      console.error("Error fetching jokes:", fetchError);
      setError("Failed to load jokes. Please try again.");
      setJokes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {loading && <p className="text-gray-700">Loading jokes...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="space-y-4">
        {jokes.map((joke) => (
          <div
            key={joke.id}
            className="bg-white border border-gray-200 p-4 rounded shadow-sm"
          >
            <p className="text-lg leading-relaxed">
              {joke.id}. {joke.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jokes;
