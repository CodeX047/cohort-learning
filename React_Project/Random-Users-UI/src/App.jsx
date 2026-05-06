import Users from "./components/Users";

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center text-blue-600">
            Random Users
          </h1>
        </div>
      </header>
      <Users />
    </div>
  );
};

export default App;
