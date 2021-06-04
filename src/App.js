import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import useSound from "use-sound"; //npm install use-sound
import music from "./audio/nothing mix adc _01.mp3";

function App() {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [onGoing, setOnGoing] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [playSound, { stop }] = useSound(music);

  let minutes = Math.floor(remainingSeconds / 60);
  let seconds = Math.floor(remainingSeconds % 60);
  const timer = useRef(null);

  useEffect(() => {
    if (!onGoing && isTriggered) {
      setOnGoing(true);
      timer.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearTimer();
            playSound();
            return 0;
          }
        });
      }, 1000);
    }
  }, [isTriggered]);

  const runTimer = () => {
    if (!onGoing && remainingSeconds > 0) {
      setIsTriggered(true);
    }
  };

  const clearTimer = () => {
    clearInterval(timer.current);
    timer.current = null;
    setOnGoing(false);
    setIsTriggered(false);
    setRemainingSeconds(0);
    document.getElementById("inputTime").value = 0;
  };

  const resetApp = () => {
    clearTimer();
    stop();
  };

  const handleChange = ({ target }) => {
    if (!onGoing) {
      let inputMinute = target.value;
      setRemainingSeconds(inputMinute * 60);
    }
  };

  return (
    <div className="App">
      <input
        id="inputTime"
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
