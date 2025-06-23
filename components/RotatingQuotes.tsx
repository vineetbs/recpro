"use client";

import { useEffect, useState } from "react";

const quotes = [
  {
    text: "The single biggest problem in communication is the illusion that it has taken place.",
    author: "George Bernard Shaw",
  },
  {
    text: "Show me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
  },
  {
    text: "Creativity is intelligence having fun.",
    author: "Albert Einstein",
  },
  {
    text: "The most powerful person in the world is the storyteller.",
    author: "Steve Jobs",
  },
  {
    text: "People don't buy what you do; they buy why you do it.",
    author: "Simon Sinek",
  },
];

const RotatingQuotes = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const baseClasses = "transition-opacity duration-500 ease-in-out max-w-lg";
  const fadeClass = fade ? "opacity-100" : "opacity-0";

  return (
    <div className="h-full w-full flex items-center justify-center px-6 text-center">
      <div className={`${baseClasses} ${fadeClass}`}>
        <p className="text-xl italic text-gray-700 mb-4">
          “{quotes[index].text}”
        </p>
        <p className="text-sm font-semibold text-gray-500">
          — {quotes[index].author}
        </p>
      </div>
    </div>
  );
};
export default RotatingQuotes;
