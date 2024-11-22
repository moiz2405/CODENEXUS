"use client";
import React, { useState, useEffect } from 'react';

interface Video {
  videoUrl: string;
}

interface CourseDetailsProps {
  courseId: number;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ courseId }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      // Assume API returns a list of videos associated with the courseId
      const res = await fetch(`/api/course-videos?courseId=${courseId}`);
      const data = await res.json();
      setVideos(data);
    };

    fetchVideos();
  }, [courseId]);

  return (
    <div className="course-details">
      {videos.map((video, index) => (
        <div key={index} className="video-item">
          <iframe
            width="560"
            height="315"
            src={video.videoUrl}
            title={`Video ${index + 1}`}
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default CourseDetails;
