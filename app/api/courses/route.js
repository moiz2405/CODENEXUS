import { connectMongoDB } from '../../lib/db';
import Course from '../../models/course';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectMongoDB(); // Connect to MongoDB

    // Query parameters
    const { path, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Validate query parameters
    if (path && typeof path !== 'string') {
      return res.status(400).json({ message: 'Invalid path parameter' });
    }

    // Filter and fetch courses
    const filter = path ? { path } : {};
    const totalCourses = await Course.countDocuments(filter);
    const courses = await Course.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json({
      courses,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCourses / limit),
        totalCourses,
      },
    });
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
}
