import "./App.css";
import React, { useState } from "react";

function App() {
  const [time, setTime] = useState(0);

  const runTimer = () => {
    const intervalid = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return (prev * 60 - 1) / 60;
        } else {
          clearInterval(intervalid);
          window.open("https://youtu.be/kaf8PRNobYI", "_blank");
          window.location.reload();
          return 0;
        }
      });
    }, 1000);
  };

  const handleChange = ({ target }) => {
    setTime(target.value);
  };

  return (
    <div className="App">
      <input type="number" placeholder="Type minutes" onChange={handleChange} />
      <button onClick={runTimer}>Run</button>
      <p>{`${Math.floor((time * 60) / 60)}:${Math.floor((time * 60) % 60)}`}</p>
    </div>
  );
}

export default App;
