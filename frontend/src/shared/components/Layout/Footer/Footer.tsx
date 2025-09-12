const Footer = () => {
  return (
    <>
      {/* <footer className="text-center text-sm text-gray-600 py-5 mt-10 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      &copy; {new Date().getFullYear()} JSYK — Built with ❤️ by monaski
      <div className="flex justify-center gap-2 py-2">
        <a href="/terms">Terms</a>
        <a href="/Privacy">Privacy</a>
      </div>
    </footer> */}
      <footer className="p-6 backdrop-blur-sm border-t border-white/30  bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold shimmer-text mb-1">JSYK</div>
          <p className="text-gray-600 mb-6">
            Built with ❤️ by{" "}
            <a
              href="https://x.com/monaski_"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200 underline"
            >
              monaski
            </a>
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              Terms
            </a>
            {/* <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              Support
            </a> */}
          </div>
          <p className="text-sm mt-2 text-gray-500">
            &copy;{new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
