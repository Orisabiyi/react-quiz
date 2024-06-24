import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";

const initialState = {
  questions: [],
  options: null,
  index: 0,
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "start":
      const curQuestion = state.questions[state.index];
      const answerArr = curQuestion.incorrect_answers
        .concat(curQuestion.correct_answer)
        .sort(() => Math.random() - 0.5);

      return {
        ...state,
        status: "start",
        options: answerArr,
      };
    default:
      return "Unknown";
  }
}

function App() {
  const [{ questions, index, options, status }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
        {status === "start" && (
          <Questions
            questions={questions}
            options={options}
            index={index}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
