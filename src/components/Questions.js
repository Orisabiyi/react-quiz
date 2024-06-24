function Questions({ questions, answers, index, dispatch }) {
  if (answers) console.log(answers);
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <div className="options">
        {answers.map((answer) => (
          <button
            className="btn btn-option"
            onClick={() => dispatch({ type: "" })}
            key={answer}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questions;
