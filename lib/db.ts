import { Database } from 'sqlite3';
import { open } from 'sqlite';

// Function to open the database connection
export async function openDB() {
  const db = await open({
    filename: './my-database.db',
    driver: Database, // Use Database from sqlite3 as the driver
  });

  console.log('Connected to the database.');
  return db;
}

// Function to initialize the database (create tables if not exist)
export async function initializeDb() {
  const db = await openDB(); // Use the openDB function here

  try {
    // Check if the table exists before dropping
    const tableCheckQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='courses'`;
    const table = await db.get(tableCheckQuery);
    if (table) {
      console.log('Courses table already exists, dropping it...');
      await db.exec('DROP TABLE IF EXISTS courses');
    }

    // Create the 'courses' table with the new schema
    await db.exec(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        videoUrl TEXT NOT NULL,
        thumbnailUrl TEXT DEFAULT 'https://via.placeholder.com/150',
        path TEXT NOT NULL,
        description TEXT
      )
    `);

    console.log('Courses table initialized with updated schema.');
  } catch (error) {
    console.error('Error initializing the database:', error);
  } finally {
    await db.close(); // Ensure the connection is closed
  }
}

// Function to insert dummy data into the database for testing
export async function insertDummyData() {
  const db = await openDB();

  try {
    const dummyCourses = [
        // Full Stack Path
        ['Moiz FULL stack ', 'https://sample-video-url-1.com', 'https://sample-thumbnail-url-1.com', 'Full Stack', 'Introduction to Full Stack Development'],
        ['Full Stack Course 2', 'https://sample-video-url-2.com', 'https://sample-thumbnail-url-2.com', 'Full Stack', 'Front-End Basics'],
        ['Full Stack Course 3', 'https://sample-video-url-3.com', 'https://sample-thumbnail-url-3.com', 'Full Stack', 'Back-End Basics'],
        ['Full Stack Course 4', 'https://sample-video-url-4.com', 'https://sample-thumbnail-url-4.com', 'Full Stack', 'Full Stack Projects'],
        // Front End Path
        ['Front End ', 'https://sample-video-url-1.com', 'https://sample-thumbnail-url-1.com', 'Front End', 'Introduction to Full Stack Development'],
        ['Front End Course 2', 'https://sample-video-url-2.com', 'https://sample-thumbnail-url-2.com', 'Front End', 'Front-End Basics'],
        ['Front End Course 3', 'https://sample-video-url-3.com', 'https://sample-thumbnail-url-3.com', 'Front End', 'Back-End Basics'],
        ['Front End Course 4', 'https://sample-video-url-4.com', 'https://sample-thumbnail-url-4.com', 'Front End', 'Full Stack Projects'],

        // Back End Path
        ['Back End ', 'https://sample-video-url-1.com', 'https://sample-thumbnail-url-1.com', 'Back End', 'Introduction to Full Stack Development'],
        ['Back End Course 2', 'https://sample-video-url-2.com', 'https://sample-thumbnail-url-2.com', 'Back End', 'Front-End Basics'],
        ['Back End Course 3', 'https://sample-video-url-3.com', 'https://sample-thumbnail-url-3.com', 'Back End', 'Back-End Basics'],
        ['Back End Course 4', 'https://sample-video-url-4.com', 'https://sample-thumbnail-url-4.com', 'Back End', 'Full Stack Projects'],


        // DevOps Path
        ['DevOps Course 1', 'https://sample-video-url-5.com', 'https://sample-thumbnail-url-5.com', 'DevOps', 'DevOps Fundamentals'],
        ['DevOps Course 2', 'https://sample-video-url-6.com', 'https://sample-thumbnail-url-6.com', 'DevOps', 'CI/CD Pipelines'],
        ['DevOps Course 3', 'https://sample-video-url-7.com', 'https://sample-thumbnail-url-7.com', 'DevOps', 'Docker and Containers'],
        ['DevOps Course 4', 'https://sample-video-url-8.com', 'https://sample-thumbnail-url-8.com', 'DevOps', 'Kubernetes Basics'],

        // DSA Path
        ['DSA Course 1', 'https://sample-video-url-9.com', 'https://sample-thumbnail-url-9.com', 'DSA', 'Introduction to Data Structures'],
        ['DSA Course 2', 'https://sample-video-url-10.com', 'https://sample-thumbnail-url-10.com', 'DSA', 'Algorithms Basics'],
        ['DSA Course 3', 'https://sample-video-url-11.com', 'https://sample-thumbnail-url-11.com', 'DSA', 'Searching and Sorting Algorithms'],
        ['DSA Course 4', 'https://sample-video-url-12.com', 'https://sample-thumbnail-url-12.com', 'DSA', 'Dynamic Programming'],

        // AI/ML Path
        ['AI/ML Course 1', 'https://sample-video-url-13.com', 'https://sample-thumbnail-url-13.com', 'AI/ML', 'Introduction to AI and ML'],
        ['AI/ML Course 2', 'https://sample-video-url-14.com', 'https://sample-thumbnail-url-14.com', 'AI/ML', 'Supervised Learning'],
        ['AI/ML Course 3', 'https://sample-video-url-15.com', 'https://sample-thumbnail-url-15.com', 'AI/ML', 'Unsupervised Learning'],
        ['AI/ML Course 4', 'https://sample-video-url-16.com', 'https://sample-thumbnail-url-16.com', 'AI/ML', 'Deep Learning Basics'],

        // Cybersecurity Path
        ['Cybersecurity Course 1', 'https://sample-video-url-17.com', 'https://sample-thumbnail-url-17.com', 'Cybersecurity', 'Cybersecurity Basics'],
        ['Cybersecurity Course 2', 'https://sample-video-url-18.com', 'https://sample-thumbnail-url-18.com', 'Cybersecurity', 'Network Security'],
        ['Cybersecurity Course 3', 'https://sample-video-url-19.com', 'https://sample-thumbnail-url-19.com', 'Cybersecurity', 'Ethical Hacking'],
        ['Cybersecurity Course 4', 'https://sample-video-url-20.com', 'https://sample-thumbnail-url-20.com', 'Cybersecurity', 'Advanced Security Techniques'],
      ];

    // Insert sample data for testing in a single query
    const insertQuery = `
      INSERT INTO courses (title, videoUrl, thumbnailUrl, path, description)
      VALUES (?, ?, COALESCE(?, 'https://via.placeholder.com/150'), ?, ?)
    `;

    for (const course of dummyCourses) {
      // Check if the course already exists before inserting
      const checkQuery = `SELECT COUNT(*) FROM courses WHERE title = ?`;
      const count = await db.get(checkQuery, [course[0]]);

      if (count['COUNT(*)'] === 0) {
        console.log('Inserting course:', course[0]);
        await db.run(insertQuery, course);
      } else {
        console.log(`Course "${course[0]}" already exists, skipping.`);
      }
    }

    console.log('Dummy courses added for testing.');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  } finally {
    await db.close(); // Ensure the connection is closed
  }
}

// Function to set up the database (initialize tables and insert dummy data)
export async function setupDatabase() {
  try {
    // Initialize the database and create tables
    await initializeDb();
    console.log('Database initialized successfully.');

    // Insert dummy data into the courses table
    await insertDummyData();
    console.log('Dummy data inserted successfully.');
  } catch (error) {
    console.error('Error setting up the database:', error);
  }
}

// Call setupDatabase to initialize and populate the database
setupDatabase();
