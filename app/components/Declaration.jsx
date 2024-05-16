"use client";
import React, { useState, useEffect } from "react";

const Declaration = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [candidateSignature, setCandidateSignature] = useState(null);
  const [parentSignature, setParentSignature] = useState(null);
  const [showCandidateCross, setShowCandidateCross] = useState(false);
  const [showParentCross, setShowParentCross] = useState(false);
  const [signatureErrors, setSignatureErrors] = useState({
    candidate: "",
    parent: "",
  });

  // Current Data
  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };

    setCurrentDate(getCurrentDate());
  }, []);

  // handling the errors
  useEffect(() => {
    const errors = {};

    if (!candidateSignature) {
      errors.candidate = "Please upload Candidate's signature.";
    }

    if (!parentSignature) {
      errors.parent = "Please upload Parent's signature.";
    }

    setSignatureErrors(errors);
  }, [candidateSignature, parentSignature]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "candidate") {
          setCandidateSignature(reader.result);
          setShowCandidateCross(true);
        } else if (type === "parent") {
          setParentSignature(reader.result);
          setShowParentCross(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (type) => {
    if (type === "candidate") {
      setCandidateSignature(null);
      setShowCandidateCross(false);
    } else if (type === "parent") {
      setParentSignature(null);
      setShowParentCross(false);
    }
  };

  return (
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
          {signatureErrors.candidate && (
            <p className="w-full flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
              {signatureErrors.candidate}
            </p>
          )}
          <div className="w-full justify-between flex items-center">
            <div className="">
              <label htmlFor="date">{"Date: "}</label>
              <input
                type="text"
                name="date"
                id="date"
                value={currentDate}
                readOnly
                className="outline-none bg-inherit border-none"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="candidate_sign" className="mr-4">
                {"Signature of the Candidate: "}
              </label>
              {candidateSignature ? (
                <div className="relative">
                  <img
                    src={candidateSignature}
                    alt="Candidate Signature"
                    className="w-40 h-10 border border-black"
                  />
                  {showCandidateCross && (
                    <button
                      onClick={() => handleRemoveImage("candidate")}
                      className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      &#x2715;
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    name="candidate_sign"
                    id="candidate_sign"
                    accept="image/*"
                    className="hidden"
                    required
                    onChange={(e) => handleFileChange(e, "candidate")}
                  />
                  <label
                    htmlFor="candidate_sign"
                    className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    {"Upload Signature"}
                  </label>
                </>
              )}
            </div>
          </div>
          <p className="text-md font-medium text-justify my-2">
            {
              "I have carefully read and verified the information furnished by my son/daughter/ward and affirm that it is true and correct and he/she fulfills the eligibility conditions as mentioned in the Admission Bulletin/Rules of GGSIPU."
            }
          </p>

          {signatureErrors.parent && (
            <p className="w-full flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
              {signatureErrors.parent}
            </p>
          )}
          <div className="w-full justify-between flex items-center">
            <div className="">
              <label htmlFor="date_2">{"Date: "}</label>
              <input
                type="text"
                name="date_2"
                id="date_2"
                value={currentDate}
                readOnly
                className="outline-none bg-inherit border-none"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="parent_sign" className="mr-4">
                {"Signature of Father/Mother: "}
              </label>
              {parentSignature ? (
                <div className="relative">
                  <img
                    src={parentSignature}
                    alt="Parent Signature"
                    className="w-40 h-10 border-black"
                  />
                  {showParentCross && (
                    <button
                      onClick={() => handleRemoveImage("parent")}
                      className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      &#x2715;
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    name="parent_sign"
                    id="parent_sign"
                    accept="image/*"
                    className="hidden"
                    required
                    onChange={(e) => handleFileChange(e, "parent")}
                  />
                  <label
                    htmlFor="parent_sign"
                    className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    {"Upload Signature"}
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Declaration;
