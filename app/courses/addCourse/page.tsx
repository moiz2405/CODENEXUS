import { getSession, Session } from '@auth0/nextjs-auth0';
import AddCourseForm from '../../../components/courses/AddCourseForm';

// Define a more specific type for the session object
interface CoursePageProps {
  session: Session | null; // Session or null if not authenticated
}

const CoursePage = async () => {
  const session = await getSession(); // Fetch session from Auth0

  // You can now properly type session and check if it's null
  if (!session?.user) {
    return <p>You must be logged in to view this page.</p>;
  }

  return <AddCourseForm />;
};

export default CoursePage;
