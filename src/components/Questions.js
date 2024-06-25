import Options from "./Options";

function Questions({ curQuestion, options, index, answer, dispatch }) {
  return (
    <div>
      <h4>{curQuestion.question}</h4>
      <Options
        curQuestion={curQuestion}
        options={options}
        answer={answer}
        dispatch={dispatch}
      />
    </div>
  );
}

export default Questions;
