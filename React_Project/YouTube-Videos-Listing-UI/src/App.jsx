import ListingPage from "./components/ListingPage";

const App = () => {
  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen">
      <h1 className="text-[2.5rem] font-bold text-center py-4">
        YouTube<sup>IN</sup>
      </h1>
      <hr />
      <ListingPage />
    </div>
  );
};

export default App;
