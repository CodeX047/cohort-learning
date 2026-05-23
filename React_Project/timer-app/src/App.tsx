import StopwatchPage from "./components/StopwatchPage";
import TimerPage from "./components/TimerPage";

const App = () => {
  return (
    <div className="bg-[#f4f1f4] text-black h-screen">
      <h1 className="text-4xl text-center">Timer App</h1>
      <div>
        <TimerPage />
      </div>
      <div>
        <StopwatchPage />
      </div>
    </div>
  );
};

export default App;
