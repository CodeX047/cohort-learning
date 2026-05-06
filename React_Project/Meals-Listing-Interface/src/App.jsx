import Meals from "./components/Meals";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 sm:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl text-center">
          Meals Recipes
        </h1>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-8">
        <Meals />
      </main>
    </div>
  );
};

export default App;
