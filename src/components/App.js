import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "start" };
    default:
      return "Unknown";
  }
}

function App() {
  const [{ status, questions }, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    async function getQuestions() {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`
        );

        if (!response.ok) throw new Error("Error Fetching questions");

        const data = await response.json();

        if (!data.results) return;

        dispatch({ type: "dataReceived", payload: data.results });
      } catch (error) {
        dispatch({ type: "error" });
      }
    }

    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen dispatch={dispatch} />}
      </Main>
    </div>
  );
}

export default App;
