import Student from "@/lib/model/student.js";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGO_URI = process.env.MONGO_URL;

export async function POST(request) {
  try {
    const conn = mongoose.connect(MONGO_URI);
    if (conn) {
      const data = await request.json();
      const newStudent = new Student(data);
      newStudent.save();
      return NextResponse.json(
        {
          message: "Student registered successfully!",
        },
        {
          status: 200,
        }
      );
    }
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Working!" });
}
