import { NextResponse } from "next/server";
import { ConnectToDatabase } from "../[applicationNumber]/route";
import Student from "@/lib/model/student";

export async function GET() {
  try {
    await ConnectToDatabase();
    const students = await Student.find();
    if (!students || students.length === 0) {
      return NextResponse.json(
        { message: "No Record Found" },
        {
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
    }
    return NextResponse.json(students, {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (err) {
    console.error("Error fetching student data:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      {
        status: 500,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}
