import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const totalBill = (bill * (percentage1 + percentage2)) / 100 / 2;

  function resetButton() {
    setBill(0);
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <Bill bill={bill} setBill={setBill} />
      <Percentage percentage={percentage1} setPercentage={setPercentage1}>
        How did you like the services?
      </Percentage>
      <Percentage percentage={percentage2} setPercentage={setPercentage2}>
        How did your friend like the service
      </Percentage>
      <DisplayBill bill={bill} totalBill={totalBill} onReset={resetButton} />
    </div>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      How much was the bill?
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </div>
  );
}

function Percentage({ children, percentage, setPercentage }) {
  return (
    <div>
      {children}
      <select
        value={percentage}
        onChange={(e) => setPercentage(Number(e.target.value))}
      >
        <option value="0">Dissastisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

function DisplayBill({ bill, totalBill, onReset }) {
  return (
    <div>
      {bill ? (
        <>
          <h1>
            You pay ${bill + totalBill} (${bill} + ${totalBill} tip)
          </h1>
          <Reset onReset={onReset} />
        </>
      ) : null}
    </div>
  );
}

function Reset({ onReset }) {
  return (
    <div>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
