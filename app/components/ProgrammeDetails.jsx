"use client";
import React, { useState, useEffect } from "react";
const ProgrammeDetails = ({
  setProgrammeDetailsValid,
  handleProgrammeData,
}) => {
  const [programmeName, setProgrammeName] = useState("");
  const [stream, setStream] = useState("");
  const [shift, setShift] = useState("");
  const [appNo, setAppNo] = useState("");
  const [regDate, setRegDate] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [rank, setRank] = useState("");
  const [registrationForm, setRegistrationForm] = useState(null);
  const [admitCard, setAdmitCard] = useState(null);
  const [registrationFormError, setRegistrationFormError] = useState("");
  const [admitCardError, setAdmitCardError] = useState("");

  useEffect(() => {
    const isValid =
      programmeName &&
      stream &&
      shift &&
      appNo &&
      regDate &&
      registrationForm &&
      admitCard;
    setProgrammeDetailsValid(isValid);

    if (!registrationForm) {
      setRegistrationFormError("Please upload GGSIPU Registration Form.");
    } else {
      setRegistrationFormError("");
    }

    if (!admitCard) {
      setAdmitCardError("Please upload Admit Card.");
    } else {
      setAdmitCardError("");
    }

    if (isValid) {
      console.log("Programme Details Valid!");
      handleProgrammeData({
        programmeName,
        stream,
        shift,
        appNo,
        regDate,
        rollNo,
        rank,
        // registrationForm,
        // admitCard,
      });
    } else {
      console.log("Programme Details Invalid!");
    }
  }, [
    programmeName,
    stream,
    shift,
    appNo,
    regDate,
    registrationForm,
    admitCard,
    setProgrammeDetailsValid,
    handleProgrammeData,
  ]);

  const handleProgrammeSelect = (e) => setProgrammeName(e.target.value);
  const handleStreamSelect = (e) => setStream(e.target.value);
  const handleShiftSelect = (e) => setShift(e.target.value);
  const handleApplicationNo = (e) => setAppNo(e.target.value);
  const handleRegistrationDate = (e) => setRegDate(e.target.value);
  const handleRollNo = (e) => setRollNo(e.target.value);
  const handleRank = (e) => setRank(e.target.value);
  const handleRegistrationFormUpload = (e) =>
    setRegistrationForm(e.target.files[0]);
  const handleAdmitCardUpload = (e) => setAdmitCard(e.target.files[0]);
  const handleRegistrationFormRemove = () => setRegistrationForm(null);
  const handleAdmitCardRemove = () => setAdmitCard(null);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <div className="w-full flex justify-center items-center">
        <label htmlFor="programme_name" className="text-md w-1/3 font-semibold">
          {"Programme Name *"}
        </label>
        <select
          name="programme_name"
          id="programme_name"
          className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
          onChange={handleProgrammeSelect}
          value={programmeName}
          required
        >
          <option value="">Select Programme</option>
          <option value="B.Tech">B.tech</option>
          <option value="L.E B.Tech">{"(L.E)"} B.tech</option>
        </select>
      </div>
      <div className="w-full flex justify-center items-center">
        <label htmlFor="stream" className="text-md w-1/3 font-semibold">
          {"Stream *"}
        </label>
        <select
          name="stream"
          id="stream"
          className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
          onChange={handleStreamSelect}
          value={stream}
          required
        >
          <option value="">Select Stream</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
        </select>
      </div>
      <div className="w-full flex justify-center items-center">
        <label className="text-md w-[43.5%] font-semibold">
          {"Preferred Choice of Shift *"}{" "}
        </label>
        <div className="flex justify-between items-center gap-8">
          <div className="flex items-center">
            <input
              type="radio"
              name="shift"
              id="1stShift"
              value="1st Shift"
              onChange={handleShiftSelect}
              required
            />
            <label htmlFor="1stShift" className="ml-2">
              1st Shift
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="shift"
              id="2ndShift"
              value="2nd Shift"
              onChange={handleShiftSelect}
            />
            <label htmlFor="2ndShift" className="ml-2">
              2nd Shift
            </label>
          </div>
        </div>
      </div>
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
          value={appNo}
          onChange={handleApplicationNo}
          className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
          required
        />
      </div>
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
          value={regDate}
          onChange={handleRegistrationDate}
          className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
          required
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <label htmlFor="jee_cet_rollno" className="text-md w-1/3 font-semibold">
          {"NLT(JEE)/CET Roll No.(L.E.)"}
        </label>
        <input
          type="text"
          name="jee_cet_rollno"
          id="jee_cet_rollno"
          autoComplete="off"
          value={rollNo}
          onChange={handleRollNo}
          className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <label htmlFor="jee_cet_rank" className="text-md w-1/3 font-semibold">
          {"NLT(JEE)/CET (LE)Rank"}
        </label>
        <input
          type="number"
          name="jee_cet_rank"
          id="jee_cet_rank"
          autoComplete="off"
          value={rank}
          onChange={handleRank}
          className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
        />
      </div>
      {/* Registration form missing error */}
      {registrationFormError && (
        <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
          {registrationFormError}
        </p>
      )}
      {/* GGSIPU Registration Form Upload */}
      <div className="w-full flex justify-center items-center">
        <div className="w-[85%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
          <label
            htmlFor="ggsipu_registration_form_upload"
            className="w-2/3 text-left text-md font-medium"
          >
            {
              "Please attach Duly Submitted Filled Up Online Registration Form of GGSIPU in the portal for relevant programmes. *"
            }{" "}
          </label>
          {registrationForm ? (
            <div className="flex items-center gap-2 ">
              <span className="bg-gray-100 rounded-md p-2">
                {registrationForm.name}
              </span>
              <button
                onClick={handleRegistrationFormRemove}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                name="ggsipu_registration_form_upload"
                id="ggsipu_registration_form_upload"
                onChange={handleRegistrationFormUpload}
                accept=".pdf"
                className="hidden"
                required
              />
              <label
                htmlFor="ggsipu_registration_form_upload"
                className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
              >
                {"Upload Form"}
              </label>
            </div>
          )}
        </div>
      </div>
      {/* Admit card missing error */}
      {admitCardError && (
        <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
          {admitCardError}
        </p>
      )}
      {/* Admit Card Upload */}
      <div className="w-full flex justify-center items-center">
        <div className="w-[85%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
          <label
            htmlFor="admit_card_upload"
            className="w-2/3 text-left text-md font-medium"
          >
            {"Please attach Admit Card and Rank Proof. *"}{" "}
          </label>
          {admitCard ? (
            <div className="flex items-center gap-2 ">
              <span className="bg-gray-100 rounded-md p-2">
                {admitCard.name}
              </span>
              <button
                onClick={handleAdmitCardRemove}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                name="admit_card_upload"
                id="admit_card_upload"
                onChange={handleAdmitCardUpload}
                className="hidden"
                accept=".pdf"
                required
              />
              <label
                htmlFor="admit_card_upload"
                className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
              >
                {"Upload Admit Card"}
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgrammeDetails;
