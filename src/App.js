import {useState, useRef, useEffect} from 'react';
import useSound from 'use-sound';

import music from './audio/nothing mix adc _01.mp3';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [isOngoing, setIsOnGoing] = useState(false);
  const [play, {stop}] = useSound(music);
  const runInterval = useRef(null);

  useEffect(() => {
    if (!isOngoing) return;

    const startTimer = new Date().getTime();
    const endTimer = startTimer + time * 60 * 1000 + 1000;

    runInterval.current = setInterval(() => {
      let currentTimer = new Date().getTime();
      let countTimer = endTimer - currentTimer;

      setHours(() => `0${Math.floor((countTimer / (60 * 60 * 1000)) % 24)}`.slice(-2));
      setMinutes(() => `0${Math.floor(countTimer / (60 * 1000)) % 60}`.slice(-2));
      setSeconds(() => `0${Math.floor(countTimer / 1000) % 60}`.slice(-2));

      //if on time, play music
      checkTimer(countTimer);
    }, 1000);

    return () => clearInterval(runInterval.current);
  }, [isOngoing, time]);

  const resetTime = () => {
    clearInterval(runInterval.current);
    runInterval.current = null;
    setHours('00');
    setMinutes('00');
    setSeconds('00');
    setIsOnGoing(false);
  };

  const checkTimer = (time) => {
    if (time >= 0) return;

    resetTime();
    play();
  };

  const runTimer = (evt) => {
    evt.preventDefault();
    setIsOnGoing(true);
  };

  const handleTaskInput = ({target}) => {
    setTask(target.value);
  };

  const handleTimeInput = ({target}) => {
    setTime(parseInt(target.value));
  };

  const resetApp = () => {
    setTask('');
    setTime('');
    resetTime();
    stop();
  };

  return (
    <div className="App">
      <form onSubmit={runTimer}>
        <input
          name="task"
          type="text"
          placeholder="Type your task"
          value={task}
          onChange={handleTaskInput}
        />
        <input
          name="minutes"
          type="text"
          placeholder="Type minutes"
          value={time}
          onChange={handleTimeInput}
        />
        <input className="submit-btn" type="submit" value="Run" />

        <p>
          Task: {task} || {`${hours}:${minutes}:${seconds}`}
        </p>
      </form>

      <button onClick={resetApp}>Reset</button>
    </div>
  );
}

export default App;
