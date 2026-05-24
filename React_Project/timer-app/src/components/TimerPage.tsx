import { useEffect, useRef, useState } from "react";

const TimerPage = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [totalTime, setTotalTime] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    alarmAudioRef.current = new Audio("/alarm-sound.mp3");
  }, []);

  const handleStart = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (!isRunning && totalTime === 0) {
      setTotalTime(totalSeconds);
    }

    if (totalSeconds > 0 || totalTime > 0) {
      setIsRunning(true);
      setIsCompleted(false);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);

    setHours(0);
    setMinutes(0);
    setSeconds(0);

    setTotalTime(0);

    if (alarmAudioRef.current) {
      alarmAudioRef.current.pause();
      alarmAudioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && totalTime > 0) {
      interval = setInterval(() => {
        setTotalTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (totalTime === 0 && isRunning) {
      setIsRunning(false);
      setIsCompleted(true);

      if (alarmAudioRef.current) {
        alarmAudioRef.current.currentTime = 0;
        alarmAudioRef.current.play();
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, totalTime]);

  const displayHours = Math.floor(totalTime / 3600);
  const displayMinutes = Math.floor((totalTime % 3600) / 60);
  const displaySeconds = totalTime % 60;

  const formattedHours = String(displayHours).padStart(2, "0");
  const formattedMinutes = String(displayMinutes).padStart(2, "0");
  const formattedSeconds = String(displaySeconds).padStart(2, "0");

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-zinc-400 text-sm tracking-[0.3em] uppercase">
            Timer
          </h1>

          <div className="text-5xl md:text-6xl font-bold text-white tracking-wider">
            {formattedHours}:{formattedMinutes}:{formattedSeconds}
          </div>

          <div className="grid grid-cols-3 gap-4 w-full">
            <input
              type="number"
              min={0}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              placeholder="HH"
              className="
                bg-zinc-800
                text-white
                text-center
                px-4 py-3
                rounded-xl
                outline-none
                border border-zinc-700
              "
            />

            <input
              type="number"
              min={0}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              placeholder="MM"
              className="
                bg-zinc-800
                text-white
                text-center
                px-4 py-3
                rounded-xl
                outline-none
                border border-zinc-700
              "
            />

            <input
              type="number"
              min={0}
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
              placeholder="SS"
              className="
                bg-zinc-800
                text-white
                text-center
                px-4 py-3
                rounded-xl
                outline-none
                border border-zinc-700
              "
            />
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
            {isCompleted
              ? "Timer Completed!"
              : isRunning
                ? "Running..."
                : "Paused"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
