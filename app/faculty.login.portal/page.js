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
        <>
        {/* Login Form Student */}
        <h2 className="text-3xl font-bold text-indigo-900">
          Management Quota Application Form{" (2024-2025)"}
        </h2>
        <div className="flex items-center justify-center text-center w-2/3 underline underline-offset-2 bg-purple-200 px-6 py-4 font-medium text-md border-2 border-indigo-900 rounded-lg mt-20">
          {
            "Application Form for Admission under Management Quota Seats of GGSIPU, Delhi in"
          }{" "}
          <br />
          {
            "Maharaja Surajmal Institute of Technology, C-4, Janakpuri, New Delhi-110028"
          }{" "}
          <br />
          {"for the Academic Session 2024-25"}
        </div>
        {/* Programme Applied under 10% Management Quota */}
        {/* <div className="w-2/3 flex flex-col items-start gap-4 text-md font-medium text-center mb-4 bg-purple-100 border-2 border-red-600 rounded-md px-6 py-4 pb-6 my-4">
          <p className="font-medium text-center w-full">
            {
              "Please Tick on the Programme applied under 10% Management Quota"
            }
          </p>
          <div className="w-full flex flex-col items-start">
            <h2 className="underline underline-offset-4">
              {"B.Tech. (First Year)"}
            </h2>
            <div className="grid grid-cols-4 gap-4 mt-4 text-md">
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="cse_1st_shift">{"CSE-1st Shift"}</label>
                <input
                  type="checkbox"
                  name="cse_1st_shift"
                  checked={btechChecked.cse_1st_shift}
                  onChange={handleBtechCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="it_1st_shift">{"IT-1st Shift"}</label>
                <input
                  type="checkbox"
                  name="it_1st_shift"
                  checked={btechChecked.it_1st_shift}
                  onChange={handleBtechCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="ece_1st_shift">{"ECE-1st Shift"}</label>
                <input
                  type="checkbox"
                  name="ece_1st_shift"
                  checked={btechChecked.ece_1st_shift}
                  onChange={handleBtechCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="eee_1st_shift">{"EEE-1st Shift"}</label>
                <input
                  type="checkbox"
                  name="eee_1st_shift"
                  checked={btechChecked.eee_1st_shift}
                  onChange={handleBtechCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="cse_2nd_shift">{"CSE-2nd Shift"}</label>
                <input
                  type="checkbox"
                  name="cse_2nd_shift"
                  checked={btechChecked.cse_2nd_shift}
                  onChange={handleBtechCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="it_2nd_shift">{"IT-2nd Shift"}</label>
                <input
                  type="checkbox"
                  name="it_2nd_shift"
                  checked={btechChecked.it_2nd_shift}
                  onChange={handleBtechCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="ece_2nd_shift">{"ECE-2nd Shift"}</label>
                <input
                  type="checkbox"
                  name="ece_2nd_shift"
                  checked={btechChecked.ece_2nd_shift}
                  onChange={handleBtechCheckboxChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start">
            <h2 className="underline underline-offset-4">
              {"LE to B.Tech. (Second Year)"}
            </h2>
            <div className="grid grid-cols-4 gap-4 mt-4 text-md">
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="cse_1st_shift_le">{"CSE-1st Shift"}</label>
                <input
                  type="checkbox"
                  name="cse_1st_shift_le"
                  checked={leToBtechChecked.cse_1st_shift_le}
                  onChange={handleLeToBtechCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="it_1st_shift_le">{"IT-1st Shift"}</label>
                <input
                  type="checkbox"
                  name="it_1st_shift_le"
                  checked={leToBtechChecked.it_1st_shift_le}
                  onChange={handleLeToBtechCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="ece_1st_shift_le">{"ECE-1st Shift"}</label>
                <input
                  type="checkbox"
                  name="ece_1st_shift_le"
                  checked={leToBtechChecked.ece_1st_shift_le}
                  onChange={handleLeToBtechCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="eee_1st_shift_le">{"EEE-1st Shift"}</label>
                <input
                  type="checkbox"
                  name="eee_1st_shift_le"
                  checked={leToBtechChecked.eee_1st_shift_le}
                  onChange={handleLeToBtechCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="cse_2nd_shift_le">{"CSE-2nd Shift"}</label>
                <input
                  type="checkbox"
                  name="cse_2nd_shift_le"
                  checked={leToBtechChecked.cse_2nd_shift_le}
                  onChange={handleLeToBtechCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="it_2nd_shift_le">{"IT-2nd Shift"}</label>
                <input
                  type="checkbox"
                  name="it_2nd_shift_le"
                  checked={leToBtechChecked.it_2nd_shift_le}
                  onChange={handleLeToBtechCheckboxChange}
                />
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="ece_2nd_shift_le">{"ECE-2nd Shift"}</label>
                <input
                  type="checkbox"
                  name="ece_2nd_shift_le"
                  checked={leToBtechChecked.ece_2nd_shift_le}
                  onChange={handleLeToBtechCheckboxChange}
                />
              </div>
            </div>
          </div>
        </div> */}
          {/* Program Details Component*/}
          <div className="w-full flex flex-col justify-center items-center gap-6">
            {/* Programme Name */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="programme_name" className="text-md w-1/3 font-semibold">
                {"Programme Name *"}
              </label>
              <select
                name="programme_name"
                id="programme_name"
              >
                <option>{studentData.programmeName}</option>
              </select>
            </div>
            {/* Stream */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="stream" className="text-md w-1/3 font-semibold">
                {"Stream *"}
              </label>
              <select
                name="stream"
                id="stream"
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
              >
                <option>{studentData.stream}</option>
              </select>
            </div>
            {/* Preferred Choice of shift */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="stream" className="text-md w-1/3 font-semibold">
                {"Preferred Choice of Shift *"}
              </label>
              <select
                name="shift"
                id="shift"
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
              >
                <option>{studentData.shift}</option>
              </select>
            </div>
            {/* GGSIPU Registration Number */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="GGSIPU_Registration_No"
                className="text-md w-1/3 font-semibold"
              >
                {"GGSIPU Online Application Form (Registration No.) *"}
              </label>
              <input
                type="text"
                name="ggsipu_registration_no"
                id="GGSIPU_Registration_No"
                autoComplete="off"
                value={studentData.appNo}
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
                required
              />
            </div>
            {/* Registration Date */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="Registration_Date"
                className="text-md w-1/3 font-semibold"
              >
                {"Registration Date *"}
              </label>
              <input
                type="date"
                name="registration_date"
                id="Registration_Date"
                autoComplete="off"
                value={studentData.regDate}
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
                required
              />
            </div>
            {/* Roll NO CET/JEE LE */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="jee_cet_rollno" className="text-md w-1/3 font-semibold">
                {"NLT(JEE)/CET Roll No.(L.E.)"}
              </label>
              <input
                type="text"
                name="jee_cet_rollno"
                id="jee_cet_rollno"
                autoComplete="off"
                value={studentData.rollNo}
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
              />
            </div>
            {/* Rank CET/JEE LE */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="jee_cet_rank" className="text-md w-1/3 font-semibold">
                {"NLT(JEE)/CET (LE)Rank"}
              </label>
              <input
                type="number"
                name="jee_cet_rank"
                id="jee_cet_rank"
                autoComplete="off"
                value={studentData.rank}
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
              />
            </div>
            {/* Registration form missing error
            {studentData.registrationForm && (
              <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                {`Registration form missing`}
              </p>
            )} */}
            {/* GGSIPU Registration Form Upload */}
            <div className="w-full flex justify-center items-center">
              <div className="w-[85%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                <label
                  htmlFor="ggsipu_registration_form_upload"
                  className="w-2/3 text-left text-md font-medium"
                >
                </label>
                {studentData.registrationForm ? (
                  <div className="flex items-center gap-2 ">
                    <span className="bg-gray-100 rounded-md p-2">
                      {studentData.registrationForm.name}
                    </span>
                  </div>
                ) : (
                  <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                    {`Registration form missing`}
                  </p>
                )}
              </div>
            </div>
            {/* Admit card missing error
            {admitCardError && (
              <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                {admitCardError}
              </p>
            )} */}
            {/* Admit Card Upload */}
            <div className="w-full flex justify-center items-center">
              <div className="w-[85%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                <label
                  htmlFor="admit_card_upload"
                  className="w-2/3 text-left text-md font-medium"
                >
                </label>
                {studentData.admitCard ? (
                  <div className="flex items-center gap-2 ">
                    <span className="bg-gray-100 rounded-md p-2">
                      {studentData.admitCard.name}
                    </span>
                  </div>
                ) : (
                  <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                    {`Admit card Missing`}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

          {/* Candidate Details Component */}
          <div className="w-full flex flex-col justify-center items-center gap-6">
            <h2 className="font-semibold text-xl my-2">Personal Details</h2>
            {/* Candidate's Name */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="first_name" className="text-md w-1/3 font-semibold">
                {"Candidate's Name *"}
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="off"
                  value={studentData.first_name}
                  required
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
                <input
                  type="text"
                  name="middle_name"
                  id="middle_name"
                  autoComplete="off"
                  value={studentData.middle_name}
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  autoComplete="off"
                  value={studentData.surname}
                  required
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
            </div>
            {/* Father's Name */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="father_first_name"
                className="text-md w-1/3 font-semibold"
              >
                {"Father's Name *"}
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <input
                  type="text"
                  name="father_first_name"
                  id="father_first_name"
                  autoComplete="off"
                  value={studentData.father_first_name}
                  required
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
                <input
                  type="text"
                  name="father_middle_name"
                  id="father_middle_name"
                  autoComplete="off"
                  value={studentData.father_middle_name}
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
                <input
                  type="text"
                  name="father_surname"
                  id="father_surname"
                  autoComplete="off"
                  value={studentData.father_surname}
                  required
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
            </div>
            {/* Mother's Name */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="mother_first_name"
                className="text-md w-1/3 font-semibold"
              >
                {"Mother's Name *"}
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <input
                  type="text"
                  name="mother_first_name"
                  id="mother_first_name"
                  autoComplete="off"
                  value={studentData.mother_first_name}
                  required
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
                <input
                  type="text"
                  name="mother_middle_name"
                  id="mother_middle_name"
                  autoComplete="off"
                  value={studentData.mother_middle_name}
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
                <input
                  type="text"
                  name="mother_surname"
                  id="mother_surname"
                  autoComplete="off"
                  value={studentData.mother_surname}
                  required
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
            </div>
            {/* Legible Postal Address */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="legible_postal_address"
                className="text-md w-1/3 font-semibold"
              >
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <input
                  type="text"
                  name="legible_postal_address"
                  id="legible_postal_address"
                  autoComplete="off"
                  value={studentData.legible_postal_address}
                  required
                  className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
            </div>
            {/* Legible Contact Nos. and Email I.D. */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="legible_contact"
                className="text-md w-1/3 font-semibold"
              >
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <input
                  type="number"
                  name="legible_contact"
                  id="legible_contact"
                  autoComplete="off"
                  value={studentData.legible_contact}
                  required
                  className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
            </div>
            {/* Legible Email I.D. */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="legible_email" className="text-md w-1/3 font-semibold">
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <input
                  type="email"
                  name="legible_email"
                  id="legible_email"
                  autoComplete="off"
                  value={studentData.legible_email}
                  required
                  className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
            </div>
            {/* Date of Birth (in Christian Era) */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="dob" className="text-md w-1/3 font-semibold">
                {"Date of Birth (in Christian Era) *"}
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  autoComplete="off"
                  value={studentData.dob}
                  required
                  className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
            </div>
            {/* Category Selection for Reservation */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="category" className="text-md w-1/3 font-semibold">
                {
                 "Category"
                }
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <input
                  type="text"
                  name="category"
                  id="category"
                  autoComplete="off"
                  value={studentData.category}
                  required
                  className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
            </div>
            {/* {categoryCertificateError && (
              <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                {categoryCertificateError}
              </p>
            )} */}
      
            {/* Category Certificate Attachment */}
            <div className="w-full flex justify-center items-center">
              <div className="w-[85%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                <label
                  htmlFor="category_certificate_upload"
                  className="w-2/3 text-left text-md font-medium"
                >
                </label>
                {studentData.categoryCertificate ? (
                  <div className="flex items-center gap-2 ">
                    <span className="bg-gray-100 rounded-md p-2">
                      {studentData.categoryCertificate.name}
                    </span>
                  </div>
                ) : (
                  <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                    {`Category Certificate Missing`}
                  </p>
                )}
              </div>
            </div>
            {/* Delhi/Outside Delhi Region */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="region" className="text-md w-1/3 font-semibold">
                {
                  "Whether the Candidate Belongs to Delhi Region/Outside Delhi Region *"
                }
              </label>
              <div className="w-1/2 flex gap-4 items-center justify-center">
                {/* Delhi Region*/}
                <input
                  type="radio"
                  name="region"
                  id="delhi"
                  value="Delhi"
                  checked={studentData.region === "Delhi"}
                />
                <label htmlFor="delhi" className="ml-2">
                  {"Delhi Region"}
                </label>
                {/* Outside Delhi Region */}
                <input
                  type="radio"
                  name="region"
                  id="outside_delhi"
                  value="Outside Delhi"
                  checked={studentData.region === "Outside Delhi"}
                />
                <label htmlFor="outside_delhi" className="ml-2">
                  {"Outside Delhi Region"}
                </label>
              </div>
            </div>
          </div>

          <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

          {/* Document Component */}
          <div className="w-full flex flex-col justify-center items-center gap-6">
            <h2 className="font-semibold text-xl my-2">
              {"Details of Examination Passed"}{" "}
            </h2>
            {/* 10th Examination Details */}
            <div className="w-[90%] flex flex-col items-center gap-6 border-2 border-indigo-200 p-4 rounded-lg">
              <h2 className="my-2 font-semibold text-lg">
                {"10th Examination Details"}
              </h2>
              {/* board and rollno */}
              <div className="w-full flex justify-center gap-12 items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label htmlFor="board" className="text-md w-1/3 font-semibold">
                    {"Board *"}
                  </label>
                  <input
                    type="text"
                    name="board"
                    id="board"
                    value={studentData.board}
                    autoComplete="off"
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label htmlFor="roll_no" className="text-md w-1/3 font-semibold">
                    {"Roll No. *"}
                  </label>
                  <input
                    type="number"
                    name="roll_no"
                    id="roll_no"
                    value={studentData.roll_no}
                    autoComplete="off"
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* year */}
              <div className="w-[73%] flex justify-left items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label htmlFor="year" className="text-md w-1/3 font-semibold mr-10">
                    {"Year *"}
                  </label>
                  <input
                    type="number"
                    name="year"
                    id="year"
                    autoComplete="off"
                    maxLength={4}
                    value={studentData.year}
                    max={2024}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* Subjects and marks */}
              {/* Subject 1 and 2 */}
              <div className="w-full flex justify-center gap-12 items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_1"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 1"}
                  </label>
                  <input
                    type="text"
                    name="subject_1"
                    id="subject_1"
                    autoComplete="off"
                    value={studentData.subject_1}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_2"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 2"}
                  </label>
                  <input
                    type="number"
                    name="subject_2"
                    id="subject_2"
                    autoComplete="off"
                    value={studentData.subject_2}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* Subject 3 and 4 */}
              <div className="w-full flex justify-center gap-12 items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_3"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 3"}
                  </label>
                  <input
                    type="number"
                    name="subject_3"
                    id="subject_3"
                    autoComplete="off"
                    value={studentData.subject_3}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_4"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 4"}
                  </label>
                  <input
                    type="number"
                    name="subject_4"
                    id="subject_4"
                    autoComplete="off"
                    value={studentData.subject_4}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* Subject 5 and 6 */}
              <div className="w-full flex justify-center gap-12 items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_5"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 5"}
                  </label>
                  <input
                    type="number"
                    name="subject_5"
                    id="subject_5"
                    autoComplete="off"
                    value={studentData.subject_5}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_6"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 6"}
                  </label>
                  <input
                    type="number"
                    name="subject_6"
                    id="subject_6"
                    autoComplete="off"
                    value={studentData.subject_6}
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* Total marks and Percentage*/}
              <div className="w-full flex justify-center gap-12 items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="total_marks"
                    className="text-md w-2/3 font-semibold "
                  >
                    {"Total Marks *"}
                  </label>
                  <input
                    type="number"
                    name="total_marks"
                    id="total_marks"
                    autoComplete="off"
                    value={studentData.total_marks}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="total_percentage"
                    className="text-md w-2/3 font-semibold mr-2"
                  >
                    {"Percentage *"}
                  </label>
                  <input
                    type="number"
                    name="total_percentage"
                    id="total_percentage"
                    autoComplete="off"
                    value={studentData.total_percentage}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* {marksheet_error_10 && (
                <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                  {marksheet_error_10}
                </p>
              )} */}
              {/* 10th Marksheet & Passing Certificate */}
              <div className="w-full flex justify-center items-center mb-2">
                <div className="w-[90%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                  <label
                    htmlFor="10th_marksheet_upload"
                    className="w-2/3 text-left text-md font-medium"
                  >
                    {"Please attach 10th Marksheet & Passing Certificate. *"}{" "}
                  </label>
                  {studentData.marksheet_10 ? (
                    <div className="flex items-center gap-2 ">
                      <span className="bg-gray-100 rounded-md p-2">
                        {studentData.marksheet_10.name}
                      </span>
                    </div>
                  ) : (
                    <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                      {"Missing 10th Marksheet"}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* 12th Examination Details */}
            <div className="w-[90%] flex flex-col items-center gap-6 border-2 border-indigo-200 p-4 rounded-lg">
              <h2 className="my-2 font-semibold text-lg">
                {"12th Examination Details"}
              </h2>
              {/* board and rollno */}
              <div className="w-full flex justify-center gap-12 items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label htmlFor="board_12" className="text-md w-1/3 font-semibold">
                    {"Board *"}
                  </label>
                  <input
                    type="text"
                    name="board_12"
                    id="board_12"
                    autoComplete="off"
                    value={student.board_12}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label htmlFor="roll_no_12" className="text-md w-1/3 font-semibold">
                    {"Roll No. *"}
                  </label>
                  <input
                    type="number"
                    name="roll_no_12"
                    id="roll_no_12"
                    autoComplete="off"
                    value={studentData.roll_no_12}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* year */}
              <div className="w-[73%] flex justify-left items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="year_12"
                    className="text-md w-1/3 font-semibold mr-10"
                  >
                    {"Year *"}
                  </label>
                  <input
                    type="number"
                    name="year_12"
                    id="year_12"
                    autoComplete="off"
                    maxLength={4}
                    max={2024}
                    value={studentData.year_12}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* Subjects and marks */}
              {/* Subject 1 and 2 */}
              <div className="w-full flex justify-center gap-12 items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_1_12"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 1"}
                  </label>
                  <input
                    type="text"
                    name="subject_1_12"
                    id="subject_1_12"
                    autoComplete="off"
                    value={studentData.subject_1_12}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_2_12"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 2"}
                  </label>
                  <input
                    type="number"
                    name="subject_2_12"
                    id="subject_2_12"
                    autoComplete="off"
                    value={studentData.subject_2_12}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* Subject 3 and 4 */}
              <div className="w-full flex justify-center gap-12 items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_3_12"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 3"}
                  </label>
                  <input
                    type="number"
                    name="subject_3_12"
                    id="subject_3_12"
                    autoComplete="off"
                    value={studentData.subject_3_12}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_4_12"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 4"}
                  </label>
                  <input
                    type="number"
                    name="subject_4_12"
                    id="subject_4_12"
                    autoComplete="off"
                    value={studentData.subject_4_12}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* Subject 5 and 6 */}
              <div className="w-full flex justify-center gap-12 items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_5_12"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 5"}
                  </label>
                  <input
                    type="number"
                    name="subject_5_12"
                    id="subject_5_12"
                    autoComplete="off"
                    value={studentData.subject_5_12}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_6_12"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 6"}
                  </label>
                  <input
                    type="number"
                    name="subject_6_12"
                    id="subject_6_12"
                    autoComplete="off"
                    value={studentData.subject_6_12}
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* Total marks and Percentage*/}
              <div className="w-full flex justify-center gap-12 items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="total_marks_12"
                    className="text-md w-2/3 font-semibold "
                  >
                    {"Total Marks *"}
                  </label>
                  <input
                    type="number"
                    name="total_marks_12"
                    id="total_marks_12"
                    autoComplete="off"
                    value={studentData.total_marks_12}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="total_percentage_12"
                    className="text-md w-2/3 font-semibold mr-2"
                  >
                    {"Percentage *"}
                  </label>
                  <input
                    type="number"
                    name="total_percentage_12"
                    id="total_percentage_12"
                    autoComplete="off"
                    value={studentData.total_percentage_12}
                    required
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* {marksheet_error_12 && (
                <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                  {marksheet_error_12}
                </p>
              )} */}
              {/* 12th Marksheet & Passing Certificate */}
              <div className="w-full flex justify-center items-center mb-2">
                <div className="w-[90%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                  <label
                    htmlFor="12th_marksheet_upload"
                    className="w-2/3 text-left text-md font-medium"
                  >
                  </label>
                  {studentData.marksheet_12 ? (
                    <div className="flex items-center gap-2 ">
                      <span className="bg-gray-100 rounded-md p-2">
                        {studentData.marksheet_12.name}
                      </span>
                    </div>
                  ) : (
                    <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                      {"Missing 12th Marksheet"}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Diploma Students Lateral Entry B.tech */}
            <div className="w-[90%] flex flex-col items-center gap-6 border-2 border-indigo-200 p-4 rounded-lg">
              <div className="w-[90%] my-2 font-medium text-md bg-purple-100 border-2 border-red-600 rounded-md p-4 text-center">
                {"* To be filled by Applicants of B.Tech. (Lateral Entry) Programme "}
              </div>
              {/* University and rollno */}
              <div className="w-full flex justify-center gap-12 items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label htmlFor="university" className="text-md w-2/3 font-semibold">
                    {"University "}
                  </label>
                  <input
                    type="text"
                    name="university"
                    id="university"
                    autoComplete="off"
                    value={studentData.university}
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="roll_no_university"
                    className="text-md w-1/3 font-semibold"
                  >
                    {"Roll No. "}
                  </label>
                  <input
                    type="number"
                    name="roll_no_university"
                    id="roll_no_university"
                    autoComplete="off"
                    value={studentData.roll_no_university}
                    
                    className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                  />
                </div>
              </div>
              {/* 1st year */}
              <h2 className="text-md font-medium my-2 underline underline-offset-2">
                {"1st Year"}
              </h2>
              <div className="w-[75%] flex justify-center gap-12 items-center">
                <label
                  htmlFor="subjects_1st_year"
                  className="text-md w-2/3 font-semibold"
                >
                  {"Subjects Taken (seperated by commas)"}
                </label>
                <input
                  type="text"
                  name="subjects_1st_year"
                  id="subjects_1st_year"
                  autoComplete="off"
                  placeholder="eg. English, Mathematics,..."
                  value={studentData.subjects_1st_year}
                  
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
              <div className="w-[75%] flex justify-center gap-6 items-center">
                {/* Total Marks, Marks Obtained and Percentage in 1st year */}
                <input
                  type="number"
                  name="t_m_1"
                  id="t_m_1"
                  autoComplete="off"
                  placeholder="Total Marks"
                  value={studentData.t_m_1}
                  
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
                <input
                  type="number"
                  name="m_o_1"
                  id="m_o_1"
                  autoComplete="off"
                  placeholder="Marks Obtained"
                  value={studentData.m_o_1}
                  
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
                <input
                  type="number"
                  name="p_1"
                  id="p_1"
                  autoComplete="off"
                  placeholder="Percentage (%)"
                  value={studentData.p_1}
                  
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
              {/* 2nd year */}
              <h2 className="text-md font-medium my-2 underline underline-offset-2">
                {"2nd Year"}
              </h2>
              <div className="w-[75%] flex justify-center gap-12 items-center">
                <label
                  htmlFor="subjects_2nd_year"
                  className="text-md w-2/3 font-semibold"
                >
                  {"Subjects Taken (seperated by commas)"}
                </label>
                <input
                  type="text"
                  name="subjects_2nd_year"
                  id="subjects_2nd_year"
                  autoComplete="off"
                  placeholder="eg. English, Mathematics,..."
                  value={studentData.subjects_2nd_year}
                  
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
      
              <div className="w-[75%] flex justify-center gap-6 items-center">
                {/* Total Marks, Marks Obtained and Percentage in 1st year */}
                <input
                  type="number"
                  name="t_m_2"
                  id="t_m_2"
                  autoComplete="off"
                  placeholder="Total Marks"
                  value={studentData.t_m_2}
                  
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
                <input
                  type="number"
                  name="m_o_2"
                  id="m_o_2"
                  autoComplete="off"
                  placeholder="Marks Obtained"
                  value={studentData.m_o_2}
                  
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
                <input
                  type="number"
                  name="p_2"
                  id="p_2"
                  autoComplete="off"
                  placeholder="Percentage (%)"
                  value={studentData.p_2}
                  
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
              {/* 3rd year */}
              <h2 className="text-md font-medium my-2 underline underline-offset-2">
                {"3rd Year"}
              </h2>
              <div className="w-[75%] flex justify-center gap-12 items-center">
                <label
                  htmlFor="subjects_3rd_year"
                  className="text-md w-2/3 font-semibold"
                >
                  {"Subjects Taken (seperated by commas)"}
                </label>
                <input
                  type="text"
                  name="subjects_3rd_year"
                  id="subjects_3rd_year"
                  autoComplete="off"
                  placeholder="eg. English, Mathematics,..."
                  value={studentData.subjects_3rd_year}
                  
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
      
              <div className="w-[75%] flex justify-center gap-6 items-center">
                {/* Total Marks, Marks Obtained and Percentage in 3rd year */}
                <input
                  type="number"
                  name="t_m_3"
                  id="t_m_3"
                  autoComplete="off"
                  placeholder="Total Marks"
                  value={studentData.t_m_3}
                  
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
                <input
                  type="number"
                  name="m_o_3"
                  id="m_o_3"
                  autoComplete="off"
                  placeholder="Marks Obtained"
                  value={studentData.m_o_3}
                  
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
                <input
                  type="number"
                  name="p_3"
                  id="p_3"
                  autoComplete="off"
                  placeholder="Percentage (%)"
                  value={studentData.p_3}
                  
                  className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                />
              </div>
      
              {/* {diploma_certificate_error && (
                <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                  {diploma_certificate_error}
                </p>
              )} */}
              {/* Diploma Marksheet & Passing Certificate */}
              <div className="w-full flex justify-center items-center mb-2">
                <div className="w-[90%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                  <label
                    htmlFor="diploma_certificate"
                    className="w-2/3 text-left text-md font-medium"
                  >
                  </label>
                  {studentData.diploma_certificate ? (
                    <div className="flex items-center gap-2 ">
                      <span className="bg-gray-100 rounded-md p-2">
                        {studentData.diploma_certificate.name}
                      </span>
                    </div>
                  ) : (
                    <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                      {"Diploma Certificate Missing"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

          {/* Payment Component */}
          <div className="w-full flex flex-col justify-center items-center gap-6">
            <div className="flex flex-col items-start gap-4 text-md font-medium text-center mb-4 bg-purple-100 border-2 border-red-600 rounded-md w-[90%] px-6 py-6">
              <p>
                {"* Deposit"} <span className="font-bold">{" Rs. 5000/- "}</span>{" "}
                {
                  "as registration charges (Non-Refundable) to MSIT, either through NEFT/RTGS."
                }
              </p>
              <h2 className="text-md font-bold underline underline-offset-2">
                {"NEFT/RTGS details given below:"}
              </h2>
              <div className="flex flex-col items-start justify-center gap-2 w-full">
                <p className="text-md font-medium">
                  <span className="font-bold mr-2">{"Name Of Institute:"}</span>
                  {"Maharaja Surajmal Institute of Technology"}
                </p>
                <p className="text-md font-medium">
                  <span className="font-bold mr-2">{"Bank Name:"}</span>
                  {"Indian Overseas Bank"}
                </p>
                <p className="text-md font-medium">
                  <span className="font-bold mr-2">{"Account No.:"}</span>
                  {"175901000001658"}
                </p>
                <p className="text-md font-medium">
                  <span className="font-bold mr-2">{"IFSC Code:"}</span>
                  {"IOBA0001759"}
                </p>
                <p className="text-md font-medium">
                  <span className="font-bold mr-2">{"Branch:"}</span>
                  {"C-4, Jankpuri, New Delhi-110058"}
                </p>
                {/* Payment Receipt Error */}
                {/* {paymentReceiptError && (
                  <p className="w-full flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                    {paymentReceiptError}
                  </p>
                )} */}
                <div className="w-full flex justify-center items-center mt-2">
                  <div className="w-full flex gap-12 items-center justify-between bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                    <label
                      htmlFor="payment_receipt_upload"
                      className="w-[70%] text-left text-md font-medium"
                    >
                      {"Payment Receipt(Proof). *"}{" "}
                    </label>
                    {studentData.paymentReceipt ? (
                      <div className="flex items-center gap-2 ">
                        <span className="bg-gray-100 rounded-md p-2">
                          {studentData.paymentReceipt.name}
                        </span>
                      </div>
                    ) : (
                      <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                        {"Payment Receipt Missing"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

          {/*Declaration Component */}
          <div className="w-full flex flex-col justify-center items-center gap-6">
            <div className="flex flex-col items-start gap-4 text-md font-medium text-center mb-4 bg-purple-100 border-2 border-red-600 rounded-md w-[90%] px-6 py-6">
              <h2 className="font-bold text-lg underline underline-offset-4">
                {"DECLARATION"}
              </h2>
              <div className="flex flex-col items-start justify-center gap-2 w-full">
                <p className="text-md font-medium text-justify">
                  {
                    "I understand that by merely submitting application form under management quota does not entitle/guarantee me the admission in Maharaja Surajmal Institute of Technology and if admission is granted then I hereby solemnly affirm and declare that I fulfill the eligibility conditions prescribed by the GGSIPU University and my admission would be provisional and subject to final ratification by the GGSIPU on verification. I have also read the Admission Brochure of GGSIPU for 2024-2025 and understood allocation and reservation of seats and manner of admission."
                  }
                </p>
                {/* {signatureErrors.candidate && (
                  <p className="w-full flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                    {signatureErrors.candidate}
                  </p>
                )} */}
                <div className="w-full justify-between flex items-center">
                  <div className="">
                    <label htmlFor="date">{"Date: "}</label>
                    <input
                      type="text"
                      name="date"
                      id="date"
                      value={"currentDate"}
                      readOnly
                      className="outline-none bg-inherit border-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="candidate_sign" className="mr-4">
                      {"Signature of the Candidate: "}
                    </label>
                    {studentData.candidateSignature ? (
                      <div className="relative">
                        <img
                          src={studentData.candidateSignature}
                          alt="Candidate Signature"
                          className="w-40 h-10 border border-black"
                        />
                        {/* {showCandidateCross && (
                          <button
                            onClick={() => handleRemoveImage("candidate")}
                            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            &#x2715;
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <p className="w-full flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                        {'Candidate Signature Missing'}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-md font-medium text-justify my-2">
                  {
                    "I have carefully read and verified the information furnished by my son/daughter/ward and affirm that it is true and correct and he/she fulfills the eligibility conditions as mentioned in the Admission Bulletin/Rules of GGSIPU."
                  }
                </p>
      
                {/* {signatureErrors.parent && (
                  <p className="w-full flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                    {signatureErrors.parent}
                  </p>
                )} */}
                <div className="w-full justify-between flex items-center">
                  <div className="">
                    <label htmlFor="date_2">{"Date: "}</label>
                    <input
                      type="text"
                      name="date_2"
                      id="date_2"
                      value={'currentDate'}
                      readOnly
                      className="outline-none bg-inherit border-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="parent_sign" className="mr-4">
                      {"Signature of Father/Mother: "}
                    </label>
                    {studentData.parentSignature ? (
                      <div className="relative">
                        <img
                          src={studentData.parentSignature}
                          alt="Parent Signature"
                          className="w-40 h-10 border-black"
                        />
                        {/* {showParentCross && (
                          <button
                            onClick={() => handleRemoveImage("parent")}
                            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            &#x2715;
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <p className="w-full flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                        {"Parent Signature Missing"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* External Reference to msit.in */}
          <p className="text-md font-medium">
            {
              "For more information, please refer to MSIT website on day-day-basis at "
            }
            <Link
              href={"https://www.msit.in"}
              target="_blank"
              className=" text-green-600 hover:text-green-700 active:text-green-600"
            >
              {"www.msit.in"}
            </Link>{" "}
            {" or visit "}{" "}
            <Link
              href={"https://www.ipu.ac.in"}
              target="_blank"
              className=" text-green-600 hover:text-green-700 active:text-green-600"
            >
              {"www.ipu.ac.in"}
            </Link>
          </p>

          
          {/* Form No */}
          <div className="hidden border-2 border-indigo-900 flex items-center justify-between gap-2 absolute left-8 top-16 px-4 py-2 rounded-lg">
            <p className="text-md">{"Application No. "}</p>
            <span className="text-md font-bold underline underline-offset-2">
              {studentData.appNo}
            </span>
          </div>
          {/* Passport size photograph upload */}
          <div className="w-36 h-48 border outline-double border-indigo-900 flex flex-col justify-between items-center gap-4 absolute right-8 top-16 cursor-pointer">
            {studentData.passportPhoto ? (
              <>
                <div className="relative w-full h-full">
                  <img
                    src={URL.createObjectURL(studentData.passportPhoto)}
                    alt="Passport Photo"
                    className="object-cover w-full h-full"
                  />
                </div>
              </>
            ) : (
              <p className="w-full flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                    {"Student Passport Photo Missing"}
              </p>
            )}
          </div>
      </>
      )}
    </main>
  );
}
