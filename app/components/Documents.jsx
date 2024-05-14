"use client";
import React, { useState, useEffect } from "react";

const Documents = ({ setDocumentsValid, handleDocumentsData }) => {
  const [files, setFiles] = useState({
    "10th_marksheet": null,
    "12th_marksheet": null,
    diploma_certificate: null,
  });

  const [marksheet_error_10, setMarksheetError_10] = useState("");
  const [marksheet_error_12, setMarksheetError_12] = useState("");
  const [diploma_certificate_error, setDiplomaCertificateError] = useState("");

  const [formValues, setFormValues] = useState({
    board: "",
    roll_no: "",
    year: "",
    subject_1: "",
    subject_2: "",
    subject_3: "",
    subject_4: "",
    subject_5: "",
    subject_6: "",
    total_marks: "",
    total_percentage: "",
    board_12: "",
    roll_no_12: "",
    year_12: "",
    subject_1_12: "",
    subject_2_12: "",
    subject_3_12: "",
    subject_4_12: "",
    subject_5_12: "",
    subject_6_12: "",
    total_marks_12: "",
    total_percentage_12: "",
    university: "",
    roll_no_university: "",
    subjects_1st_year: "",
    t_m_1: "",
    m_o_1: "",
    p_1: "",
    subjects_2nd_year: "",
    t_m_2: "",
    m_o_2: "",
    p_2: "",
    subjects_3rd_year: "",
    t_m_3: "",
    m_o_3: "",
    p_3: "",
  });

  useEffect(() => {
    const isFormFilled = Object.values(formValues).every(
      (value) => value !== ""
    );

    const areDocumentsUploaded =
      files["10th_marksheet"] !== null &&
      files["12th_marksheet"] !== null &&
      (formValues.university === "" || files["diploma_certificate"] !== null);

    if (!files["10th_marksheet"])
      setMarksheetError_10(
        "Please upload 10th Marksheet and Passing Certificate."
      );
    else setMarksheetError_10("");

    if (!files["12th_marksheet"])
      setMarksheetError_12(
        "Please upload 12th Marksheet and Passing Certificate."
      );
    else setMarksheetError_12("");

    if (!files["diploma_certificate"] && formValues.university !== "")
      setDiplomaCertificateError(
        "Please upload Diploma Marksheet and Passing Certificate."
      );
    else setDiplomaCertificateError("");

    if (isFormFilled /*&& areDocumentsUploaded */) {
      console.log("Documents are valid now!");
      handleDocumentsData({
        board,
        roll_no,
        year,
        subject_1,
        subject_2,
        subject_3,
        subject_4,
        subject_5,
        subject_6,
        total_marks,
        total_percentage,
        board_12,
        roll_no_12,
        year_12,
        subject_1_12,
        subject_2_12,
        subject_3_12,
        subject_4_12,
        subject_5_12,
        subject_6_12,
        total_marks_12,
        total_percentage_12,
        university,
        roll_no_university,
        subjects_1st_year,
        t_m_1,
        m_o_1,
        p_1,
        subjects_2nd_year,
        t_m_2,
        m_o_2,
        p_2,
        subjects_3rd_year,
        t_m_3,
        m_o_3,
        p_3,

        // ...files,
      });
      setDocumentsValid(true);
    } else {
      console.log("Documents are invalid now!");
      setDocumentsValid(false);
    }
  }, [formValues, files, setDocumentsValid, handleDocumentsData]);

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    setFiles({ ...files, [type]: file });
  };

  const handleFileRemove = (type) => {
    setFiles({ ...files, [type]: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let percentage_diploma = 0;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));

    if (name === "m_o_1" && formValues.t_m_1 !== 0) {
      percentage_diploma =
        (parseFloat(value) / parseFloat(formValues.t_m_1)) * 100;
    } else if (name === "m_o_2" && formValues.t_m_2 !== 0) {
      percentage_diploma =
        (parseFloat(value) / parseFloat(formValues.t_m_2)) * 100;
    } else if (name === "m_o_3" && formValues.t_m_3 !== 0) {
      percentage_diploma =
        (parseFloat(value) / parseFloat(formValues.t_m_3)) * 100;
    }

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name === "m_o_1" ? "p_1" : name === "m_o_2" ? "p_2" : "p_3"]:
        percentage_diploma.toFixed(2),
    }));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <h2 className="font-semibold text-xl my-2">
        {"Details of Examination Passed"}{" "}
      </h2>
      <div className="text-md font-medium text-center mb-4 bg-purple-100 border-2 border-red-600 rounded-md w-[90%] p-4">
        {
          "The marks should be clearly written and the percentage be specifically calculated strictly as mentioned by GGSIPU in Admission Brochure 2024-2025 as per opting / choice of programme."
        }
      </div>
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
              value={formValues.board}
              onChange={handleInputChange}
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
              value={formValues.roll_no}
              onChange={handleInputChange}
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
              value={formValues.year}
              onChange={handleInputChange}
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
              placeholder="Marks"
              value={formValues.subject_1}
              onChange={handleInputChange}
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
              value={formValues.subject_2}
              onChange={handleInputChange}
              placeholder="Marks"
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
              value={formValues.subject_3}
              onChange={handleInputChange}
              placeholder="Marks"
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
              placeholder="Marks"
              value={formValues.subject_4}
              onChange={handleInputChange}
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
              placeholder="Marks"
              value={formValues.subject_5}
              onChange={handleInputChange}
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
              placeholder="Marks"
              value={formValues.subject_6}
              onChange={handleInputChange}
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
              value={formValues.total_marks}
              onChange={handleInputChange}
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
              value={formValues.total_percentage}
              onChange={handleInputChange}
              required
              className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
            />
          </div>
        </div>
        {marksheet_error_10 && (
          <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
            {marksheet_error_10}
          </p>
        )}
        {/* 10th Marksheet & Passing Certificate */}
        <div className="w-full flex justify-center items-center mb-2">
          <div className="w-[90%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
            <label
              htmlFor="10th_marksheet_upload"
              className="w-2/3 text-left text-md font-medium"
            >
              {"Please attach 10th Marksheet & Passing Certificate. *"}{" "}
            </label>
            {files["10th_marksheet"] ? (
              <div className="flex items-center gap-2 ">
                <span className="bg-gray-100 rounded-md p-2">
                  {files["10th_marksheet"].name}
                </span>
                <button
                  onClick={() => handleFileRemove("10th_marksheet")}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  name="10th_marksheet_upload"
                  id="10th_marksheet_upload"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, "10th_marksheet")}
                  className="hidden"
                  required
                />
                <label
                  htmlFor="10th_marksheet_upload"
                  className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                >
                  {"Upload Marksheet"}
                </label>
              </div>
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
              value={formValues.board_12}
              onChange={handleInputChange}
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
              value={formValues.roll_no_12}
              onChange={handleInputChange}
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
              value={formValues.year_12}
              onChange={handleInputChange}
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
              placeholder="Marks"
              value={formValues.subject_1_12}
              onChange={handleInputChange}
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
              placeholder="Marks"
              value={formValues.subject_2_12}
              onChange={handleInputChange}
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
              placeholder="Marks"
              value={formValues.subject_3_12}
              required
              onChange={handleInputChange}
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
              placeholder="Marks"
              value={formValues.subject_4_12}
              required
              onChange={handleInputChange}
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
              placeholder="Marks"
              value={formValues.subject_5_12}
              onChange={handleInputChange}
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
              placeholder="Marks"
              value={formValues.subject_6_12}
              onChange={handleInputChange}
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
              value={formValues.total_marks_12}
              onChange={handleInputChange}
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
              value={formValues.total_percentage_12}
              onChange={handleInputChange}
              required
              className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
            />
          </div>
        </div>
        {marksheet_error_12 && (
          <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
            {marksheet_error_12}
          </p>
        )}
        {/* 12th Marksheet & Passing Certificate */}
        <div className="w-full flex justify-center items-center mb-2">
          <div className="w-[90%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
            <label
              htmlFor="12th_marksheet_upload"
              className="w-2/3 text-left text-md font-medium"
            >
              {"Please attach 12th Marksheet & Passing Certificate. *"}{" "}
            </label>
            {files["12th_marksheet"] ? (
              <div className="flex items-center gap-2 ">
                <span className="bg-gray-100 rounded-md p-2">
                  {files["12th_marksheet"].name}
                </span>
                <button
                  onClick={() => handleFileRemove("12th_marksheet")}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  name="12th_marksheet_upload"
                  id="12th_marksheet_upload"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, "12th_marksheet")}
                  className="hidden"
                />
                <label
                  htmlFor="12th_marksheet_upload"
                  className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                >
                  {"Upload Marksheet"}
                </label>
              </div>
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
              value={formValues.university}
              onChange={handleInputChange}
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
              value={formValues.roll_no_university}
              onChange={handleInputChange}
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
            value={formValues.subjects_1st_year}
            onChange={handleInputChange}
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
            value={formValues.t_m_1}
            onChange={handleInputChange}
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
          <input
            type="number"
            name="m_o_1"
            id="m_o_1"
            autoComplete="off"
            placeholder="Marks Obtained"
            value={formValues.m_o_1}
            onChange={handleInputChange}
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
          <input
            type="number"
            name="p_1"
            id="p_1"
            autoComplete="off"
            placeholder="Percentage (%)"
            value={formValues.p_1}
            onChange={handleInputChange}
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
            value={formValues.subjects_2nd_year}
            onChange={handleInputChange}
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
            value={formValues.t_m_2}
            onChange={handleInputChange}
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
          <input
            type="number"
            name="m_o_2"
            id="m_o_2"
            autoComplete="off"
            placeholder="Marks Obtained"
            value={formValues.m_o_2}
            onChange={handleInputChange}
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
          <input
            type="number"
            name="p_2"
            id="p_2"
            autoComplete="off"
            placeholder="Percentage (%)"
            value={formValues.p_2}
            onChange={handleInputChange}
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
            value={formValues.subjects_3rd_year}
            onChange={handleInputChange}
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
            value={formValues.t_m_3}
            onChange={handleInputChange}
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
          <input
            type="number"
            name="m_o_3"
            id="m_o_3"
            autoComplete="off"
            placeholder="Marks Obtained"
            value={formValues.m_o_3}
            onChange={handleInputChange}
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
          <input
            type="number"
            name="p_3"
            id="p_3"
            autoComplete="off"
            placeholder="Percentage (%)"
            value={formValues.p_3}
            onChange={handleInputChange}
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
        </div>

        {diploma_certificate_error && (
          <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
            {diploma_certificate_error}
          </p>
        )}
        {/* Diploma Marksheet & Passing Certificate */}
        <div className="w-full flex justify-center items-center mb-2">
          <div className="w-[90%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
            <label
              htmlFor="diploma_certificate"
              className="w-2/3 text-left text-md font-medium"
            >
              {
                "Please attach Diploma Marksheet of all semester examinations & Passing Certificate(for Lateral Entry). *"
              }{" "}
            </label>
            {files["diploma_certificate"] ? (
              <div className="flex items-center gap-2 ">
                <span className="bg-gray-100 rounded-md p-2">
                  {files["diploma_certificate"].name}
                </span>
                <button
                  onClick={() => handleFileRemove("diploma_certificate")}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  name="diploma_certificate"
                  id="diploma_certificate"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, "diploma_certificate")}
                  className="hidden"
                />
                <label
                  htmlFor="diploma_certificate"
                  className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                >
                  {"Upload Marksheet"}
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
