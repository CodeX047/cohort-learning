import Quotes from "./components/Quotes";

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="py-8 bg-white shadow">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Inspiring Quotes
        </h1>
      </div>
      <Quotes />
    </div>
  );
};

export default App;
