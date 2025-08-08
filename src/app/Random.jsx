// components/RandomQuote.js
"use client";

import React, { useState } from "react";
import "./Random.css";

const demotivatingQuotes = [
  "You? Achieve something? That's a good joke.",
  "If procrastination was a sport, you'd be a world champion.",
  "Your comfort zone has a VIP seat reserved just for you.",
  "Remember that goal you set? Neither does anyone else.",
  "Every time you say 'I'll start tomorrow,' tomorrow laughs.",
  "Your dreams called. They’re moving on without you.",
  "You have as much motivation as a broken alarm clock.",
  "If effort was required, you’d probably skip it.",
  "The only thing you’re consistent at is giving up.",
  "You’re proof that not everyone is destined for greatness.",
  "Why reach for the stars when your bed is so much closer?",
  "You could surprise everyone by succeeding, but let's be real.",
  "Ambition looks at you and quietly walks away.",
  "If you were any lazier, you’d be a statue.",
  "Your goals are safe. You’ll never chase them.",
];

function Random() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * demotivatingQuotes.length);
      setQuote(demotivatingQuotes[randomIndex]);
      setLoading(false);
    }, 500); // Simulate loading
  };

  // Show a quote on initial mount
  React.useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-container">
      <div className="quote-card">
        <h2 className="quote-title">Ammavan's Wisdom</h2>
        <div className="quote-content">
          {loading && (
            <p className="loading-text">
              Thinking of something pointless to say...
            </p>
          )}
          {quote && !loading && (
            <blockquote className="quote-text">“{quote}”</blockquote>
          )}
        </div>
        <button
          className="quote-button"
          onClick={fetchQuote}
          disabled={loading}
        >
          {loading ? "Wait, you potta..." : "Get Another Useless Quote"}
        </button>
      </div>
    </div>
  );
}

export default Random;
