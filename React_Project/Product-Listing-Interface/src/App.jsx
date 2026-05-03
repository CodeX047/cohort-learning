import ListingPage from "./components/ListingPage";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 space-y-3">
          <p className="text-2xl font-semibold text-center uppercase tracking-[0.3em] text-slate-500">
            Product listing
          </p>
        </header>
        <ListingPage />
      </div>
    </div>
  );
};

export default App;
