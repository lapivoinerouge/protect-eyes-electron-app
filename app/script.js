import React, { useMemo, useState } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = useMemo(() => {
    let s = time % 60;
    let m = (time - s) / 60;

    let formattedTime = (m < 10) ? `0${m}:` : `${m}:`
    formattedTime += (s < 10) ? `0${s}` : `${s}`
    return formattedTime;
  }, [time]);

  const startTimer = () => {
    setTime(1200);
    setStatus('work');
    setTimer(setInterval(() => {
      setTime(time => time - 1);
      if (time === 0 && status === 'work') {
        playBell();
        setStatus('rest');
        setTime(120);
      } else if (time === 0 && status === 'rest') {
        playBell();
        setStatus('work');
        setTime(1200);
      }
    }, 1000));
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTime(0);
    setStatus('off');
  };

  const closeApp = () => {
    window.close();
  };

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  return (
    <div>
        <h1>Protect your eyes</h1>
      { status === 'off' &&
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>}
      { status === 'work' &&
        <img src="./images/work.png" />}
      { status === 'rest' && <img src="./images/rest.png" />}
      <div className="timer">
        {formatTime}
      </div>
      { status === 'off' &&
      <button className="btn" onClick={startTimer}>Start</button>}
      { status !== 'off' && 
      <button className="btn" onClick={stopTimer}>Stop</button>}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
};

module.exports = App;

render(<App />, document.querySelector('#app'));
