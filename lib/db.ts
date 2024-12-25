import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || ''; // Add your Supabase URL in environment variable
const supabaseKey = process.env.SUPABASE_KEY || ''; // Add your Supabase anon/public key

// Create a supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch data from the 'courses' table
export async function fetchCourses(path?: string) {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq(path ? 'path' : '', path)
      .order('id', { ascending: true }); // Adjust your sorting or filtering based on requirements

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Failed to fetch courses');
  }
}

// Function to insert a new course
export async function insertCourse(course: {
  title: string;
  videoUrl: string;
  thumbnailurl?: string;
  path: string;
  description?: string;
}) {
  try {
    const { data, error } = await supabase.from('courses').insert([course]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error inserting course:', error);
    throw new Error('Failed to insert course');
  }
}
