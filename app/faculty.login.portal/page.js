"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import HomeButton from "../components/HomeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
  faLockOpen,
  faLock,
  faPrint,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import StudentListModal from "../components/StudentListModal";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function FacultyPortal() {
  const [applicationNumber, setApplicationNumber] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFoundError, setNotFoundError] = useState("");
  const [applicationNumberError, setApplicationNumberError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginBox, setShowLoginBox] = useState(true);
  const [showAccessList, setShowAccessList] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailure, setLoginFailure] = useState(false);
  const [studentsListData, setStudentsListData] = useState([]);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
 // const[data,setData]=useState([]);
  const usernameInputRef = useRef();
  const applicationNumberInputRef = useRef();

  const formattedDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!applicationNumber) {
      setApplicationNumberError("Please enter!");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/student/${applicationNumber}`);
      if (response.data.message === "Student not found!") {
        setIsLoading(false);
        setNotFoundError("Student record not found!");
        setTimeout(() => {
          setNotFoundError("");
        }, 1000);
        setApplicationNumber("");
        return;
      } else {
        setNotFoundError("");
        setShowSearchBox(false);
      }
      setStudentData(response.data);
      setIsLoading(false);
      setApplicationNumber("");
    } catch (error) {
      console.error("Error searching for student:", error.message);
      setStudentData(null);
    }
  };

  const fetchStudentData = useCallback(async () => {
    try {
      const response = await fetch("/api/student/all", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      //console.log('response rec')
      const data = await response.json();
      //setData(tdata);
        console.log(response)
      //console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching student data:", error);
      return [];
    }
  }, [fetchStudentData]);

  const handleAccessList = async (e) => {
    e.preventDefault();
    await fetchStudentData();
    setShowAccessList(true);
  };

  const handleSelectStudent = (appNo) => {
    setShowAccessList(false);
    setApplicationNumber(appNo);
  };

  const handleClose = () => {
    setShowAccessList(false);
  };

  const handleFacultyLogin = async (e) => {
    e.preventDefault();
    const correct_username = "mgmt_admsn_2024-25@msit.in";
    const correct_password = "admission_msit@1234";
    try {
      if (username === correct_username && password === correct_password) {
        setLoginSuccess(true);
        setTimeout(() => {
          setLoginSuccess(false);
        }, 1000);
        setShowLoginBox(false);
        setShowSearchBox(true);
      } else {
        setLoginFailure(true);
        usernameInputRef.current.focus();
        setTimeout(() => {
          setLoginFailure(false);
        }, 1000);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error validating for faculty:", error.message);
      setStudentData(null);
    }
  };

  const handleDownloadPDF = (e) => {
    const capture = document.querySelector(".register-form");
    setIsDownloadLoading(true);

    html2canvas(capture, { scale: 4 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.5);
      const pdf = new jsPDF("p", "mm", "a4");

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const pdfWidth = 210;
      const pdfHeight = 297;
      const scale = pdfWidth / (canvasWidth * 0.264583);
      const pdfCanvasHeight = canvasHeight * 0.264583 * scale;

      let position = 0;
      while (position < pdfCanvasHeight) {
        pdf.addImage(imgData, "JPEG", 0, -position, pdfWidth, pdfCanvasHeight);
        if (position + pdfHeight < pdfCanvasHeight) {
          pdf.addPage();
        }
        position += pdfHeight;
      }

      setIsDownloadLoading(false);

      const filename = `${studentData.appNo}_${studentData.first_name}_form.pdf`;
      pdf.save(filename);
    });
  };

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const upper = (str) => str.toUpperCase();

  useEffect(() => {
    if (showLoginBox) usernameInputRef.current.focus();
    else if (showSearchBox) applicationNumberInputRef.current.focus();
  }, [showLoginBox, showSearchBox]);

  return (
    <main
      className={`flex flex-col justify-center items-center w-full gap-10 relative ${
        studentData ? "mt-20" : "h-full"
      }`}
    >
      {/* Home button */}
      <Link
        href="/"
        className={`bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600 absolute ${
          studentData ? "-top-12" : "top-8"
        } left-8 text-white px-4 py-2 font-semibold rounded-md flex items-center justify-center`}
      >
        <HomeButton className="text-white" />
      </Link>
      {showSearchBox && (
        <h1 className="text-3xl font-bold text-indigo-950 my-2">
          {"Student Search Portal"}
        </h1>
      )}

      {showLoginBox && (
        <h1 className="text-3xl font-bold text-indigo-950 my-2">
          {"Faculty Login Portal"}
        </h1>
      )}

      {/* Login Box */}
      {showLoginBox && (
        <form
          onSubmit={(e) => handleFacultyLogin(e)}
          method={"POST"}
          className="flex flex-col items-center gap-6 border-2 border-indigo-900 rounded-md px-20 py-8"
        >
          {/* Username */}
          <div className="flex items-center gap-4">
            <label htmlFor="username" className="text-lg font-semibold">
              {"Username: "}
            </label>
            <input
              ref={usernameInputRef}
              type="text"
              name="username"
              id="username"
              value={username}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              className={`rounded-md px-3 py-2 outline-none  mr-2 w-[80%] ${
                loginFailure
                  ? "border-2 border-red-400 "
                  : "focus:ring-2 focus:ring-blue-400 border border-gray-400"
              }`}
              placeholder={loginFailure ? "Login Failed" : "Enter username"}
              required
            />
          </div>
          {/* Password */}
          <div className="flex items-center gap-4 w-[92.5%]">
            <label htmlFor="password" className="text-lg font-semibold">
              {"Password: "}
            </label>
            <div
              className={`rounded-md px-3 py-2 outline-none flex justify-between items-center ${
                loginFailure
                  ? "border-2 border-red-400"
                  : "active:ring-2 active:ring-blue-400 border border-gray-400"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white outline-none w-2/3"
                placeholder={loginFailure ? "Login Failed" : "Enter password"}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-sm"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className={`text-white py-2 px-6 rounded-lg font-medium text-md bg-indigo-900 hover:bg-indigo-700 mt-2 active:bg-indigo-900`}
          >
            {"Login"}
          </button>
        </form>
      )}

      {/* Login Success Alert */}
      {loginSuccess && (
        <div className="text-white font-medium text-md bg-green-600 rounded-md w-[250px] text-center py-2 absolute bottom-8 right-8">
          {"Logged in successfully."}
        </div>
      )}

      {/* Login Failure Alert */}
      {loginFailure && (
        <div className="text-white font-medium text-md bg-red-600 rounded-md w-[250px] text-center py-2 absolute bottom-8 right-8">
          {"Invalid credentials, Login failed!"}
        </div>
      )}

      {/* Search box */}
      {showSearchBox && (
        <div className="flex  items-center gap-4 border-2 border-indigo-900 rounded-md p-12">
          <label htmlFor="applicationNumber" className="text-lg font-semibold">
            Student Application Number:
          </label>
          <form
            className="flex items-center gap-2"
            method="POST"
            onSubmit={handleSearch}
          >
            <input
              ref={applicationNumberInputRef}
              type="text"
              name="applicationNumber"
              id="applicationNumber"
              value={applicationNumber}
              autoComplete="off"
              onChange={(e) => setApplicationNumber(e.target.value)}
              className={`border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 mr-2 ${
                applicationNumberError
                  ? "ring-2 ring-red-400"
                  : "border-gray-400"
              }`}
              placeholder={
                applicationNumberError
                  ? applicationNumberError
                  : "Application Number"
              }
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`text-white py-2 px-6 rounded-lg font-medium text-md bg-indigo-900 hover:bg-indigo-700 active:bg-indigo-900 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  Searching
                  <svg
                    className="animate-spin ml-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                </div>
              ) : (
                "Search"
              )}
            </button>
          </form>
        </div>
      )}

      {/* Alert for no student found */}
      {notFoundError && (
        <div className="text-white font-medium text-md bg-red-600 rounded-md w-[250px] text-center py-2 absolute bottom-8 right-8">
          {notFoundError}
        </div>
      )}

      {/* Student Data after search */}
      {studentData && (
        <div className="flex flex-col justify-center items-center w-full gap-10 relative register-form">
          {/* Application Number and Candidate Name */}
          <div className="flex border-2 border-black rounded-md px-4 py-2 w-auto mt-4">
            <div className="flex justify-center items-center gap-4 w-full">
              {/* Application Number */}
              <div className="flex items-center justify-start gap-2 text-md font-medium ">
                <h2 className="text-gray-600">{"Application Number: "}</h2>
                <p className="font-bold">{studentData.appNo}</p>
              </div>
              <p>{"|"}</p>
              {/* Candidate Name */}
              <div className="flex items-center justify-start gap-2 text-md font-medium">
                <h2 className="text-gray-600">{"Name: "}</h2>
                <p className="font-bold">
                  {capitalize(studentData.first_name) +
                    " " +
                    capitalize(studentData.middle_name) +
                    " " +
                    capitalize(studentData.surname)}
                </p>
              </div>
            </div>
          </div>

          {/* Login Form Student */}
          <h2 className="text-3xl font-bold text-indigo-900">
            Management Quota Application Form{" (2024-2025)"}
          </h2>
          <div className="flex items-center justify-center text-center w-2/3 underline underline-offset-2 bg-purple-200 px-6 py-4 font-medium text-md border-2 border-indigo-900 rounded-lg mt-4">
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
          <div className="w-2/3 flex flex-col items-start gap-4 text-md font-medium text-center mb-4 bg-purple-100 border-2 border-red-600 rounded-md px-6 py-4 pb-6 my-2">
            <p className="font-medium text-center w-full">
              {"Programme applied under 10% Management Quota"}
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
                    checked={studentData.choices.btechChecked.cse_1st_shift}
                    disabled={!studentData.choices.btechChecked.cse_1st_shift}
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="it_1st_shift">{"IT-1st Shift"}</label>
                  <input
                    type="checkbox"
                    name="it_1st_shift"
                    checked={studentData.choices.btechChecked.it_1st_shift}
                    disabled={!studentData.choices.btechChecked.it_1st_shift}
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="ece_1st_shift">{"ECE-1st Shift"}</label>
                  <input
                    type="checkbox"
                    name="ece_1st_shift"
                    checked={studentData.choices.btechChecked.ece_1st_shift}
                    disabled={!studentData.choices.btechChecked.ece_1st_shift}
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="eee_1st_shift">{"EEE-1st Shift"}</label>
                  <input
                    type="checkbox"
                    name="eee_1st_shift"
                    checked={studentData.choices.btechChecked.eee_1st_shift}
                    disabled={!studentData.choices.btechChecked.eee_1st_shift}
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="cse_2nd_shift">{"CSE-2nd Shift"}</label>
                  <input
                    type="checkbox"
                    name="cse_2nd_shift"
                    checked={studentData.choices.btechChecked.cse_2nd_shift}
                    disabled={!studentData.choices.btechChecked.cse_2nd_shift}
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="it_2nd_shift">{"IT-2nd Shift"}</label>
                  <input
                    type="checkbox"
                    name="it_2nd_shift"
                    checked={studentData.choices.btechChecked.it_2nd_shift}
                    disabled={!studentData.choices.btechChecked.it_2nd_shift}
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="ece_2nd_shift">{"ECE-2nd Shift"}</label>
                  <input
                    type="checkbox"
                    name="ece_2nd_shift"
                    checked={studentData.choices.btechChecked.ece_2nd_shift}
                    disabled={!studentData.choices.btechChecked.ece_2nd_shift}
                    readOnly
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
                    checked={
                      studentData.choices.leToBtechChecked.cse_1st_shift_le
                    }
                    disabled={
                      !studentData.choices.leToBtechChecked.cse_1st_shift_le
                    }
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="it_1st_shift_le">{"IT-1st Shift"}</label>
                  <input
                    type="checkbox"
                    name="it_1st_shift_le"
                    checked={
                      studentData.choices.leToBtechChecked.it_1st_shift_le
                    }
                    disabled={
                      !studentData.choices.leToBtechChecked.it_1st_shift_le
                    }
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="ece_1st_shift_le">{"ECE-1st Shift"}</label>
                  <input
                    type="checkbox"
                    name="ece_1st_shift_le"
                    checked={
                      studentData.choices.leToBtechChecked.ece_1st_shift_le
                    }
                    disabled={
                      !studentData.choices.leToBtechChecked.ece_1st_shift_le
                    }
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="eee_1st_shift_le">{"EEE-1st Shift"}</label>
                  <input
                    type="checkbox"
                    name="eee_1st_shift_le"
                    checked={
                      studentData.choices.leToBtechChecked.eee_1st_shift_le
                    }
                    disabled={
                      !studentData.choices.leToBtechChecked.eee_1st_shift_le
                    }
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="cse_2nd_shift_le">{"CSE-2nd Shift"}</label>
                  <input
                    type="checkbox"
                    name="cse_2nd_shift_le"
                    checked={
                      studentData.choices.leToBtechChecked.cse_2nd_shift_le
                    }
                    disabled={
                      !studentData.choices.leToBtechChecked.cse_2nd_shift_le
                    }
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="it_2nd_shift_le">{"IT-2nd Shift"}</label>
                  <input
                    type="checkbox"
                    name="it_2nd_shift_le"
                    checked={
                      studentData.choices.leToBtechChecked.it_2nd_shift_le
                    }
                    disabled={
                      !studentData.choices.leToBtechChecked.it_2nd_shift_le
                    }
                    readOnly
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="ece_2nd_shift_le">{"ECE-2nd Shift"}</label>
                  <input
                    type="checkbox"
                    name="ece_2nd_shift_le"
                    checked={
                      studentData.choices.leToBtechChecked.ece_2nd_shift_le
                    }
                    disabled={
                      !studentData.choices.leToBtechChecked.ece_2nd_shift_le
                    }
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Program Details Component*/}
          <div className="w-full flex flex-col justify-center items-center gap-6">
            {/* Programme Name */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="programme_name"
                className="text-md w-1/3 font-semibold"
              >
                {"Programme Name *"}
              </label>
              <div
                name="programme_name"
                id="programme_name"
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
              >
                {studentData.programmeName}
              </div>
            </div>
            {/* Stream */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="stream" className="text-md w-1/3 font-semibold">
                {"Stream *"}
              </label>
              <div
                name="stream"
                id="stream"
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
              >
                {studentData.stream}
              </div>
            </div>
            {/* Preferred Choice of shift */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="stream" className="text-md w-1/3 font-semibold">
                {"Preferred Choice of Shift *"}
              </label>
              <div
                name="shift"
                id="shift"
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
              >
                {studentData.shift}
              </div>
            </div>
            {/* GGSIPU Registration Number */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="GGSIPU_Registration_No"
                className="text-md w-1/3 font-semibold"
              >
                {"GGSIPU Online Application Form (Registration No.) *"}
              </label>
              <div
                name="ggsipu_registration_no"
                id="GGSIPU_Registration_No"
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
              >
                {studentData.appNo}
              </div>
            </div>
            {/* Registration Date */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="Registration_Date"
                className="text-md w-1/3 font-semibold"
              >
                {"Registration Date *"}
              </label>
              <div
                name="registration_date"
                id="Registration_Date"
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
              >
                {formattedDate(studentData.regDate)}
              </div>
            </div>
            {/* Roll NO CET/JEE LE */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="jee_cet_rollno"
                className="text-md w-1/3 font-semibold"
              >
                {"NLT(JEE)/CET Roll No.(L.E.)"}
              </label>
              <div
                name="jee_cet_rollno"
                id="jee_cet_rollno"
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
              >
                {studentData.rollNo || "......"}
              </div>
            </div>
            {/* Rank CET/JEE LE */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="jee_cet_rank"
                className="text-md w-1/3 font-semibold"
              >
                {"NLT(JEE)/CET (LE)Rank"}
              </label>
              <div
                name="jee_cet_rank"
                id="jee_cet_rank"
                className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
              >
                {studentData.rank || "......"}
              </div>
            </div>
            {/* Registration form missing error */}
            {!studentData.registrationForm && (
              <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                {`Registration form missing`}
              </p>
            )}
            {/* GGSIPU Registration Form Upload */}
            <div className="w-[80%] flex justify-center items-center">
              <div className="w-[85%] flex gap-12 items-center justify-between bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                <label
                  htmlFor="ggsipu_registration_form_upload"
                  className="w-1/3 text-left text-md font-medium"
                >
                  {
                    "Attached Duly Submitted Filled Up Online Registration Form of GGSIPU in the portal for relevant programmes. *"
                  }{" "}
                </label>
                {studentData.registrationForm ? (
                  <div className="flex items-center gap-2 ">
                    <p className="w-[250px] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                      <Link
                        className="text-indigo-500 rounded-md p-2 hover:text-indigo-700 hover:underline"
                        href={studentData.registrationForm}
                        target="_blank"
                      >
                        {"Download Registration Form"}
                      </Link>
                    </p>
                  </div>
                ) : (
                  <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                    {`Registration form missing`}
                  </p>
                )}
              </div>
            </div>
            {/* Admit Card Upload */}
            <div className="w-[80%] flex justify-center items-center">
              <div className="w-[85%] flex gap-12 items-center justify-between bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                <label
                  htmlFor="ggsipu_registration_form_upload"
                  className="w-2/3 text-left text-md font-medium"
                >
                  {"Attached Admit Card and Rank Proof. *"}{" "}
                </label>
                {studentData.admitCard ? (
                  <div className="flex items-center gap-2 ">
                    <p className="w-[250px] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                      <Link
                        className="text-indigo-500 rounded-md p-2 hover:text-indigo-700 hover:underline"
                        href={studentData.admitCard}
                        target="_blank"
                      >
                        {"Download Admit Card"}
                      </Link>
                    </p>
                  </div>
                ) : (
                  <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                    {`Admit Card missing`}
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
              <label
                htmlFor="first_name"
                className="text-md w-1/3 font-semibold"
              >
                {"Candidate's Name *"}
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <div
                  name="first_name"
                  id="first_name"
                  className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md"
                >
                  {capitalize(studentData.first_name) +
                    "" +
                    capitalize(studentData.middle_name) +
                    " " +
                    capitalize(studentData.surname)}
                </div>
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
                <div className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md">
                  {capitalize(studentData.father_first_name) +
                    "" +
                    capitalize(studentData.father_middle_name) +
                    " " +
                    capitalize(studentData.father_surname)}
                </div>
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
                <div className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md">
                  {capitalize(studentData.mother_first_name) +
                    "" +
                    capitalize(studentData.mother_middle_name) +
                    " " +
                    capitalize(studentData.mother_surname)}
                </div>
              </div>
            </div>
            {/* Legible Postal Address */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="legible_postal_address"
                className="text-md w-1/3 font-semibold"
              >
                {"Legible Postal Address"}
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <div className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md">
                  {studentData.legible_postal_address}
                </div>
              </div>
            </div>
            {/* Legible Contact Nos. and Email I.D. */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="legible_contact"
                className="text-md w-1/3 font-semibold"
              >
                {"Legible Contact No."}
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <div className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md">
                  {studentData.legible_contact}
                </div>
              </div>
            </div>
            {/* Legible Email I.D. */}
            <div className="w-full flex justify-center items-center">
              <label
                htmlFor="legible_email"
                className="text-md w-1/3 font-semibold"
              >
                {"Legible Email I.D."}
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <div className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md">
                  {studentData.legible_email}
                </div>
              </div>
            </div>
            {/* Date of Birth (in Christian Era) */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="dob" className="text-md w-1/3 font-semibold">
                {"Date of Birth (in Christian Era) *"}
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <div className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md">
                  {formattedDate(studentData.dob)}
                </div>
              </div>
            </div>
            {/* Category Selection for Reservation */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="category" className="text-md w-1/3 font-semibold">
                {"Category"}
              </label>
              <div className="w-1/2 flex gap-6 items-center justify-center">
                <div className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md">
                  {studentData.category}
                </div>
              </div>
            </div>
            {/* Category Certificate Attachment */}
            {studentData.category_certificate && (
              <div className="w-full flex justify-center items-center">
                <div className="w-[85%] flex gap-12 items-center justify-between bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                  <label
                    htmlFor="category_certificate_link"
                    className="w-2/3 text-left text-md font-medium"
                  >
                    {
                      "Attached Category Certificate (SC/ST/PWD/Entitlement Card (Defence)) along with the relevant Appendix format as per the GGSIPU Admission Brochure 2024-25 for claiming reservation."
                    }{" "}
                  </label>
                  {studentData.category_certificate ? (
                    <div className="flex items-center gap-2 ">
                      <p className="w flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                        <Link
                          className="text-indigo-500 rounded-md p-2 hover:text-indigo-700 hover:underline"
                          href={studentData.category_certificate}
                          target="_blank"
                        >
                          {"Category Certificate"}
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                      {`Category Certificate missing`}
                    </p>
                  )}
                </div>
              </div>
            )}
            {/* Delhi/Outside Delhi Region */}
            <div className="w-full flex justify-center items-center">
              <label htmlFor="region" className="text-md w-1/3 font-semibold">
                {
                  "Whether the Candidate Belongs to Delhi Region/Outside Delhi Region *"
                }
              </label>
              <div className="w-1/2 flex gap-4 items-center justify-center">
                <div className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md">
                  {studentData.region + " Region"}
                </div>
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
                  <label
                    htmlFor="board"
                    className="text-md w-1/3 font-semibold"
                  >
                    {"Board *"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {upper(studentData.board)}
                  </div>
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="roll_no"
                    className="text-md w-1/3 font-semibold"
                  >
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
              <div className="w-[71%] flex justify-left items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="year"
                    className="text-md w-1/3 font-semibold mr-16"
                  >
                    {"Year *"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.year}
                  </div>
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
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subject_1}
                  </div>
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_2"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 2"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subject_2}
                  </div>
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
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subject_3}
                  </div>
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_4"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 4"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subject_4}
                  </div>
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
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subject_5}
                  </div>
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_6"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 6"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subject_6 || "......"}
                  </div>
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
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.total_marks}
                  </div>
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="total_percentage"
                    className="text-md w-2/3 font-semibold mr-2"
                  >
                    {"Percentage *"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.total_percentage}
                  </div>
                </div>
              </div>
              {/* 10th Marksheet & Passing Certificate */}
              <div className="w-[85%] flex justify-center items-center">
                <div className="w-[85%] flex gap-12 items-center justify-between bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                  <label
                    htmlFor="10th_marksheet_upload"
                    className="w-2/3 text-left text-md font-medium"
                  >
                    {
                      "Attached 10th Marksheet & Passing Certificate Google Drive Link (Anyone with the link) *"
                    }{" "}
                  </label>
                  {studentData.marksheet_10 ? (
                    <div className="flex items-center gap-2 ">
                      <p className="w flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                        <Link
                          className="text-indigo-500 rounded-md p-2 hover:text-indigo-700 hover:underline"
                          href={studentData.marksheet_10}
                          target="_blank"
                        >
                          {"Download 10th Marksheet"}
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                      {`10th Marksheet missing`}
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
                  <label
                    htmlFor="board_12"
                    className="text-md w-1/3 font-semibold"
                  >
                    {"Board *"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {upper(studentData.board_12)}
                  </div>
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="roll_no_12"
                    className="text-md w-1/3 font-semibold"
                  >
                    {"Roll No. *"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.roll_no_12}
                  </div>
                </div>
              </div>
              {/* year */}
              <div className="w-[71%] flex justify-left items-center">
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="year_12"
                    className="text-md w-1/3 font-semibold mr-16"
                  >
                    {"Year *"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.year_12}
                  </div>
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
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subject_1_12}
                  </div>
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_2_12"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 2"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subject_2_12}
                  </div>
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
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subject_3_12}
                  </div>
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_4_12"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 4"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subject_4_12}
                  </div>
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
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subject_5_12}
                  </div>
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="subject_6_12"
                    className="text-md w-1/3 font-semibold mr-2"
                  >
                    {"Subject 6"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subject_6_12 || "......"}
                  </div>
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
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.total_marks_12}
                  </div>
                </div>
                <div className="w-1/3 flex justify-between items-center">
                  <label
                    htmlFor="total_percentage_12"
                    className="text-md w-2/3 font-semibold mr-2"
                  >
                    {"Percentage *"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.total_percentage_12}
                  </div>
                </div>
              </div>
              {/* PCM: Total marks and Percentage*/}
              <div className="w-full flex flex-col justify-center gap-4 items-center">
                <div className="w-[71%] flex justify-between items-center">
                  <label
                    htmlFor="pcm_marks"
                    className="text-md w-2/3 font-semibold mr-10"
                  >
                    {"Total Marks in PCM *"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.pcm_marks}
                  </div>
                </div>
                <div className="w-[71%] flex justify-between items-center">
                  <label
                    htmlFor="pcm_percentage"
                    className="text-md w-2/3 font-semibold mr-10"
                  >
                    {"Percentage in PCM *"}
                  </label>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.pcm_percentage}
                  </div>
                </div>
              </div>
              {/* 12th Marksheet & Passing Certificate */}
              <div className="w-[85%] flex justify-center items-center">
                <div className="w-[85%] flex gap-12 items-center justify-between bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                  <label
                    htmlFor="12th_marksheet_upload"
                    className="w-2/3 text-left text-md font-medium"
                  >
                    {
                      "Attached 12th Marksheet & Passing Certificate Google Drive Link (Anyone with the link)."
                    }{" "}
                  </label>
                  {studentData.marksheet_12 ? (
                    <div className="flex items-center gap-2 ">
                      <p className="w flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                        <Link
                          className="text-indigo-500 rounded-md p-2 hover:text-indigo-700 hover:underline"
                          href={studentData.marksheet_12}
                          target="_blank"
                        >
                          {"Download 12th Marksheet"}
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                      {`12th Marksheet missing`}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Diploma Students Lateral Entry B.tech */}
            {studentData.university !== "" && (
              <div className="w-[90%] flex flex-col items-center gap-6 border-2 border-indigo-200 p-4 rounded-lg">
                <div className="w-[90%] my-2 font-medium text-md bg-purple-100 border-2 border-red-600 rounded-md p-4 text-center">
                  {
                    "* To be filled by Applicants of B.Tech. (Lateral Entry) Programme "
                  }
                </div>
                {/* University and rollno */}
                <div className="w-full flex justify-center gap-12 items-center">
                  <div className="w-1/3 flex justify-between items-center">
                    <label
                      htmlFor="university"
                      className="text-md w-2/3 font-semibold"
                    >
                      {"University "}
                    </label>
                    <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                      {capitalize(studentData.university)}
                    </div>
                  </div>
                  <div className="w-1/3 flex justify-between items-center">
                    <label
                      htmlFor="roll_no_university"
                      className="text-md w-1/3 font-semibold"
                    >
                      {"Roll No. "}
                    </label>
                    <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                      {studentData.roll_no_university}
                    </div>
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
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subjects_1st_year}
                  </div>
                </div>
                <div className="w-[75%] flex justify-center gap-6 items-center">
                  {/* Total Marks, Marks Obtained and Percentage in 1st year */}
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.t_m_1}
                  </div>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.m_o_1}
                  </div>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.p_1}
                  </div>
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
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subjects_2nd_year}
                  </div>
                </div>

                <div className="w-[75%] flex justify-center gap-6 items-center">
                  {/* Total Marks, Marks Obtained and Percentage in 1st year */}
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.t_m_2}
                  </div>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.m_o_2}
                  </div>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.p_2}
                  </div>
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
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.subjects_3rd_year}
                  </div>
                </div>

                <div className="w-[75%] flex justify-center gap-6 items-center">
                  {/* Total Marks, Marks Obtained and Percentage in 3rd year */}
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.t_m_3}
                  </div>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.m_o_3}
                  </div>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.p_3}
                  </div>
                </div>

                <h2 className="text-md font-medium my-2 underline underline-offset-2">
                  {"Aggregate"}
                </h2>
                <div className="w-[75%] flex justify-center gap-6 items-center">
                  {/* Total Marks, Marks Obtained and Percentage Aggregate */}
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.t_m_total}
                  </div>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.m_o_total}
                  </div>
                  <div className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md">
                    {studentData.p_total}
                  </div>
                </div>

                {/* Diploma Marksheet & Passing Certificate */}
                <div className="w-full flex justify-center items-center">
                  <div className="w-[85%] flex gap-12 items-center justify-between bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                    <label
                      htmlFor="diploma_certificate_link"
                      className="w-2/3 text-left text-md font-medium"
                    >
                      {
                        "Attached Diploma Marksheet of all semester examinations & Passing Certificate(for Lateral Entry).*"
                      }{" "}
                    </label>
                    {studentData.diploma_certificate ? (
                      <div className="flex items-center gap-2 ">
                        <p className="w flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                          <Link
                            className="text-indigo-500 rounded-md p-2 hover:text-indigo-700 hover:underline"
                            href={studentData.diploma_certificate}
                            target="_blank"
                          >
                            {"Download Diploma Certificate"}
                          </Link>
                        </p>
                      </div>
                    ) : (
                      <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                        {`Diploma Certificate missing`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

          {/* Payment Component */}
          <div className="w-full flex flex-col justify-center items-center gap-6">
            <div className="flex flex-col items-start gap-4 text-md font-medium text-center mb-4 bg-purple-100 border-2 border-red-600 rounded-md w-[90%] px-6 py-6">
              <p>
                {"* Deposit"}{" "}
                <span className="font-bold">{" Rs. 5000/- "}</span>{" "}
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
                  {"C-4, Janakpuri, New Delhi-110058"}
                </p>
                <div className="w-full flex justify-center items-center">
                  <div className="w-[100%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                    <label
                      htmlFor="payment_script_proof_link"
                      className="w-full text-left text-md font-medium"
                    >
                      {"Payment Receipt (Proof) *"}
                    </label>
                    {studentData.paymentReceipt ? (
                      <div className="flex items-center gap-2 ">
                        <p className="w-[250px] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                          <Link
                            className="text-indigo-500 rounded-md p-2 hover:text-indigo-700 hover:underline"
                            href={studentData.paymentReceipt}
                            target="_blank"
                          >
                            {"Download Payment Receipt"}
                          </Link>
                        </p>
                      </div>
                    ) : (
                      <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                        {`Payment Receipt missing`}
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
                <div className="w-full justify-between flex items-center">
                  <div className="">
                    <label htmlFor="date">{"Date: "}</label>
                    <input
                      type="text"
                      name="date"
                      id="date"
                      value={studentData.createdAt}
                      readOnly
                      className="outline-none bg-inherit border-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="candidate_sign" className="mr-4">
                      {"Signature of the Candidate: "}
                    </label>
                    {studentData.candidateSignature ? (
                      <div className="flex items-center gap-2 ">
                        <p className="w-[250px] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                          <Link
                            className="text-indigo-500 rounded-md p-2 hover:text-indigo-700 hover:underline"
                            href={studentData.candidateSignature}
                            target="_blank"
                          >
                            {"Download Candidate Signature"}
                          </Link>
                        </p>
                      </div>
                    ) : (
                      <p className="w-full flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                        {"Candidate Signature Missing"}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-md font-medium text-justify my-2">
                  {
                    "I have carefully read and verified the information furnished by my son/daughter/ward and affirm that it is true and correct and he/she fulfills the eligibility conditions as mentioned in the Admission Bulletin/Rules of GGSIPU."
                  }
                </p>
                <div className="w-full justify-between flex items-center">
                  <div className="">
                    <label htmlFor="date_2">{"Date: "}</label>
                    <input
                      type="text"
                      name="date_2"
                      id="date_2"
                      value={studentData.createdAt}
                      readOnly
                      className="outline-none bg-inherit border-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="parent_sign" className="mr-4">
                      {"Signature of Father/Mother: "}
                    </label>
                    {studentData.parentSignature ? (
                      <div className="flex items-center gap-2 ">
                        <p className="w-[250px] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                          <Link
                            className="text-indigo-500 rounded-md p-2 hover:text-indigo-700 hover:underline"
                            href={studentData.parentSignature}
                            target="_blank"
                          >
                            {"Download Parent Signature"}
                          </Link>
                        </p>
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

          {/* Form No */}
          <div className="hidden border-2 border-indigo-900 flex items-center justify-between gap-2 absolute left-8 top-16 px-4 py-2 rounded-lg">
            <p className="text-md">{"Application No. "}</p>
            <span className="text-md font-bold underline underline-offset-2">
              {studentData.appNo}
            </span>
          </div>
          {/* Passport size photograph upload */}
          <div className="w-36 h-36 border border-indigo-900 flex justify-center items-center gap-2 absolute right-8 top-40 cursor-pointer  rounded-lg no-print">
            {studentData.passportPhoto ? (
              <Link
                href={studentData.passportPhoto}
                download
                className="w-2/3 text-center font-medium text-indigo-600 hover:text-indigo-700 active:text-indigo-600 hover:underline"
                target="_blank"
              >
                {"Download"} <br />{" "}
                {capitalize(studentData.first_name) +
                  " " +
                  capitalize(studentData.surname)}{" "}
                <br />
                {"Photo"}
              </Link>
            ) : (
              <p className="text-center font-medium text-red-600">
                Student Passport Photo Missing
              </p>
            )}
          </div>
        </div>
      )}

      {/* Go back button */}
      {studentData && (
        <button
          className={`bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600 absolute flex gap-2 ${
            studentData ? "-top-12" : "top-8"
          } right-44 text-white px-4 py-2 font-semibold rounded-md flex items-center justify-center`}
          onClick={() => {
            setStudentData(null);
            setShowSearchBox(true);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          {"Go Back"}
        </button>
      )}

      {/* Access Student List Button after authorization */}
      {showSearchBox && (
        <button
          className={`bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600 absolute flex gap-2 ${
            studentData ? "-top-12" : "top-8"
          } right-8 text-white px-4 py-2 font-semibold rounded-md flex items-center justify-center`}
          onClick={(e) => {
            handleAccessList(e);
          }}
        >
          <FontAwesomeIcon icon={faLockOpen} />
          {"Access Student List"}
        </button>
      )}

      {/* Access List Modal */}
      {showAccessList && (
        <StudentListModal
          fetchStudentData={fetchStudentData}
          onSelect={handleSelectStudent}
          onClose={handleClose}
        />
      )}

      {/* Access Student list Button before authorization */}
      {showLoginBox && (
        <button
          className={`bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600 absolute flex gap-2 ${
            studentData ? "-top-12" : "top-8"
          } right-8 text-white px-4 py-2 font-semibold rounded-md flex items-center justify-center`}
          onClick={() => {
            usernameInputRef.current.focus();
          }}
        >
          <FontAwesomeIcon icon={faLock} />
          {"Access Student List"}
        </button>
      )}

      {/* Download PDF Button */}
      {studentData && (
        <button
          type="submit"
          className={`bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600 absolute flex gap-2 ${
            studentData ? "-top-12" : "top-8"
          } right-8 text-white px-4 py-2 font-semibold rounded-md flex items-center justify-center
            ${
              isDownloadLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          onClick={(e) => handleDownloadPDF(e)}
        >
          {isDownloadLoading ? (
            <div className="flex items-center">
              {"Loading..."}
              <svg
                className="animate-spin ml-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="flex gap-2 items-center justify-center">
              {"Download"}
              <FontAwesomeIcon icon={faFilePdf} />
            </div>
          )}
        </button>
      )}
    </main>
  );
}
