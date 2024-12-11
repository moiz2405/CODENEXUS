import Course from '../models/course';

// Add a course
export async function addCourse(data: any) {
  try {
    const course = new Course(data);
    await course.save();
    return course;
  } catch (error) {
    throw error;
  }
}

// Get all courses
export async function getAllCourses() {
  try {
    return await Course.find();
  } catch (error) {
    throw error;
  }
}

// Get course by ID
export async function getCourseById(id: string) {
  try {
    return await Course.findById(id);
  } catch (error) {
    throw error;
  }
}
