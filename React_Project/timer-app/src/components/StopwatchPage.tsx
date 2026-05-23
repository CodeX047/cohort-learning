import { useEffect, useRef, useState } from "react";

const StopwatchPage = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/stopwatch-sound.mp3");

    audioRef.current.loop = true;

    audioRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = async () => {
    if (!isRunning) {
      try {
        await audioRef.current?.play();
      } catch (error) {
        console.log("Audio play failed:", error);
      }
    }

    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    audioRef.current?.pause();
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const hours = Math.floor(timer / 3600000);
  const minutes = Math.floor((timer % 3600000) / 60000);
  const seconds = Math.floor((timer % 60000) / 1000);
  const milliseconds = Math.floor((timer % 1000) / 10);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(2, "0");

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-zinc-400 text-sm tracking-[0.3em] uppercase">
            Stopwatch
          </h1>

          <div className="text-5xl md:text-6xl font-bold text-white tracking-wider">
            {formattedHours}:{formattedMinutes}:{formattedSeconds}
            <span className="text-zinc-500 text-3xl ml-2">
              .{formattedMilliseconds}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleStart}
              className="
                bg-white text-black
                px-6 py-2.5
                rounded-full
                font-medium
                hover:scale-105
                transition
              "
            >
              Start
            </button>

            <button
              onClick={handlePause}
              className="
                bg-zinc-800 text-white
                px-6 py-2.5
                rounded-full
                font-medium
                hover:bg-zinc-700
                transition
              "
            >
              Pause
            </button>

            <button
              onClick={handleReset}
              className="
                bg-red-500 text-white
                px-6 py-2.5
                rounded-full
                font-medium
                hover:bg-red-400
                transition
              "
            >
              Reset
            </button>
          </div>

          <div className="text-sm text-zinc-500">
            {isRunning ? "Running..." : "Paused"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopwatchPage;
