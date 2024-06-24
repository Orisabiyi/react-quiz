function Questions({ questions, options, index, dispatch }) {
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <div className="options">
        {options.map((option) => (
          <button
            className={`btn btn-option`}
            onClick={() => dispatch({ type: "" })}
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
