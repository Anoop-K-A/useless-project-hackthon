// app/Demotivation.js
"use client"; // Add this line at the top

import React, { useState } from "react";
import "./Demotivation.css";

export default function App() {
  const [goal, setGoal] = useState("");
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!goal.trim()) {
      setError("Please enter a goal first. I can't mock thin air.");
      return;
    }

    setError("");
    setReply("");
    setIsLoading(true);

    try {
      // Call YOUR OWN API endpoint, not Groq's
      const response = await fetch("/api/troll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }), // Send the goal in the request body
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setReply(data.reply);
    } catch (err) {
      console.error("Error fetching from API route:", err);
      setError(err.message);
      setReply("Aiyyo! My brain short-circuited. Try again shortly.");
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <div className="header">
          <h1 className="title">The Dream Crusher</h1>
          <p className="subtitle">
            Tell me your ambitious goal. I'll give you the reality check you
            need.
          </p>
        </div>

        <div className="input-group">
          <input
            id="goal"
            type="text"
            value={goal}
            className="goal-input"
            placeholder="e.g., 'I want to be a famous YouTuber'"
            onChange={(e) => setGoal(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className="send-button"
            disabled={isLoading}
          >
            {isLoading ? "Crushing..." : "Crush My Dream"}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {reply && !isLoading && (
          <div className="troll-response">
            <strong className="response-title">The Realist says:</strong>
            <p className="response-text">{reply}</p>
          </div>
        )}
      </div>
    </div>
  );
}
