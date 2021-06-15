import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import useSound from "use-sound"; //npm install use-sound
import music from "./audio/nothing mix adc _01.mp3";

function App() {
  const [time, setTime] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isOngoing, setIsOnGoing] = useState(false);
  const [play, { stop }] = useSound(music);
  const runInterval = useRef(null);

  useEffect(() => {
    if (isOngoing) {
      const startTimer = new Date().getTime();
      const endTimer = startTimer + time * 60 * 1000 + 1000;

      runInterval.current = setInterval(() => {
        let currentTimer = new Date().getTime();
        let countTimer = endTimer - currentTimer;
        setMinutes(() => Math.floor(countTimer / 60000) % 60);
        setSeconds(() => Math.floor(countTimer / 1000) % 60);

        //if on time, play music
        checkTimer(countTimer);
      }, 1000);
    }
    return () => clearInterval(runInterval.current);
  }, [isOngoing]);

  const handleChange = ({ target }) => {
    setTime(target.value);
  };

  const checkTimer = (time) => {
    if (time < 0) {
      clearInterval(runInterval.current);
      runInterval.current = null;
      setTime(0);
      setMinutes(0);
      setSeconds(0);
      setIsOnGoing(false);
      play();
      document.getElementById("inputNumber").value = 0;
    }
  };

  const runTimer = () => {
    setIsOnGoing(true);
  };

  const resetApp = () => {
    clearInterval(runInterval.current);
    runInterval.current = null;
    setTime(0);
    setMinutes(0);
    setSeconds(0);
    setIsOnGoing(false);
    stop();
    document.getElementById("inputNumber").value = 0;
  };

  return (
    <div className="App">
      <input
        id="inputNumber"
        type="number"
        placeholder="Type minutes"
        onChange={handleChange}
      />
      <button onClick={runTimer}>Run</button>
      <p>{`${minutes}:${seconds}`}</p>
      <button onClick={resetApp}>Reset</button>
    </div>
  );
}

export default App;
