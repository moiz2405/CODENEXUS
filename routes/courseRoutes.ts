import express from 'express';
import { addCourse, getAllCourses, getCourseById } from '../controllers/courseController';

const router = express.Router();

// Add a new course
router.post('/add', async (req, res) => {
  try {
    const course = await addCourse(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all courses
router.get('/all', async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
