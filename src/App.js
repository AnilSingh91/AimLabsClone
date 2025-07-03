import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const hitBoxRef = useRef(null);
  useEffect(() => {
    const hitBox = hitBoxRef.current;
    if (hitBox) {
      const parent = hitBox.offsetParent;
      const bounds = {
        x: parent.clientWidth - 50,
        y: parent.clientHeight - 100,
      };
      const timer = setInterval(() => {
        hitBox.style.left = `${Math.floor(Math.random() * bounds.x)}px`;
        hitBox.style.top = `${Math.floor(Math.random() * bounds.y)}px`;
        hitBox.style.visibility = "visible";
        setCounter((c) => c + 1);
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

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
        }}
      >
        {counter} Targets | {score} Hits | {counter - score} Miss
      </div>
      <div
        onClick={() => {
          setScore((prev) => prev + 1);
        }}
        ref={hitBoxRef}
        style={{
          height: "50px",
          width: "50px",
          backgroundColor: "white",
          position: "absolute",
          borderRadius: "50%",
          visibility: "hidden",
          cursor: "pointer",
        }}
      ></div>
    </div>
  );
}

export default App;
