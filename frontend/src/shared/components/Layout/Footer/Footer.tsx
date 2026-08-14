const Footer = () => {
  return (
    <footer className="app-footer">
      <span className="app-footer-brand">jsyk</span>
      <span>Just so you know.</span>
      <span>© {new Date().getFullYear()} · <a href="https://x.com/monaski_">built by monaski</a></span>
    </footer>
  );
};

export default Footer;
