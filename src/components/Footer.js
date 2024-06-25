function Footer({ answer, dispatch }) {
  return (
    <footer>
      {answer && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
    </footer>
  );
}

export default Footer;
