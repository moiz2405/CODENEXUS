// Feedback.tsx

"use client";
import React, { useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Feedback() {
  const { user, error, isLoading } = useUser();
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit feedback.");
      return;
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback,
          email: user.email, // Using the logged-in user's email
        }),
      });

      if (response.ok) {
        setFeedback("");
        setIsSubmitted(true);
      } else {
        console.error("Error saving feedback");
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl text-black font-bold mb-6">Send Us Your Feedback!</h1>
      <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <label htmlFor="email" className="block mb-2">Your Email Address:</label>
        <input
          type="email"
          id="email"
          value={user ? user.email : ""}
          readOnly
          className="w-full p-2 border rounded-lg mb-4"
        />
        <label htmlFor="feedback" className="block mb-2">Your Feedback:</label>
        <textarea
          id="feedback"
          placeholder="Share your thoughts..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4 h-32 resize-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black p-2 rounded-3xl"
        >
          Submit Feedback
        </button>
      </form>
      {isSubmitted && <p className="mt-4 text-green-400">Thank you for your feedback!</p>}
    </div>
  );
}
