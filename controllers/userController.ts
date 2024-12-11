import User from '../models/user';
import Course from '../models/course';

// Enroll a user in a course
export async function enrollUserInCourse(userId: string, courseId: string) {
  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      throw new Error('User or Course not found');
    }

    // Avoid duplicate enrollments
    if (course.enrolledUsers.includes(userId)) {
      throw new Error('User is already enrolled in this course');
    }

    // Update Course and User
    course.enrolledUsers.push(user._id);
    await course.save();

    user.enrolledCourses.push(course._id);
    await user.save();

    return { message: 'User successfully enrolled in the course' };
  } catch (error) {
    throw error;
  }
}

// Get all courses a user is enrolled in
export async function getUserEnrolledCourses(userId: string) {
  try {
    const user = await User.findById(userId).populate('enrolledCourses');
    if (!user) {
      throw new Error('User not found');
    }
    return user.enrolledCourses;
  } catch (error) {
    throw error;
  }
}
