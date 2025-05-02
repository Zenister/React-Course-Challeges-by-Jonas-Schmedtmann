import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}
const options = {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
};

function Counter() {
  // const currentDate = new Date();
  // const tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());

  function nextCount() {
    setCount((count) => count + step);
    setDate((date) => {
      const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000 * step);
      return tomorrow;
    });
  }
  function prevCount() {
    setCount((count) => count - Math.abs(step));
    setDate((date) => {
      const tomorrow = new Date(
        date.getTime() - 24 * 60 * 60 * 1000 * Math.abs(step)
      );
      return tomorrow;
    });
  }
  function nextStep() {
    setStep((step) => step + 1);
  }
  function prevStep() {
    setStep((step) => step - 1);
  }
  console.log(`step ${step}`);
  console.log(`count ${count}`);
  return (
    <div>
      <div>
        <button onClick={prevStep}>- </button>
        STEP: {step}
        <button onClick={nextStep}>+</button>
      </div>
      <button onClick={prevCount}>-</button>
      COUNT: {count}
      <button onClick={nextCount}>+</button>
      <p>
        {count > 0
          ? `${count} day${count > 1 ? "s" : ""} from today `
          : "Today "}
        is {date.toLocaleDateString("en-US", options).replace(/,/g, "")}
      </p>
    </div>
  );
}
