const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-5 mt-10">
      &copy; {new Date().getFullYear()} something — Built with ❤️ by monaski
      <div className="flex justify-center gap-2 py-2">
        <a href="/terms">Terms</a>
        <a href="/Privacy">Privacy</a>
      </div>
    </footer>
  );
};

export default Footer;
