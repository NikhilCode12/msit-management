import mongoose from "mongoose";
import connection_url from "@/lib/db";
import Student from "@/lib/model/student";
import { NextResponse } from "next/server";

export async function connectToDatabase() {
  try {
    await mongoose.connect(connection_url);
    console.log("Connected to DB!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

async function createStudentRecord(data) {
  try {
    const newStudent = await Student.create(data);
    return newStudent;
  } catch (error) {
    console.error("Error creating student record:", error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const requestData = await request.json();
    await connectToDatabase();
    await createStudentRecord(requestData);
    return NextResponse.json({ message: "Student Created!" }, { status: 201 });
  } catch (error) {
    console.error("Error posting data on the db:", error);
    return NextResponse.json(
      { message: "Failed to create student", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const students = await Student.find({});
    return NextResponse.json({ students });
  } catch (err) {
    console.error("Error getting data from the db:", err);
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDatabase();
  await Student.findByIdAndDelete(id);
  return NextResponse.json({ message: "Student Deleted!" }, { status: 200 });
}
