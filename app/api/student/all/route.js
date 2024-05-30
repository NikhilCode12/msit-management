import { NextResponse } from "next/server";
import { ConnectToDatabase } from "../[applicationNumber]/route";
import Student from "@/lib/model/student";

export async function GET() {
  try {
    await ConnectToDatabase();
    const students = await Student.find();
    if (!students) {
      return NextResponse.json({ message: "No Record Found" });
    } else {
      return NextResponse.json(students);
    }
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
