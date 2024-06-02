import { useState, useEffect, useRef } from "react";
import { useEvent } from "./useEvent";

export default function Counter() {
  const [count, setCount] = useState(20);
  const [delay, setDelay] = useState(20);

  const { event } = useEvent(delay);

  useEffect(() => {
    const onTick = () => {
      setCount((count) => count + event.current );
    };
    console.log("✅mounted", count);
    const id = setInterval(onTick, 1000);

    return () => {
      clearInterval(id);
      console.log("❌unmounted", count);
    };
  }, []);
  
  return (
    <>
      {/* <button onClick={() => setCount((n) => n + 10)}>Click</button> */}
      <input
        type="range"
        value={delay}
        max={100}
        min={1}
        onChange={(e) => {
          setDelay(+e.currentTarget.value);
        }}
      />
      <h1>Delay passed: {delay}</h1>
      <h1>Seconds passed: {count}</h1>
    </>
  );
}
///можно сделать так, чтобы таймер не останавливался?
const users = [
  { id: 1, name: "John", age: 3 },
  { id: 2, name: "John", age: 3 },
  { id: 3, name: "John", age: 3 },
];
