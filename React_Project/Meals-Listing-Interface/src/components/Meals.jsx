import { useEffect, useState } from "react";
import axios from "axios";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          "https://api.freeapi.app/api/v1/public/meals",
        );
        setMeals(response.data?.data?.data || []);
      } catch (fetchError) {
        setError("There was a problem loading meals. Please try again later.");
        console.error("Error fetching meals:", fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const getTruncatedInstructions = (text) => {
    if (!text) return "No recipe instructions available.";
    return text.length > 180 ? `${text.slice(0, 180).trim()}...` : text;
  };

  return (
    <section className="rounded-4xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
      {loading ? (
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/70 p-10 text-center text-slate-300">
          Loading meals...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center text-red-200">
          {error}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {meals.map((meal) => (
            <article
              key={meal.idMeal}
              className="group overflow-hidden rounded-4xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/50 transition duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:bg-slate-900/95"
            >
              <div className="aspect-4/3 overflow-hidden bg-slate-900">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-200 ring-1 ring-sky-500/10">
                    {meal.strCategory || "Unknown"}
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200 ring-1 ring-emerald-500/10">
                    {meal.strArea || "Global"}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {meal.strMeal}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {getTruncatedInstructions(meal.strInstructions)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {meal.strTags ? (
                    meal.strTags
                      .split(",")
                      .slice(0, 3)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                        >
                          {tag}
                        </span>
                      ))
                  ) : (
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                      No tags
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {meal.strYoutube && (
                    <a
                      href={meal.strYoutube}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
                    >
                      Watch video
                    </a>
                  )}
                  {meal.strSource ? (
                    <a
                      href={meal.strSource}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
                    >
                      View source
                    </a>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-400">
                      No external link
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Meals;
