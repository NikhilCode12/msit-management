"use client";
import React, { useState } from "react";

export default function FacultyPortal() {
  const [applicationNumber, setApplicationNumber] = useState("");
  const [studentData, setStudentData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/students/${applicationNumber}`);
      if (!response.ok) {
        throw new Error("Student not found");
      }
      const data = await response.json();
      console.log(data);
      setStudentData(data);
    } catch (error) {
      console.error("Error searching for student:", error.message);
      setStudentData(null);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center w-full gap-12 h-full">
      <div className="flex flex-col items-center gap-4">
        <label htmlFor="applicationNumber" className="text-lg font-semibold">
          Enter Student Application Number:
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="applicationNumber"
            value={applicationNumber}
            onChange={(e) => setApplicationNumber(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 outline-none"
            required
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </div>

      {studentData && (
        <div className="w-1/3 mt-8">
          <h2 className="text-xl font-semibold mb-2">Student Record:</h2>
          <div className="bg-gray-100 rounded-md p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-semibold mb-2">Personal Details:</p>
                <p>
                  <strong>First Name:</strong> {studentData.student.first_name}
                </p>
                <p>
                  <strong>Middle Name:</strong>{" "}
                  {studentData.student.middle_name}
                </p>
                <p>
                  <strong>Surname:</strong> {studentData.student.surname}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {studentData.student.dob}
                </p>
                {/* Add more personal details as needed */}
              </div>
              <div>
                <p className="text-lg font-semibold mb-2">Academic Details:</p>
                <p>
                  <strong>Programme Name:</strong>{" "}
                  {studentData.student.programmeName}
                </p>
                <p>
                  <strong>Stream:</strong> {studentData.student.stream}
                </p>
                <p>
                  <strong>Shift:</strong> {studentData.student.shift}
                </p>
                <p>
                  <strong>Total Marks (10th Grade):</strong>{" "}
                  {studentData.student.total_marks}
                </p>
                {/* Add more academic details as needed */}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
