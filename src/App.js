import "./App.css";
import React, { useState } from "react";
import useSound from "use-sound"; //npm install use-sound
import music from "./audio/nothing mix adc _01.mp3";

function App() {
  const [time, setTime] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [play] = useSound(music);

  const runTimer = () => {
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
    setDisabled(true);
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
      <button onClick={runTimer} disabled={disabled}>
        Run
      </button>
      <p>{`${Math.floor((time * 60) / 60)}:${Math.floor((time * 60) % 60)}`}</p>
      <button onClick={resetApp}>Reset</button>
    </div>
  );
}

export default App;
