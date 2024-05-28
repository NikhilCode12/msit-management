import Student from "@/lib/model/student";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function ConnectToDatabase() {
  try {
    const conn = mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database!");
  } catch (err) {
    console.error("Database connection error:", err);
    throw new Error("Failed to connect to the database");
  }
}

export async function GET(request, { params }) {
  const { applicationNumber: id } = params;
  if (!id) {
    return NextResponse.json(
      { message: "Application number is missing" },
      { status: 400 }
    );
  }

  try {
    await ConnectToDatabase();
    const student = await Student.findOne({
      appNo: id,
    });

    if (!student) {
      return NextResponse.json({ message: "Student not found!" });
    } else {
      return NextResponse.json(student);
    }
  } catch (err) {
    console.error("Error in GET request:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
