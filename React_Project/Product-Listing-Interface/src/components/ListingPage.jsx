import { useEffect, useState } from "react";
import axios from "axios";

const ListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get(
          "https://api.freeapi.app/api/v1/public/randomproducts",
        );
        setProducts(res.data?.data?.data ?? []);
      } catch (err) {
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm shadow-slate-200/40">
          Loading products...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm shadow-red-200/40">
          {error}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:shadow-lg hover:shadow-slate-200/60"
            >
              <img
                className="h-52 w-full object-cover"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.25em] text-slate-500">
                  <span>{product.category}</span>
                  <span className="rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-500">
                    {product.brand}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Price
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      ${product.price}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Stock
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {product.stock}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                    ⭐ {product.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ListingPage;
