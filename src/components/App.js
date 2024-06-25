import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import Footer from "./Footer";

const initialState = {
  questions: [],
  answer: null,
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
      return { ...state, status: "active" };

    case "answer":
      return { ...state, answer: action.payload };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    default:
      return "Unknown";
  }
}

function App() {
  const [{ questions, index, status, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions?.length;
  const curQuestion = questions?.at(index);
  const options = curQuestion?.incorrect_answers
    .concat(curQuestion.correct_answer)
    .sort();

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
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Questions
              curQuestion={curQuestion}
              index={index}
              options={options}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer answer={answer} dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
