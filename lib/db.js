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
// Function to open the database connection
function openDB() {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, sqlite_1.open)({
                        filename: './my-database.db', // This is the path to the permanent SQLite database file
                        driver: sqlite3_1.Database, // Using SQLite3 driver
                    })];
                case 1:
                    db = _a.sent();
                    console.log('Connected to the permanent database.');
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
                    console.log('Courses table already exists, skipping drop.');
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
                        ['Full Stack Course 1', 'https://sample-video-url-1.com', 'https://sample-thumbnail-url-1.com', 'Full Stack', 'Introduction to Full Stack Development'],
                        ['Full Stack Course 2', 'https://sample-video-url-2.com', 'https://sample-thumbnail-url-2.com', 'Full Stack', 'Front-End Basics'],
                        ['Full Stack Course 3', 'https://sample-video-url-3.com', 'https://sample-thumbnail-url-3.com', 'Full Stack', 'Back-End Fundamentals'],
                        ['Full Stack Course 4', 'https://sample-video-url-4.com', 'https://sample-thumbnail-url-4.com', 'Full Stack', 'Advanced JavaScript'],
                        ['Full Stack Course 5', 'https://sample-video-url-5.com', 'https://sample-thumbnail-url-5.com', 'Full Stack', 'Node.js for Beginners'],
                        ['Full Stack Course 6', 'https://sample-video-url-6.com', 'https://sample-thumbnail-url-6.com', 'Full Stack', 'React.js Introduction'],
                        ['Full Stack Course 7', 'https://sample-video-url-7.com', 'https://sample-thumbnail-url-7.com', 'Full Stack', 'Database Integration with MongoDB'],
                        ['Full Stack Course 8', 'https://sample-video-url-8.com', 'https://sample-thumbnail-url-8.com', 'Full Stack', 'Building RESTful APIs'],
                        // DSA Courses
                        ['DSA Course 1', 'https://sample-video-url-9.com', 'https://sample-thumbnail-url-9.com', 'DSA', 'Introduction to Data Structures and Algorithms'],
                        ['DSA Course 2', 'https://sample-video-url-10.com', 'https://sample-thumbnail-url-10.com', 'DSA', 'Arrays and Linked Lists'],
                        ['DSA Course 3', 'https://sample-video-url-11.com', 'https://sample-thumbnail-url-11.com', 'DSA', 'Stacks and Queues'],
                        ['DSA Course 4', 'https://sample-video-url-12.com', 'https://sample-thumbnail-url-12.com', 'DSA', 'Trees and Graphs'],
                        ['DSA Course 5', 'https://sample-video-url-13.com', 'https://sample-thumbnail-url-13.com', 'DSA', 'Dynamic Programming and Greedy Algorithms'],
                        ['DSA Course 6', 'https://sample-video-url-14.com', 'https://sample-thumbnail-url-14.com', 'DSA', 'Backtracking Algorithms'],
                        ['DSA Course 7', 'https://sample-video-url-15.com', 'https://sample-thumbnail-url-15.com', 'DSA', 'Binary Search Algorithms'],
                        ['DSA Course 8', 'https://sample-video-url-16.com', 'https://sample-thumbnail-url-16.com', 'DSA', 'Advanced Graph Algorithms'],
                        // DevOps Courses
                        ['DevOps Course 1', 'https://sample-video-url-17.com', 'https://sample-thumbnail-url-17.com', 'DevOps', 'Introduction to DevOps'],
                        ['DevOps Course 2', 'https://sample-video-url-18.com', 'https://sample-thumbnail-url-18.com', 'DevOps', 'CI/CD Pipeline Basics'],
                        ['DevOps Course 3', 'https://sample-video-url-19.com', 'https://sample-thumbnail-url-19.com', 'DevOps', 'Docker and Kubernetes for Beginners'],
                        ['DevOps Course 4', 'https://sample-video-url-20.com', 'https://sample-thumbnail-url-20.com', 'DevOps', 'Automation with Ansible and Terraform'],
                        ['DevOps Course 5', 'https://sample-video-url-21.com', 'https://sample-thumbnail-url-21.com', 'DevOps', 'Monitoring and Logging in DevOps'],
                        ['DevOps Course 6', 'https://sample-video-url-22.com', 'https://sample-thumbnail-url-22.com', 'DevOps', 'Infrastructure as Code with Terraform'],
                        ['DevOps Course 7', 'https://sample-video-url-23.com', 'https://sample-thumbnail-url-23.com', 'DevOps', 'Cloud Infrastructure Automation'],
                        ['DevOps Course 8', 'https://sample-video-url-24.com', 'https://sample-thumbnail-url-24.com', 'DevOps', 'Continuous Monitoring and Feedback'],
                        // Cloud Computing Courses
                        ['Cloud Computing Course 1', 'https://sample-video-url-25.com', 'https://sample-thumbnail-url-25.com', 'Cloud Computing', 'Introduction to Cloud Computing'],
                        ['Cloud Computing Course 2', 'https://sample-video-url-26.com', 'https://sample-thumbnail-url-26.com', 'Cloud Computing', 'AWS Fundamentals'],
                        ['Cloud Computing Course 3', 'https://sample-video-url-27.com', 'https://sample-thumbnail-url-27.com', 'Cloud Computing', 'Azure Fundamentals'],
                        ['Cloud Computing Course 4', 'https://sample-video-url-28.com', 'https://sample-thumbnail-url-28.com', 'Cloud Computing', 'Google Cloud Platform Basics'],
                        ['Cloud Computing Course 5', 'https://sample-video-url-29.com', 'https://sample-thumbnail-url-29.com', 'Cloud Computing', 'Serverless Architecture with AWS Lambda'],
                        ['Cloud Computing Course 6', 'https://sample-video-url-30.com', 'https://sample-thumbnail-url-30.com', 'Cloud Computing', 'Cloud Security Essentials'],
                        ['Cloud Computing Course 7', 'https://sample-video-url-31.com', 'https://sample-thumbnail-url-31.com', 'Cloud Computing', 'AWS EC2 and S3 Basics'],
                        ['Cloud Computing Course 8', 'https://sample-video-url-32.com', 'https://sample-thumbnail-url-32.com', 'Cloud Computing', 'Advanced Cloud Architecture'],
                        // AI & ML Courses
                        ['AI & ML Course 1', 'https://sample-video-url-33.com', 'https://sample-thumbnail-url-33.com', 'AI & ML', 'Introduction to AI and Machine Learning'],
                        ['AI & ML Course 2', 'https://sample-video-url-34.com', 'https://sample-thumbnail-url-34.com', 'AI & ML', 'Supervised Learning'],
                        ['AI & ML Course 3', 'https://sample-video-url-35.com', 'https://sample-thumbnail-url-35.com', 'AI & ML', 'Unsupervised Learning'],
                        ['AI & ML Course 4', 'https://sample-video-url-36.com', 'https://sample-thumbnail-url-36.com', 'AI & ML', 'Deep Learning Basics'],
                        ['AI & ML Course 5', 'https://sample-video-url-37.com', 'https://sample-thumbnail-url-37.com', 'AI & ML', 'Natural Language Processing with Python'],
                        ['AI & ML Course 6', 'https://sample-video-url-38.com', 'https://sample-thumbnail-url-38.com', 'AI & ML', 'Reinforcement Learning'],
                        ['AI & ML Course 7', 'https://sample-video-url-39.com', 'https://sample-thumbnail-url-39.com', 'AI & ML', 'AI for Robotics'],
                        ['AI & ML Course 8', 'https://sample-video-url-40.com', 'https://sample-thumbnail-url-40.com', 'AI & ML', 'AI in Healthcare'],
                        // Web Development Courses
                        ['Web Development Course 1', 'https://sample-video-url-41.com', 'https://sample-thumbnail-url-41.com', 'Web Development', 'Introduction to Web Development'],
                        ['Web Development Course 2', 'https://sample-video-url-42.com', 'https://sample-thumbnail-url-42.com', 'Web Development', 'HTML and CSS Basics'],
                        ['Web Development Course 3', 'https://sample-video-url-43.com', 'https://sample-thumbnail-url-43.com', 'Web Development', 'JavaScript and DOM Manipulation'],
                        ['Web Development Course 4', 'https://sample-video-url-44.com', 'https://sample-thumbnail-url-44.com', 'Web Development', 'Responsive Web Design'],
                        ['Web Development Course 5', 'https://sample-video-url-45.com', 'https://sample-thumbnail-url-45.com', 'Web Development', 'React.js Basics'],
                        ['Web Development Course 6', 'https://sample-video-url-46.com', 'https://sample-thumbnail-url-46.com', 'Web Development', 'Advanced JavaScript'],
                        ['Web Development Course 7', 'https://sample-video-url-47.com', 'https://sample-thumbnail-url-47.com', 'Web Development', 'Node.js for Web Development'],
                        ['Web Development Course 8', 'https://sample-video-url-48.com', 'https://sample-thumbnail-url-48.com', 'Web Development', 'Building Full-Stack Applications with MERN']
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
