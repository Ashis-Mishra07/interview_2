"use client"
import React, { useState, useEffect } from 'react'

function TimerComponent() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setMinutes(prevMinutes => {
              if (prevMinutes === 59) {
                setHours(prevHours => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Format numbers to have leading zeros
  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  // Optional: Functions to control the timer
  const pauseTimer = () => setIsRunning(false);
  const resumeTimer = () => setIsRunning(true);
  const resetTimer = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-lg border">
      <div className="text-gray-800 font-medium">
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </div>

      {/* Optional: Control buttons */}
      {/*
      <div className="flex gap-1 ml-2">
        {isRunning ? (
          <button onClick={pauseTimer} className="text-xs">Pause</button>
        ) : (
          <button onClick={resumeTimer} className="text-xs">Resume</button>
        )}
        <button onClick={resetTimer} className="text-xs">Reset</button>
      </div>
      */}
    </div>
  )
}

export default TimerComponent