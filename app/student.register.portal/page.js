"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProgrammeDetails from "../components/ProgrammeDetails";
import CandidateDetails from "../components/CandidateDetails";
import Documents from "../components/Documents";
import Declaration from "../components/Declaration";
import Payment from "../components/Payment";
import SubmittedForm from "../components/SubmittedForm";

export default function StudentRegisterPortal() {
  const [isProgrammeDetailsValid, setProgrammeDetailsValid] = useState(false);
  const [isCandidateDetailsValid, setCandidateDetailsValid] = useState(false);
  const [isDocumentsValid, setDocumentsValid] = useState(false);
  const [isDeclarationValid, setDeclarationValid] = useState(false);
  const [isPaymentValid, setPaymentValid] = useState(false);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [btechChecked, setBtechChecked] = useState({
    cse_1st_shift: false,
    it_1st_shift: false,
    ece_1st_shift: false,
    eee_1st_shift: false,
    cse_2nd_shift: false,
    it_2nd_shift: false,
    ece_2nd_shift: false,
  });
  const [applicationNumber, setApplicationNumber] = useState("generating...");
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [programmeData, setProgrammeData] = useState(null);
  const [candidateData, setCandidateData] = useState(null);
  const [documentsData, setDocumentsData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [declarationData, setDeclarationData] = useState(null);

  const [leToBtechChecked, setLeToBtechChecked] = useState({
    cse_1st_shift_le: false,
    it_1st_shift_le: false,
    ece_1st_shift_le: false,
    eee_1st_shift_le: false,
    cse_2nd_shift_le: false,
    it_2nd_shift_le: false,
    ece_2nd_shift_le: false,
  });
  const [isLoading, setLoading] = useState(false);

  const handleProgrammeData = (data) => {
    setProgrammeData(data);
  };

  const handleCandidateData = (data) => {
    setCandidateData(data);
  };

  const handleDocumentsData = (data) => {
    setDocumentsData(data);
  };

  const handlePaymentData = (data) => {
    setPaymentData(data);
  };

  const handleDeclarationData = (data) => {
    setDeclarationData(data);
  };

  const handleBtechCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setBtechChecked({ ...btechChecked, [name]: checked });

    const leToBtechCheckboxes = document.querySelectorAll(
      'input[name^="cse_1st_shift_le"], input[name^="it_1st_shift_le"], input[name^="ece_1st_shift_le"], input[name^="eee_1st_shift_le"], input[name^="cse_2nd_shift_le"], input[name^="it_2nd_shift_le"], input[name^="ece_2nd_shift_le"]'
    );

    if (checked) {
      leToBtechCheckboxes.forEach((checkbox) => {
        checkbox.disabled = true;
      });
    } else {
      const allUnchecked = [...leToBtechCheckboxes].every(
        (checkbox) => !checkbox.checked
      );
      if (allUnchecked) {
        leToBtechCheckboxes.forEach((checkbox) => {
          checkbox.disabled = false;
        });
      }
    }
  };

  const handleLeToBtechCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLeToBtechChecked({ ...leToBtechChecked, [name]: checked });

    const btechCheckboxes = document.querySelectorAll(
      'input[name^="cse_1st_shift"], input[name^="it_1st_shift"], input[name^="ece_1st_shift"], input[name^="eee_1st_shift"], input[name^="cse_2nd_shift"], input[name^="it_2nd_shift"], input[name^="ece_2nd_shift"]'
    );

    if (checked) {
      btechCheckboxes.forEach((checkbox) => {
        checkbox.disabled = true;
      });
    } else {
      const allUnchecked = [...btechCheckboxes].every(
        (checkbox) => !checkbox.checked
      );
      if (allUnchecked) {
        btechCheckboxes.forEach((checkbox) => {
          checkbox.disabled = false;
        });
      }
    }
  };

  useEffect(() => {
    const generateApplicationNumber = () => {
      const timeStamp = new Date().getTime();
      const randomNumber = Math.floor(100000 + Math.random() * 900000);

      const applicationNumber = `${timeStamp}${randomNumber}`;

      return applicationNumber;
    };

    setApplicationNumber(generateApplicationNumber());
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Applicaiton Number:", applicationNumber);
    console.log("Programme Data:", programmeData);
    console.log("Candidate Data:", candidateData);
    console.log("Documents Data:", documentsData);
    console.log("Payment Data:", paymentData);
    console.log("Declaration Data:", declarationData);

    try {
      const data = {
        // passportPhoto,
        ...programmeData,
        ...candidateData,
        ...documentsData,
        ...paymentData,
        ...declarationData,
        applicationNumber: applicationNumber,
      };

      console.log("Combined Data: ", data);
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create record");
      } else {
        console.log("Record created successfully");
        setFormSubmitted(true);
      }
    } catch (err) {
      console.log("Error in creating record", err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      isProgrammeDetailsValid &&
      isCandidateDetailsValid &&
      isDocumentsValid &&
      isPaymentValid &&
      isDeclarationValid &&
      passportPhoto
    );
  };

  const handlePassportPhotoUpload = (e) => {
    const file = e.target.files[0];
    setPassportPhoto(file);
  };

  const handleRemovePhoto = () => {
    setPassportPhoto(null);
  };

  return (
    <main className="flex flex-col justify-center items-center w-full my-12 gap-6 relative">
      {!isFormSubmitted ? (
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
          <div className="w-2/3 flex flex-col items-start gap-4 text-md font-medium text-center mb-4 bg-purple-100 border-2 border-red-600 rounded-md px-6 py-4 pb-6 my-4">
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
          </div>
          <form
            method="POST"
            onSubmit={(e) => handleFormSubmit(e)}
            className="py-10 px-4 rounded-xl w-2/3 bg-indigo-100 flex flex-col items-center justify-center gap-6"
          >
            <ProgrammeDetails
              setProgrammeDetailsValid={setProgrammeDetailsValid}
              id="programme_details"
              handleProgrammeData={handleProgrammeData}
            />

            <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

            <CandidateDetails
              handleCandidateData={handleCandidateData}
              setCandidateDetailsValid={setCandidateDetailsValid}
              id="candidate_details"
            />

            <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

            <Documents
              setDocumentsValid={setDocumentsValid}
              id="documents"
              handleDocumentsData={handleDocumentsData}
            />

            <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

            <Payment
              setPaymentValid={setPaymentValid}
              id="payment"
              handlePaymentData={handlePaymentData}
            />

            <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

            <Declaration
              setDeclarationValid={setDeclarationValid}
              id="declaration"
              handleDeclarationData={handleDeclarationData}
            />

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

            {/* Submit Button */}
            <button
              type="submit"
              className={` text-white py-2 px-6 rounded-lg font-medium text-md bg-indigo-900 hover:bg-indigo-700 active:bg-indigo-900"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  Submitting
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
                "Submit"
              )}
            </button>
            {/* Form No */}
            <div className="border-2 border-indigo-900 flex items-center justify-between gap-2 absolute left-8 top-16 px-4 py-2 rounded-lg">
              <p className="text-md">{"Application No. "}</p>
              <span className="text-md font-bold underline underline-offset-2">
                {applicationNumber}
              </span>
            </div>
            {/* Passport size photograph upload */}
            <div className="w-36 h-48 border outline-double border-indigo-900 flex flex-col justify-between items-center gap-4 absolute right-8 top-16 cursor-pointer">
              {passportPhoto ? (
                <>
                  <div className="relative w-full h-full">
                    <img
                      src={URL.createObjectURL(passportPhoto)}
                      alt="Passport Photo"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 flex justify-center items-end m-2">
                      <button
                        className="bg-red-500 text-white rounded-md py-1 w-full font-semibold hover:bg-red-600 active:bg-red-500"
                        onClick={handleRemovePhoto}
                      >
                        {"Remove Photo"}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    name="photo_upload"
                    id="photo_upload"
                    className="absolute inset-0 opacity-0"
                    onChange={handlePassportPhotoUpload}
                    required
                  />
                  <span className="text-sm text-left w-full px-3 py-4">
                    {"Affix self-attested photograph"}
                  </span>
                  <label
                    htmlFor="photo_upload"
                    className="cursor-pointer z-10 bg-blue-500 text-white font-medium px-3 py-1 my-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    {"Upload Photo"}
                  </label>
                </>
              )}
            </div>
          </form>

          <p className="text-md font-medium mb-8">
            Already have an exisiting application on the portal? Login from{" "}
            <Link
              href={"/student.login.portal"}
              className="font-semibold text-green-700 hover:text-green-600 active:text-green-800 cursor-pointer"
            >
              here
            </Link>
          </p>
        </>
      ) : (
        <SubmittedForm applicationNumber={applicationNumber} />
      )}
    </main>
  );
}
