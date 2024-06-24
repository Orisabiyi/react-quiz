function Questions({ questions, index, children }) {
  const curQuestion = questions.at(index);

  return (
    <div>
      <h4>{curQuestion.question}</h4>
      {children}
    </div>
  );
}

export default Questions;
