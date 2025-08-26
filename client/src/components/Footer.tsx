export default function Footer() {
  return (
    <footer className="relative w-full bg-slate-900 text-gray-300 mt-16 border-t border-gray-800 overflow-hidden">

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-30 blur-3xl animate-gradient"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
 
        <div>
          <h2 className="text-2xl font-bold text-white">Caprae Capital</h2>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Building the future with data, precision, and innovation.
          </p>
          <div className="flex gap-4 mt-6">
            {["twitter", "linkedin", "github"].map((social) => (
              <a
                key={social}
                href="#"
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <img
                  src={`/${social}.svg`}
                  alt={social}
                  className="w-5 h-5"
                />
              </a>
            ))}
          </div>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2">
            {["About", "Careers", "Press", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Resources</h3>
          <ul className="mt-4 space-y-2">
            {["Blog", "Help Center", "Privacy Policy", "Terms"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

  
        <div>
          <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
          <p className="mt-4 text-sm text-gray-400">
            Subscribe to our newsletter for the latest insights.
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-500 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>


      <div className="border-t border-gray-800 mt-10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Caprae. All rights reserved.
      </div>
    </footer>
  );
}
