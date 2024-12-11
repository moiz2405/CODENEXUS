import express from 'express';
import { enrollUserInCourse, getUserEnrolledCourses } from '../controllers/userController';

const router = express.Router();

// Enroll a user in a course
router.post('/enroll', async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    const result = await enrollUserInCourse(userId, courseId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all enrolled courses for a user
router.get('/:userId/enrolled-courses', async (req, res) => {
  try {
    const courses = await getUserEnrolledCourses(req.params.userId);
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
