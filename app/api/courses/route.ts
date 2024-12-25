import { NextRequest, NextResponse } from "next/server";
import { fetchCourses, insertCourse } from "../../../lib/db";

// Handle GET requests (fetch courses)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");

  try {
    const path = url.searchParams.get("path") || "";
    const courses = await fetchCourses(path); // Use the new fetchCourses function
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
    const course = {
      title,
      videoUrl,
      thumbnailUrl: thumbnailUrl || "/api/placeholder/400/300", // Provide a default placeholder
      path,
      description: description || null,
    };

    const result = await insertCourse(course); // Use the new insertCourse function
    return NextResponse.json(
      { message: "Course added successfully", course: result },
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
