import "./App.css";
import React, { useEffect, useState } from "react";
import useSound from "use-sound"; //npm install use-sound
import music from "./audio/nothing mix adc _01.mp3";

function App() {
  const [time, setTime] = useState(0);
  const [playTimer, setPlayTimer] = useState(false);
  const [play] = useSound(music);

  let minutes = Math.floor((time * 60) / 60);
  let seconds = Math.floor((time * 60) % 60);

  useEffect(() => {
    if (playTimer) {
      const intervalid = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return (prev * 60 - 1) / 60;
          } else {
            clearInterval(intervalid);
            play();
            return 0;
          }
        });
      }, 1000);
    }
  }, [playTimer]);

  const runTimer = () => {
    setPlayTimer(true);
  };

  const resetApp = () => {
    window.location.reload();
  };

  const handleChange = ({ target }) => {
    setTime(target.value);
  };

  return (
    <div className="App">
      <input type="number" placeholder="Type minutes" onChange={handleChange} />
      <button onClick={runTimer}>Run</button>
      <p>{`${minutes}:${seconds}`}</p>
      <button onClick={resetApp}>Reset</button>
    </div>
  );
}

export default App;
