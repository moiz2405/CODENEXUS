"use client";
import React, { useState } from "react";

export default function Feedback() {
    const [feedback, setFeedback] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedback, email }),
            });

            if (response.ok) {
                setFeedback("");
                setEmail("");
                setIsSubmitted(true);
            } else {
                console.error("Failed to submit feedback");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
    };

    return ( 
        <div 
          className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-[url('../public/images/grainy.png')]"
          style={{ backgroundSize: "cover", backgroundPosition: "center" }}
        >
             <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 bg-transparent mt-5">
                 <h1 className="text-3xl text-white font-bold mb-6">Send Us Your <span className="text-[#000000]   bg-yellow-400">Feedback!</span></h1>
                 <form
                     className="w-full max-w-md bg-white p-6 rounded-lg shadow-slate-800"
                     onSubmit={handleSubmit}
                    >
                        <label htmlFor="email" className="block mb-2 text-gray-700">
                           Your Email Address:
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="feedback" className="block mb-2 text-gray-700">
                          Your Feedback:
                        </label>
                        <textarea
                          id="feedback"
                          placeholder="Share your thoughts..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="w-full p-2 border rounded-lg mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        ></textarea>
                        <button
                         type="submit"
                         className="w-full bg-yellow-400 text-black font-bold p-2 rounded-3xl shadow-lg hover:bg-[#0e342b] transition"
                        >
                           Submit Feedback
                        </button>
                    </form>
                    {isSubmitted && (
                        <p className="mt-4 text-yellow-400 text-4xl">Thank you for your feedback!</p>
                    )}
             </div>
        </div>
        
     
    );
}
