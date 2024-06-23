import Student from "@/lib/model/student";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// export async function ConnectToDatabase() {
//   try {
//     const conn = mongoose.connect(process.env.MONGO_URL);
//     console.log("Connected to Database!");
//   } catch (err) {
//     console.error("Database connection error:", err);
//     throw new Error("Failed to connect to the database");
//   }
// }
export async function ConnectToDatabase() {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to Database!");
      return;
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
