import React, { useState, useEffect } from "react";
import EventList from "./components/EventList";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [view, setView] = useState("home");
  const [dark, setDark] = useState(false);
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState("");

  const quotes = [
    "✨ Make memories, not excuses.",
    "🎉 Every event is a new story waiting to happen.",
    "💫 Great things start with great gatherings!",
    "🌸 Connect. Celebrate. Cherish.",
    "🌈 Your vibe attracts your tribe.",
  ];

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const changeQuote = () => {
      const random = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[random]);
    };
    changeQuote();
    const quoteInterval = setInterval(changeQuote, 5000);
    return () => clearInterval(quoteInterval);
  }, []);

  // Update live time
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Format time and date
  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Tailwind pastel classes
  const bgClass = dark ? "bg-slate-900" : "bg-pink-50";
  const textClass = dark ? "text-gray-100" : "text-pink-900";

  const buttonClass =
    "px-3 py-2 rounded-md font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg";

  return (
    <div className={`${bgClass} min-h-screen p-6 transition-colors duration-500`}>
      {/* HEADER */}
      <header className="mb-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <h1 className={`text-3xl font-bold mb-3 md:mb-0 ${textClass}`}>
            🎉 Event Registration Pro
          </h1>

          <nav className="flex flex-wrap items-center gap-2">
            <button
              className={`${buttonClass} ${dark ? "bg-purple-700" : "bg-pink-200"}`}
              onClick={() => setView("home")}
            >
              🏠 Home
            </button>
            <button
              className={`${buttonClass} ${dark ? "bg-purple-700" : "bg-pink-200"}`}
              onClick={() => setView("register")}
            >
              ✍️ Register
            </button>
            <button
              className={`${buttonClass} ${dark ? "bg-purple-700" : "bg-pink-200"}`}
              onClick={() => setView("admin")}
            >
              🛠 Admin
            </button>
            <button
              className={`${buttonClass} ${dark ? "bg-green-600" : "bg-green-200"}`}
              onClick={() => setDark(!dark)}
            >
              {dark ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </nav>
        </div>

        <div className="mt-3 text-center md:text-right text-sm italic text-gray-500">
          🕒 {formattedTime} | 📅 {formattedDate}
        </div>
      </header>

      {/* QUOTE SECTION */}
      <section className="max-w-5xl mx-auto mb-6 text-center">
        <p className="italic text-purple-500 text-lg">{quote}</p>
      </section>

      {/* MAIN VIEW */}
      <main className="max-w-5xl mx-auto">
        {view === "home" && <EventList dark={dark} />}
        {view === "register" && <Register />}
        {view === "admin" && <AdminDashboard />}
      </main>

      {/* FOOTER */}
      <footer
        className={`mt-12 text-center py-4 ${dark ? "text-gray-400" : "text-pink-700"}`}
      >
        💖 Made with React, Tailwind & Pastel Vibes 🎨
      </footer>
    </div>
  );
}







