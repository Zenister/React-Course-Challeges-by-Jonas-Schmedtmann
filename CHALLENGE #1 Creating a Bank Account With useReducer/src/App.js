import { useReducer } from "react";
import "./styles.css";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

// Can be passed as a payload: someValue on the dispatch function
// { ...state, balance: state.balance + action.payload}
const STARTING_BALANCE = 500;
const DEPOSIT = 150;
const WITHDRAW = 50;
const LOAN = 5000;

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  isAlreadyLoan: false,
};

function reducer(state, action) {
  // copied solution from Jonas to not rely on the UI
  if (!state.isActive && action.type !== "openAccount") return state;

  switch (action.type) {
    case "openAccount":
      return { ...state, balance: STARTING_BALANCE, isActive: true };
    case "deposit":
      return { ...state, balance: state.balance + DEPOSIT };
    case "withdraw":
      return {
        ...state,
        balance:
          state.balance >= WITHDRAW ? state.balance - WITHDRAW : state.balance,
      };
    case "requestLoan":
      // Note: I did not use if(someCondition) return statement here
      return {
        ...state,
        loan: state.isAlreadyLoan ? state.loan : LOAN,
        balance: state.isAlreadyLoan ? state.balance : state.balance + LOAN,
        isAlreadyLoan: true,
      };
    case "payLoan":
      return {
        ...state,
        loan: 0,
        balance: !state.isAlreadyLoan ? state.balance : state.balance - LOAN,
        isAlreadyLoan: false,
        // to prevent negative balance
        // balance:
        //   state.balance <= LOAN || !state.isAlreadyLoan
        //     ? state.balance
        //     : state.balance - LOAN,
      };
    case "closeAccount":
      if (state.balance === 0 && state.loan === 0) return { ...initialState };
      else return { ...state };

    default:
      throw new Error("Action not found!");
  }
}

export default function App() {
  const [{ balance, loan, isActive, isAlreadyLoan }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            if (!isActive) dispatch({ type: "openAccount" });
          }}
          disabled={false}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit" });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw" });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "requestLoan" });
          }}
          disabled={!isActive && !isAlreadyLoan}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={!isActive || !isAlreadyLoan}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
