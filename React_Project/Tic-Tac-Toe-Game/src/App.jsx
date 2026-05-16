import Box from "./components/Box";

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4 bg-[#f4f4f1] text-[#010110]">
      <h1 className="text-7xl underline text-center">Tic Tac Toe</h1>
      <hr />
      <Box />
    </div>
  );
};

export default App;
