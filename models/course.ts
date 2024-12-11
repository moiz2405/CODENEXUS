import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  path: { type: String, required: true }, // E.g., 'Full Stack'
  description: { type: String, required: true },
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of User IDs
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
