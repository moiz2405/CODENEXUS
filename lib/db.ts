import { Database } from 'sqlite3';
import { open } from 'sqlite';
const path = require('path');
const fs = require('fs');

// Function to remove the existing database file if it exists
// async function removeOldDatabaseFile() {
//   const dbPath = path.join('/tmp', 'my-database.db'); // Path to your database file
//   console.log(`Checking for old database file at: ${dbPath}`);

//   try {
//     // Check if the database file exists
//     if (fs.existsSync(dbPath)) {
//       console.log(`Found old database file: ${dbPath}`);
//       console.log('Attempting to delete the file...');
//       fs.unlinkSync(dbPath); // Synchronously delete the file
//       console.log('Old database file deleted successfully.');
//     } else {
//       console.log('No old database file found.');
//     }
//   } catch (error) {
//     console.error('Error removing old database file:', error);
//   }
// }

// // Call the function to check if it works
// removeOldDatabaseFile().then(() => {
//   console.log('File removal process completed.');
// }).catch((error) => {
//   console.error('Error during file removal:', error);
// });
// Function to open the database connection
export async function openDB() {
  const dbPath = path.join('/tmp', 'my-database.db'); // Use the /tmp directory in Vercel

  // Check if the directory exists, and create if not
  if (!fs.existsSync(path.dirname(dbPath))) {
    console.log('Directory does not exist, creating it...');
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  }

  console.log('Database path:', dbPath);

  const db = await open({
    filename: dbPath,
    driver: Database,
  });

  console.log('Connected to the SQLite database stored in /tmp.');
  return db;
}

// Function to initialize the database (create tables if not exist)
export async function initializeDb() {
  const db = await openDB(); // Use the openDB function here

  try {
    // Check if the table exists before creating
    const tableCheckQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='courses'`;
    const table = await db.get(tableCheckQuery);
    if (table) {
      console.log('Courses table already exists, skipping creation.');
    } else {
      console.log('Creating courses table...');
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
    }
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
      // Full Stack Courses
      ['Moiz Full Stack Course 1', 'https://www.youtube.com/', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/fullstack/1.jpg', 'Full Stack', 'Introduction to Full Stack Development'],
      ['Shikhar Stack Course 2', 'https://sample-video-url-2.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/fullstack/2.jpg', 'Full Stack', 'Front-End Basics'],
      ['Bhuvan Stack Course 3', 'https://sample-video-url-3.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/fullstack/3.jpg', 'Full Stack', 'Back-End Fundamentals'],
      ['Full Stack Course 4', 'https://sample-video-url-4.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/fullstack/4.jpg', 'Full Stack', 'Advanced JavaScript'],
      ['Full Stack Course 5', 'https://sample-video-url-5.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/fullstack/5.jpg', 'Full Stack', 'Node.js for Beginners'],
      ['Full Stack Course 6', 'https://sample-video-url-6.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/fullstack/6.jpg', 'Full Stack', 'React.js Introduction'],
      ['Full Stack Course 7', 'https://sample-video-url-7.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/fullstack/7.jpg', 'Full Stack', 'Database Integration with MongoDB'],
      ['Full Stack Course 8', 'https://sample-video-url-8.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/fullstack/8.jpg', 'Full Stack', 'Building RESTful APIs'],

      // DSA Courses
      ['DSA Course 1', 'https://sample-video-url-9.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/dsa/1.jpg', 'DSA', 'Introduction to Data Structures and Algorithms'],
      ['DSA Course 2', 'https://sample-video-url-10.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/dsa/2.jpg', 'DSA', 'Arrays and Linked Lists'],
      ['DSA Course 3', 'https://sample-video-url-11.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/dsa/3.jpg', 'DSA', 'Stacks and Queues'],
      ['DSA Course 4', 'https://sample-video-url-12.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/dsa/4.jpg', 'DSA', 'Trees and Graphs'],
      ['DSA Course 5', 'https://sample-video-url-13.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/dsa/5.jpg', 'DSA', 'Dynamic Programming and Greedy Algorithms'],
      ['DSA Course 6', 'https://sample-video-url-14.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/dsa/6.jpg', 'DSA', 'Backtracking Algorithms'],
      ['DSA Course 7', 'https://sample-video-url-15.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/dsa/7.jpg', 'DSA', 'Binary Search Algorithms'],
      ['DSA Course 8', 'https://sample-video-url-16.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/dsa/8.jpg', 'DSA', 'Advanced Graph Algorithms'],

      // DevOps Courses
      ['DevOps Course 1', 'https://sample-video-url-17.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/devops/1.jpg', 'DevOps', 'Introduction to DevOps'],
      ['DevOps Course 2', 'https://sample-video-url-18.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/devops/2.jpg', 'DevOps', 'CI/CD Pipeline Basics'],
      ['DevOps Course 3', 'https://sample-video-url-19.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/devops/3.jpg', 'DevOps', 'Docker and Kubernetes for Beginners'],
      ['DevOps Course 4', 'https://sample-video-url-20.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/devops/4.jpg', 'DevOps', 'Automation with Ansible and Terraform'],
      ['DevOps Course 5', 'https://sample-video-url-21.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/devops/5.jpg', 'DevOps', 'Monitoring and Logging in DevOps'],
      ['DevOps Course 6', 'https://sample-video-url-22.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/devops/6.jpg', 'DevOps', 'Infrastructure as Code with Terraform'],
      ['DevOps Course 7', 'https://sample-video-url-23.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/devops/7.jpg', 'DevOps', 'Cloud Infrastructure Automation'],
      ['DevOps Course 8', 'https://sample-video-url-24.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/devops/8.jpg', 'DevOps', 'Continuous Monitoring and Feedback'],

      // Cloud Computing Courses
      ['Cloud Computing Course 1', 'https://sample-video-url-25.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cloud-computing/1.jpg', 'Cloud Computing', 'Introduction to Cloud Computing'],
      ['Cloud Computing Course 2', 'https://sample-video-url-26.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cloud-computing/2.jpg', 'Cloud Computing', 'AWS Fundamentals'],
      ['Cloud Computing Course 3', 'https://sample-video-url-27.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cloud-computing/3.jpg', 'Cloud Computing', 'Azure Fundamentals'],
      ['Cloud Computing Course 4', 'https://sample-video-url-28.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cloud-computing/4.jpg', 'Cloud Computing', 'Google Cloud Platform Basics'],
      ['Cloud Computing Course 5', 'https://sample-video-url-29.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cloud-computing/5.jpg', 'Cloud Computing', 'Serverless Architecture with AWS Lambda'],
      ['Cloud Computing Course 6', 'https://sample-video-url-30.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cloud-computing/6.jpg', 'Cloud Computing', 'Cloud Security Essentials'],
      ['Cloud Computing Course 7', 'https://sample-video-url-31.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cloud-computing/7.jpg', 'Cloud Computing', 'AWS EC2 and S3 Basics'],
      ['Cloud Computing Course 8', 'https://sample-video-url-32.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cloud-computing/8.jpg', 'Cloud Computing', 'Advanced Cloud Architecture'],

      // AI & ML Courses
      ['AI Course 1', 'https://sample-video-url-33.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/ai-ml/1.jpg', 'AI/ML', 'AI Course 1'],
      ['AI Course 2', 'https://sample-video-url-34.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/ai-ml/2.jpg', 'AI/ML', 'AI Course 2'],
      ['AI Course 3', 'https://sample-video-url-35.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/ai-ml/3.jpg', 'AI/ML', 'AI Course 3'],
      ['AI Course 4', 'https://sample-video-url-36.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/ai-ml/4.jpg', 'AI/ML', 'AI Course 4'],
      ['Machine Learning 1', 'https://sample-video-url-37.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/ai-ml/5.jpg', 'AI/ML', 'ML Course 5'],
      ['Machine Learning 2', 'https://sample-video-url-38.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/ai-ml/6.jpg', 'AI/ML', 'ML Course 6'],
      ['Machine Learning 3', 'https://sample-video-url-39.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/ai-ml/7.jpg', 'AI/ML', 'ML Course 7'],
      ['Machine Learning 4', 'https://sample-video-url-40.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/ai-ml/8.jpg', 'AI/ML', 'ML Course 8'],

      // Web Development Courses
      ['Web Development Course 1', 'https://sample-video-url-41.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/web-development/1.jpg', 'Web Development', 'Introduction to Web Development'],
      ['Web Development Course 2', 'https://sample-video-url-42.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/web-development/2.jpg', 'Web Development', 'HTML and CSS Basics'],
      ['Web Development Course 3', 'https://sample-video-url-43.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/web-development/3.jpg', 'Web Development', 'JavaScript and DOM Manipulation'],
      ['Web Development Course 4', 'https://sample-video-url-44.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/web-development/4.jpg', 'Web Development', 'Responsive Web Design'],
      ['Web Development Course 5', 'https://sample-video-url-45.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/web-development/5.jpg', 'Web Development', 'React.js Basics'],
      ['Web Development Course 6', 'https://sample-video-url-46.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/web-development/6.jpg', 'Web Development', 'Advanced JavaScript'],
      ['Web Development Course 7', 'https://sample-video-url-47.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/web-development/7.jpg', 'Web Development', 'Node.js for Web Development'],
      ['Web Development Course 8', 'https://sample-video-url-48.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/web-development/8.jpg', 'Web Development', 'Building Full-Stack Applications with MERN'],
      
       // Front-End Development Courses
  ['Front-End Course 1', 'https://sample-video-url-49.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/frontend/1.jpg', 'Front End', 'Introduction to Front-End Development'],
  ['Front-End Course 2', 'https://sample-video-url-50.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/frontend/2.jpg', 'Front End', 'HTML and CSS Basics'],
  ['Front-End Course 3', 'https://sample-video-url-51.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/frontend/3.jpg', 'Front End', 'JavaScript for Front-End Developers'],
  ['Front-End Course 4', 'https://sample-video-url-52.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/frontend/4.jpg', 'Front End', 'Responsive Web Design'],
  ['Front-End Course 5', 'https://sample-video-url-53.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/frontend/5.jpg', 'Front End', 'React.js Basics'],
  ['Front-End Course 6', 'https://sample-video-url-54.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/frontend/6.jpg', 'Front End', 'Vue.js Essentials'],
  ['Front-End Course 7', 'https://sample-video-url-55.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/frontend/7.jpg', 'Front End', 'Building Front-End Applications with Angular'],
  ['Front-End Course 8', 'https://sample-video-url-56.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/frontend/8.jpg', 'Front End', 'Front-End Performance Optimization'],

  // Back-End Development Courses
  ['Back-End Course 1', 'https://sample-video-url-57.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/backend/1.jpg', 'Back End', 'Introduction to Back-End Development'],
  ['Back-End Course 2', 'https://sample-video-url-58.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/backend/2.jpg', 'Back End', 'Node.js for Beginners'],
  ['Back-End Course 3', 'https://sample-video-url-59.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/backend/3.jpg', 'Back End', 'Building APIs with Express.js'],
  ['Back-End Course 4', 'https://sample-video-url-60.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/backend/4.jpg', 'Back End', 'Database Design with MongoDB'],
  ['Back-End Course 5', 'https://sample-video-url-61.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/backend/5.jpg', 'Back End', 'Authentication and Authorization Basics'],
  ['Back-End Course 6', 'https://sample-video-url-62.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/backend/6.jpg', 'Back End', 'Scaling Back-End Systems'],
  ['Back-End Course 7', 'https://sample-video-url-63.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/backend/7.jpg', 'Back End', 'Serverless Back-End Development'],
  ['Back-End Course 8', 'https://sample-video-url-64.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/backend/8.jpg', 'Back End', 'Advanced Back-End Security Practices'],

  // Cyber Security Courses
  ['Cyber Security Course 1', 'https://sample-video-url-65.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cybersecurity/1.jpg', 'Cyber Security', 'Introduction to Cyber Security'],
  ['Cyber Security Course 2', 'https://sample-video-url-66.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cybersecurity/2.jpg', 'Cyber Security', 'Basics of Network Security'],
  ['Cyber Security Course 3', 'https://sample-video-url-67.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cybersecurity/3.jpg', 'Cyber Security', 'Ethical Hacking Fundamentals'],
  ['Cyber Security Course 4', 'https://sample-video-url-68.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cybersecurity/4.jpg', 'Cyber Security', 'Web Application Security'],
  ['Cyber Security Course 5', 'https://sample-video-url-69.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cybersecurity/5.jpg', 'Cyber Security', 'Understanding Cryptography'],
  ['Cyber Security Course 6', 'https://sample-video-url-70.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cybersecurity/6.jpg', 'Cyber Security', 'Incident Response and Forensics'],
  ['Cyber Security Course 7', 'https://sample-video-url-71.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cybersecurity/7.jpg', 'Cyber Security', 'Securing Cloud Environments'],
  ['Cyber Security Course 8', 'https://sample-video-url-72.com', 'https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/cybersecurity/8.jpg', 'Cyber Security', 'Penetration Testing Advanced Techniques'],
  

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
