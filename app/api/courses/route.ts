import { NextRequest, NextResponse } from "next/server";
import { openDB } from "../../../lib/db";

// Handle GET requests (fetch courses)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");

  try {
    const db = await openDB();
    let courses;

    if (!path) {
      // If no path is specified, return all courses in random order
      // Using RANDOM() function to shuffle the results
      courses = await db.all(`
        SELECT c.*
        FROM courses c
        LEFT JOIN (
          SELECT path, MIN(RANDOM()) as rnd
          FROM courses
          GROUP BY path
        ) r ON c.path = r.path
        ORDER BY r.rnd, RANDOM()
      `);
    } else {
      // If path is specified, filter by path
      courses = await db.all("SELECT * FROM courses WHERE path = ?", [path]);
    }

    // Return courses regardless of whether they're empty
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// Handle POST requests (add a new course)
export async function POST(req: NextRequest) {
  const { title, videoUrl, thumbnailUrl, path, description } = await req.json();

  if (!title || !videoUrl || !path) {
    return NextResponse.json(
      { error: "Title, Video URL, and Path are required" },
      { status: 400 }
    );
  }

  try {
    const db = await openDB();
    await db.run(
      "INSERT INTO courses (title, videoUrl, thumbnailUrl, path, description) VALUES (?, ?, ?, ?, ?)",
      [
        title,
        videoUrl,
        thumbnailUrl || "/api/placeholder/400/300",
        path,
        description || null
      ]
    );

    return NextResponse.json(
      { message: "Course added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding course:", error);
    return NextResponse.json(
      { error: "Failed to add course" },
      { status: 500 }
    );
  }
}