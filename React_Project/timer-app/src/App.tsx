import { useState } from "react";
import StopwatchPage from "./components/StopwatchPage";
import TimerPage from "./components/TimerPage";

const App = () => {
  const [activeTab, setActiveTab] = useState<"timer" | "stopwatch">("timer");

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Stopwatch & Countdown Timer App
          </h1>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-1.5 rounded-full flex gap-2 relative shadow-2xl">
            <button
              onClick={() => setActiveTab("timer")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative z-10 cursor-pointer ${
                activeTab === "timer"
                  ? "bg-white text-black shadow-xl scale-105"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Timer
            </button>
            <button
              onClick={() => setActiveTab("stopwatch")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative z-10 cursor-pointer ${
                activeTab === "stopwatch"
                  ? "bg-white text-black shadow-xl scale-105"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="10" y1="2" x2="14" y2="2" />
                <line x1="12" y1="14" x2="15" y2="11" />
                <circle cx="12" cy="14" r="8" />
              </svg>
              Stopwatch
            </button>
          </div>
        </div>

        <div className="w-full transition-all duration-500 ease-in-out transform">
          {activeTab === "timer" ? <TimerPage /> : <StopwatchPage />}
        </div>
      </div>
    </div>
  );
};

export default App;
