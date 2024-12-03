"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDB = openDB;
exports.initializeDb = initializeDb;
exports.insertDummyData = insertDummyData;
exports.setupDatabase = setupDatabase;
var sqlite3_1 = require("sqlite3");
var sqlite_1 = require("sqlite");
var path = require('path');
var fs = require('fs');
// Function to remove the existing database file if it exists
function removeOldDatabaseFile() {
    return __awaiter(this, void 0, void 0, function () {
        var dbPath;
        return __generator(this, function (_a) {
            dbPath = path.join('/tmp', 'my-database.db');
            console.log("Checking for old database file at: ".concat(dbPath));
            try {
                // Check if the database file exists
                if (fs.existsSync(dbPath)) {
                    console.log("Found old database file: ".concat(dbPath));
                    console.log('Attempting to delete the file...');
                    fs.unlinkSync(dbPath); // Synchronously delete the file
                    console.log('Old database file deleted successfully.');
                }
                else {
                    console.log('No old database file found.');
                }
            }
            catch (error) {
                console.error('Error removing old database file:', error);
            }
            return [2 /*return*/];
        });
    });
}
// Call the function to check if it works
removeOldDatabaseFile().then(function () {
    console.log('File removal process completed.');
}).catch(function (error) {
    console.error('Error during file removal:', error);
});
// Function to open the database connection
function openDB() {
    return __awaiter(this, void 0, void 0, function () {
        var dbPath, db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dbPath = path.join('/tmp', 'my-database.db');
                    // Check if the directory exists, and create if not
                    if (!fs.existsSync(path.dirname(dbPath))) {
                        console.log('Directory does not exist, creating it...');
                        fs.mkdirSync(path.dirname(dbPath), { recursive: true });
                    }
                    console.log('Database path:', dbPath);
                    return [4 /*yield*/, (0, sqlite_1.open)({
                            filename: dbPath,
                            driver: sqlite3_1.Database,
                        })];
                case 1:
                    db = _a.sent();
                    console.log('Connected to the SQLite database stored in /tmp.');
                    return [2 /*return*/, db];
            }
        });
    });
}
// Function to initialize the database (create tables if not exist)
function initializeDb() {
    return __awaiter(this, void 0, void 0, function () {
        var db, tableCheckQuery, table, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, openDB()];
                case 1:
                    db = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, 8, 10]);
                    tableCheckQuery = "SELECT name FROM sqlite_master WHERE type='table' AND name='courses'";
                    return [4 /*yield*/, db.get(tableCheckQuery)];
                case 3:
                    table = _a.sent();
                    if (!table) return [3 /*break*/, 4];
                    console.log('Courses table already exists, skipping creation.');
                    return [3 /*break*/, 6];
                case 4:
                    console.log('Creating courses table...');
                    // Create the 'courses' table with the new schema
                    return [4 /*yield*/, db.exec("\n        CREATE TABLE IF NOT EXISTS courses (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          title TEXT NOT NULL,\n          videoUrl TEXT NOT NULL,\n          thumbnailUrl TEXT DEFAULT 'https://via.placeholder.com/150',\n          path TEXT NOT NULL,\n          description TEXT\n        )\n      ")];
                case 5:
                    // Create the 'courses' table with the new schema
                    _a.sent();
                    console.log('Courses table initialized with updated schema.');
                    _a.label = 6;
                case 6: return [3 /*break*/, 10];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error initializing the database:', error_1);
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, db.close()];
                case 9:
                    _a.sent(); // Ensure the connection is closed
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
// Function to insert dummy data into the database for testing
function insertDummyData() {
    return __awaiter(this, void 0, void 0, function () {
        var db, dummyCourses, insertQuery, _i, dummyCourses_1, course, checkQuery, count, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, openDB()];
                case 1:
                    db = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 9, 10, 12]);
                    dummyCourses = [
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
                    insertQuery = "\n      INSERT INTO courses (title, videoUrl, thumbnailUrl, path, description)\n      VALUES (?, ?, COALESCE(?, 'https://via.placeholder.com/150'), ?, ?)\n    ";
                    _i = 0, dummyCourses_1 = dummyCourses;
                    _a.label = 3;
                case 3:
                    if (!(_i < dummyCourses_1.length)) return [3 /*break*/, 8];
                    course = dummyCourses_1[_i];
                    checkQuery = "SELECT COUNT(*) FROM courses WHERE title = ?";
                    return [4 /*yield*/, db.get(checkQuery, [course[0]])];
                case 4:
                    count = _a.sent();
                    if (!(count['COUNT(*)'] === 0)) return [3 /*break*/, 6];
                    console.log('Inserting course:', course[0]);
                    return [4 /*yield*/, db.run(insertQuery, course)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    console.log("Course \"".concat(course[0], "\" already exists, skipping."));
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8:
                    console.log('Dummy courses added for testing.');
                    return [3 /*break*/, 12];
                case 9:
                    error_2 = _a.sent();
                    console.error('Error inserting dummy data:', error_2);
                    return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, db.close()];
                case 11:
                    _a.sent(); // Ensure the connection is closed
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
// Function to set up the database (initialize tables and insert dummy data)
function setupDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // Initialize the database and create tables
                    return [4 /*yield*/, initializeDb()];
                case 1:
                    // Initialize the database and create tables
                    _a.sent();
                    console.log('Database initialized successfully.');
                    // Insert dummy data into the courses table
                    return [4 /*yield*/, insertDummyData()];
                case 2:
                    // Insert dummy data into the courses table
                    _a.sent();
                    console.log('Dummy data inserted successfully.');
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error setting up the database:', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Call setupDatabase to initialize and populate the database
setupDatabase();
