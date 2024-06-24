import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "open":
      return { ...state, isActive: !state.isActive, balance: 500 };

    case "deposit":
      return { ...state, balance: state.balance + 150 };

    case "withdraw":
      return { ...state, balance: state.balance - 50 };

    case "loan":
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: state.loan + 5000,
        balance: state.balance + 5000,
      };

    case "payLoan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - Math.abs(state.loan),
      };

    case "close":
      return state.balance === 0 && state.loan === 0
        ? { ...initialState }
        : { ...state };

    default:
      return "unknown";
  }
}

function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <button
        style={{ padding: "10px" }}
        onClick={() => dispatch({ type: "open" })}
        disabled={isActive}
      >
        Open account
      </button>
      <button
        style={{ padding: "10px" }}
        onClick={() => dispatch({ type: "deposit" })}
        disabled={isActive ? false : true}
      >
        Desposit 150
      </button>
      <button
        style={{ padding: "10px" }}
        onClick={() => dispatch({ type: "withdraw" })}
        disabled={isActive ? false : true}
      >
        Withdraw 50
      </button>
      <button
        style={{ padding: "10px" }}
        onClick={() => dispatch({ type: "loan" })}
        disabled={isActive ? false : true}
      >
        Request a loan of 5000
      </button>
      <button
        style={{ padding: "10px" }}
        onClick={() => dispatch({ type: "payLoan" })}
        disabled={isActive ? false : true}
      >
        Pay loan
      </button>
      <button
        style={{ padding: "10px" }}
        onClick={() => dispatch({ type: "close" })}
        disabled={isActive ? false : true}
      >
        Close Account
      </button>
    </div>
  );
}

export default App;
