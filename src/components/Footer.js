function Footer({ answer }) {
  return (
    <footer>{answer && <button className="btn btn-ui">Next</button>}</footer>
  );
}

export default Footer;
