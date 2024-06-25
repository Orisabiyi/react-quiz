function Options({ answer, curQuestion, options, dispatch }) {
  return (
    <div className="options">
      <div className="options">
        {options.map((option) => (
          <button
            className={`btn btn-option ${answer === option ? "answer" : ""} ${
              answer
                ? option === curQuestion["correct_answer"]
                  ? "correct"
                  : "wrong"
                : ""
            } `}
            onClick={() => dispatch({ type: "answer", payload: option })}
            disabled={answer ? true : false}
            key={option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
