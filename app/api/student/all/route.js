import { NextResponse } from "next/server";
import { ConnectToDatabase } from "../[applicationNumber]/route";
import Student from "@/lib/model/student";

export async function GET() {
  try {
    await ConnectToDatabase();
    console.log(Student.count())
    const students = await Student.find({});
    console.log(Student.count())
    if (!students || students.length === 0) {
      return NextResponse.json({ message: "No Record Found" });
    }
    return NextResponse.json(students, {
      status: 200,
    });
  } catch (err) {
    console.error("Error fetching student data:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
