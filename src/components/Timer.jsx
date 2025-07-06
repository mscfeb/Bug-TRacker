import React, { useState, useEffect } from 'react';

const Timer = ({ taskId, timeSpent, onTimeUpdate }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const handleStop = () => {
    setIsRunning(false);
    onTimeUpdate(taskId, seconds);
    setSeconds(0); // reset local timer
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={() => setIsRunning((prev) => !prev)}
        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      {isRunning && (
        <button
          onClick={handleStop}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Stop & Save
        </button>
      )}
      <span className="text-sm text-gray-600">
        +{Math.floor(timeSpent / 60)}m {timeSpent % 60 + seconds}s
      </span>
    </div>
  );
};

export default Timer;
