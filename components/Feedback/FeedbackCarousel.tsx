// FeedbackCarousel.tsx

"use client";
import React, { useState, useEffect } from "react";

const FeedbackCarousel = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('/api/feedback');
        if (!res.ok) {
          throw new Error('Failed to fetch feedbacks');
        }

        const data = await res.json();

        if (data.length === 0) {
          setError("No feedback available.");
        } else {
          setFeedbacks(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <div>Loading feedback...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="carousel-container">
      <h2 className="text-2xl font-bold">User Feedback</h2>
      <div className="carousel">
        {feedbacks.length === 0 ? (
          <p>No feedback available at the moment.</p>
        ) : (
          feedbacks.map((feedback: any, index: number) => (
            <div key={index} className="carousel-item">
              <p>{feedback.feedback}</p>
              <small>- {feedback.email}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackCarousel;
