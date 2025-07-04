import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [hitBoxSize, setHitBoxSize] = useState(50);
  const [hitBoxFrequency, setHitBoxFrequency] = useState(800);
  const [timeLimit, setTimeLimit] = useState(10);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [gameStarted, setGameStarted] = useState(false);
  const hitBoxRef = useRef(null);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (gameStarted) {
      const hitBox = hitBoxRef.current;
      const parent = hitBox.offsetParent;
      const bounds = {
        x: parent.clientWidth - hitBoxSize,
        y: parent.clientHeight - hitBoxSize,
      };
      const timer = setInterval(() => {
        hitBox.style.left = `${Math.floor(Math.random() * bounds.x)}px`;
        hitBox.style.top = `${Math.floor(Math.random() * bounds.y)}px`;
        hitBox.style.backgroundColor = getRandomColor();
        hitBox.style.visibility = "visible";
        setCounter((c) => c + 1);
      }, hitBoxFrequency);
      return () => {
        clearInterval(timer);
      };
    }
  }, [gameStarted, hitBoxSize, hitBoxFrequency]);

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTimeRemaining((t) => {
          if (t > 0) {
            return t - 1;
          } else {
            setGameStarted(false);
            return 0;
          }
        });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [gameStarted]);

  const startGame = () => {
    setScore(0);
    setCounter(0);
    setTimeRemaining(timeLimit);
    setGameStarted(true);
  };

  return (
    <div className="App">
      <div
        style={{
          fontFamily: "sans-serif",
          fontSize: "14px",
          position: "absolute",
          height: "30px",
          width: "auto",
          padding: "15px",
          display: "flex",
          gap: "20px",
          top: 0,
        }}
      >
        <div>
          {counter} Targets | {score} Hits | {counter - score} Miss
        </div>
        <div>Time Remaining: {timeRemaining}s</div>
      </div>
      {!gameStarted && (
        <div className="settings">
          <h2>Aim Trainer Settings</h2>
          <div className="setting">
            <label>Hit Box Size (px):</label>
            <input
              type="number"
              value={hitBoxSize}
              max="100"
              onChange={(e) => setHitBoxSize(parseInt(e.target.value))}
            />
          </div>
          <div className="setting">
            <label>Hit Box Frequency (ms):</label>
            <input
              type="number"
              value={hitBoxFrequency}
              max="1500"
              onChange={(e) => setHitBoxFrequency(parseInt(e.target.value))}
            />
          </div>
          <div className="setting">
            <label>Time Limit (s):</label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(parseInt(e.target.value))}
            />
          </div>
          <button onClick={startGame}>Start</button>
        </div>
      )}
      {gameStarted && (
        <div
          onClick={() => {
            setScore((prev) => prev + 1);
            hitBoxRef.current.style.visibility = "hidden";
          }}
          ref={hitBoxRef}
          style={{
            height: `${hitBoxSize}px`,
            width: `${hitBoxSize}px`,
            backgroundColor: "white",
            position: "absolute",
            borderRadius: "50%",
            visibility: "hidden",
            cursor: "pointer",
          }}
        ></div>
      )}
    </div>
  );
}

export default App;
