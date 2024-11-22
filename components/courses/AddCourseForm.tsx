"use client";

import React, { useState } from "react";

const AddCourseForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const courseData = {
      title,
      videoUrl,
      thumbnailUrl: thumbnailUrl || "https://via.placeholder.com/150",
      path,
      description,
    };

    const res = await fetch("/courses/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData),
    });

    const result = await res.json();
    if (res.ok) {
      alert(result.message);
      setTitle("");
      setVideoUrl("");
      setThumbnailUrl("");
      setPath("");
      setDescription("");
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Course</h2>
      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Course Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="videoUrl" className="form-label">Video URL</label>
          <input
            type="url"
            id="videoUrl"
            placeholder="Enter Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnailUrl" className="form-label">Thumbnail URL</label>
          <input
            type="url"
            id="thumbnailUrl"
            placeholder="Enter Thumbnail URL (Optional)"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="path" className="form-label">Path</label>
          <input
            type="text"
            id="path"
            placeholder="Enter Path (e.g., Full Stack)"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description (Optional)</label>
          <textarea
            id="description"
            placeholder="Enter Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
          />
        </div>

        <button type="submit" className="submit-button">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourseForm;
