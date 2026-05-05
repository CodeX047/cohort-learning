import { useEffect, useState } from "react";
import axios from "axios";

const Cat = () => {
  const [randomCat, setRandomCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomCat = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://api.freeapi.app/api/v1/public/cats/cat/random",
      );
      setRandomCat(response.data.data);
    } catch (error) {
      setError("Error fetching random cat: " + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCat();
  }, []);

  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }

  if (!randomCat) {
    return <div className="text-center py-8">Loading cat...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <img
        src={randomCat.image || "/placeholder.png"}
        alt={randomCat.name || "Cat"}
        className="w-96 h-96 object-cover rounded-lg shadow-lg"
      />

      <div className="text-center max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">{randomCat.name}</h2>

        <p className="text-gray-600 mb-4">
          {randomCat.description || "No description available"}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <strong>Origin:</strong> {randomCat.origin || "N/A"}
          </div>
          <div>
            <strong>Weight:</strong> {randomCat?.weight?.imperial || "N/A"} lbs
          </div>
          <div>
            <strong>Life Span:</strong> {randomCat.life_span || "N/A"} years
          </div>
          <div>
            <strong>Energy Level:</strong> {randomCat.energy_level ?? "N/A"}/5
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4">
          <strong>Temperament:</strong> {randomCat.temperament || "Unknown"}
        </p>

        <button
          onClick={fetchRandomCat}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Get Another Cat"}
        </button>
      </div>
    </div>
  );
};

export default Cat;
