import Options from "./Options";

function Questions({ questions, index, options, answer, dispatch }) {
  const curQuestion = questions.at(index);

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
