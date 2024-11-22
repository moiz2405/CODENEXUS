import { NextRequest, NextResponse } from "next/server";
import { openDB } from "../../../lib/db";

// Handle GET requests (fetch courses)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "The path query parameter is required" }, { status: 400 });
  }

  try {
    const db = await openDB();
    const courses = await db.all("SELECT * FROM courses WHERE path = ?", [path]);

    if (courses.length === 0) {
      return NextResponse.json({ error: "No courses found for the specified path" }, { status: 404 });
    }

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

// Handle POST requests (add a new course)
export async function POST(req: NextRequest) {
  const { title, videoUrl, thumbnailUrl, path, description } = await req.json();

  if (!title || !videoUrl || !path) {
    return NextResponse.json({ error: "Title, Video URL, and Path are required" }, { status: 400 });
  }

  try {
    const db = await openDB();
    await db.run(
      "INSERT INTO courses (title, videoUrl, thumbnailUrl, path, description) VALUES (?, ?, ?, ?, ?)",
      [title, videoUrl, thumbnailUrl || "https://via.placeholder.com/150", path, description || null]
    );

    return NextResponse.json({ message: "Course added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding course:", error);
    return NextResponse.json({ error: "Failed to add course" }, { status: 500 });
  }
}
