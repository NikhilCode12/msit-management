import Student from "@/lib/model/student";
import { connectToDatabase } from "../route";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newData: data } = request.json();
  await connectToDatabase();
  await Student.findByIdAndUpdate(id, { data });
  return NextResponse.json({ message: "Student updated!" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDatabase();
  const student = await Student.findOne({ _id: id });
  return NextResponse.json({ student }, { status: 200 });
}
