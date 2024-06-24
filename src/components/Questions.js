function Questions({ questions, options, index, dispatch }) {
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <div className="options">
        {options.map((option) => (
          <button
            className={`btn btn-option ${
              option === questions[index].correct_answer ? "correct" : "wrong"
            }`}
            onClick={() => dispatch({ type: "answer", payload: option })}
            key={option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questions;
