"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";

function CandidateDetails() {
  const [categoryCertificate, setCategoryCertificate] = useState(null);
  const [validFields, setValidFields] = useState({
    first_name: "",
    middle_name: "",
    surname: "",
    father_first_name: "",
    father_middle_name: "",
    father_surname: "",
    mother_first_name: "",
    mother_middle_name: "",
    mother_surname: "",
    legible_postal_address: "",
    legible_contact: "",
    legible_email: "",
    dob: "",
  });

  const [categoryCertificateError, setCategoryCertificateError] = useState("");
  const [category, setCategory] = useState("General");
  const [region, setRegion] = useState("");

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory !== "General") {
      setCategoryCertificateError("Please upload Category Certificate");
    } else {
      setCategoryCertificateError("");
    }
    validateForm();
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    validateForm();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const selectedCategory = category;
    if (selectedCategory !== "General") {
      if (file && file.type === "application/pdf") {
        setCategoryCertificate(file);
        setCategoryCertificateError("");
      } else {
        if (!file) {
          setCategoryCertificateError(
            "Please upload a PDF file for the selected category!"
          );
        } else {
          setCategoryCertificateError(
            "Invalid file format for selected category. Please upload a PDF file!"
          );
        }
        setCategoryCertificate(null);
      }
    } else {
      setCategoryCertificateError("");
      setCategoryCertificate(null);
      validateForm();
    }
  };

  const handleRemoveFile = () => {
    setCategoryCertificate(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValidFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateForm();
  };

  const validateForm = () => {
    if (
      Object.values(validFields).every((field) => field !== "") &&
      category !== "" &&
      region !== ""
    ) {
      handleCandidateData({
        ...validFields,
        category,
        region,
        categoryCertificate:
          category !== "General" ? categoryCertificate : null,
      });
    }
  };

  return (
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
            placeholder="First Name"
            value={validFields.first_name}
            onChange={handleInputChange}
            required
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
          <input
            type="text"
            name="middle_name"
            id="middle_name"
            autoComplete="off"
            placeholder="Middle Name"
            value={validFields.middle_name}
            onChange={handleInputChange}
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
          <input
            type="text"
            name="surname"
            id="surname"
            autoComplete="off"
            placeholder="Surname"
            value={validFields.surname}
            onChange={handleInputChange}
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
            placeholder="First Name"
            value={validFields.father_first_name}
            onChange={handleInputChange}
            required
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
          <input
            type="text"
            name="father_middle_name"
            id="father_middle_name"
            autoComplete="off"
            placeholder="Middle Name"
            value={validFields.father_middle_name}
            onChange={handleInputChange}
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
          <input
            type="text"
            name="father_surname"
            id="father_surname"
            autoComplete="off"
            placeholder="Surname"
            value={validFields.father_surname}
            onChange={handleInputChange}
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
            placeholder="First Name"
            value={validFields.mother_first_name}
            onChange={handleInputChange}
            required
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
          <input
            type="text"
            name="mother_middle_name"
            id="mother_middle_name"
            autoComplete="off"
            placeholder="Middle Name"
            value={validFields.mother_middle_name}
            onChange={handleInputChange}
            className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
          />
          <input
            type="text"
            name="mother_surname"
            id="mother_surname"
            autoComplete="off"
            placeholder="Surname"
            value={validFields.mother_surname}
            onChange={handleInputChange}
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
          {
            "Write Legible Complete Postal Address mentioning State with Pin Code *"
          }
        </label>
        <div className="w-1/2 flex gap-6 items-center justify-center">
          <input
            type="text"
            name="legible_postal_address"
            id="legible_postal_address"
            autoComplete="off"
            value={validFields.legible_postal_address}
            onChange={handleInputChange}
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
          {"Write Legible Contact Number. *"}
        </label>
        <div className="w-1/2 flex gap-6 items-center justify-center">
          <input
            type="number"
            name="legible_contact"
            id="legible_contact"
            autoComplete="off"
            value={validFields.legible_contact}
            required
            onChange={handleInputChange}
            className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md"
          />
        </div>
      </div>
      {/* Legible Email I.D. */}
      <div className="w-full flex justify-center items-center">
        <label htmlFor="legible_email" className="text-md w-1/3 font-semibold">
          {"Write Legible Email I.D. *"}
        </label>
        <div className="w-1/2 flex gap-6 items-center justify-center">
          <input
            type="email"
            name="legible_email"
            id="legible_email"
            autoComplete="off"
            placeholder="example@mail.com"
            value={validFields.legible_email}
            onChange={handleInputChange}
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
            value={validFields.dob}
            onChange={handleInputChange}
            required
            className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md"
          />
        </div>
      </div>
      {/* Category Selection for Reservation */}
      <div className="w-full flex justify-center items-center">
        <label htmlFor="category" className="text-md w-1/3 font-semibold">
          {
            "Tick in the relevant Category for claiming the Reservation. (General Category will not be given reservation benefit.) *"
          }
        </label>
        <div className="w-1/2 flex gap-3 items-center justify-center">
          {/* 5 choices */}
          <input
            type="radio"
            name="category"
            id="SC"
            value="SC"
            checked={category === "SC"}
            onChange={handleCategoryChange}
          />
          <label htmlFor="SC" className="ml-2">
            SC
          </label>
          <input
            type="radio"
            name="category"
            id="ST"
            value="ST"
            checked={category === "ST"}
            onChange={handleCategoryChange}
          />
          <label htmlFor="ST" className="ml-2">
            ST
          </label>
          <input
            type="radio"
            name="category"
            id="Defence"
            value="Defence"
            checked={category === "Defence"}
            onChange={handleCategoryChange}
          />
          <label htmlFor="Defence" className="ml-2">
            Defence
          </label>
          <input
            type="radio"
            name="category"
            id="PWD"
            value="PWD"
            checked={category === "PWD"}
            onChange={handleCategoryChange}
          />
          <label htmlFor="PWD" className="ml-2">
            PWD
          </label>
          <input
            type="radio"
            name="category"
            id="General"
            value="General"
            checked={category === "General"}
            onChange={handleCategoryChange}
          />
          <label htmlFor="General" className="ml-2">
            General
          </label>
        </div>
      </div>
      {categoryCertificateError && (
        <p className="w-[85%] flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
          {categoryCertificateError}
        </p>
      )}

      {/* Category Certificate Attachment */}
      <div className="w-full flex justify-center items-center">
        <div className="w-[85%] flex gap-12 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
          <label
            htmlFor="category_certificate_upload"
            className="w-2/3 text-left text-md font-medium"
          >
            {
              "Please attach the Category Certificate (SC/ST/PWD/Entitlement Card (Defence)) along with the relevant Appendix format as per the GGSIPU Admission Brochure 2024-25 for claiming reservation."
            }{" "}
          </label>
          {categoryCertificate ? (
            <div className="flex items-center gap-2 ">
              <span className="bg-gray-100 rounded-md p-2">
                {categoryCertificate.name}
              </span>
              <button
                onClick={handleRemoveFile}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                name="category_certificate_upload"
                id="category_certificate_upload"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="category_certificate_upload"
                className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
              >
                {"Upload Certificate"}
              </label>
            </div>
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
            checked={region === "Delhi"}
            onChange={handleRegionChange}
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
            checked={region === "Outside Delhi"}
            onChange={handleRegionChange}
          />
          <label htmlFor="outside_delhi" className="ml-2">
            {"Outside Delhi Region"}
          </label>
        </div>
      </div>
    </div>
  );
}

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

const Documents = () => {
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
  }, [formValues, files]);

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

const Payment = () => {
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [paymentReceiptError, setPaymentReceiptError] = useState("");

  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.type.startsWith("image/"))
    ) {
      setPaymentReceipt(file);
    } else {
      alert("Please upload an image or a PDF file only!");
    }
  };

  useEffect(() => {
    if (paymentReceipt) {
      console.log(paymentReceipt);
      setPaymentReceiptError("");
    } else {
      setPaymentReceiptError("Please upload Payment Receipt/Proof.");
    }
  }, [paymentReceipt]);

  const handleRemoveReceipt = () => {
    setPaymentReceipt(null);
  };
  return (
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
          {paymentReceiptError && (
            <p className="w-full flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
              {paymentReceiptError}
            </p>
          )}
          <div className="w-full flex justify-center items-center mt-2">
            <div className="w-full flex gap-12 items-center justify-between bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
              <label
                htmlFor="payment_receipt_upload"
                className="w-[70%] text-left text-md font-medium"
              >
                {"Please upload the Payment Receipt(Proof). *"}{" "}
              </label>
              {paymentReceipt ? (
                <div className="flex items-center gap-2 ">
                  <span className="bg-gray-100 rounded-md p-2">
                    {paymentReceipt.name}
                  </span>
                  <button
                    onClick={handleRemoveReceipt}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="w-1/3 flex items-center justify-end">
                  <input
                    type="file"
                    name="payment_receipt_upload"
                    id="payment_receipt_upload"
                    onChange={handleReceiptUpload}
                    accept="image/*,.pdf"
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="payment_receipt_upload"
                    className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    {"Upload Receipt"}
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgrammeDetails = ({ formData, setFormData }) => {
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
  }, [registrationForm, admitCard]);

  const handleProgrammeSelect = useCallback((e) => {
    setProgrammeName(e.target.value);
  }, []);

  const handleStreamSelect = useCallback((e) => setStream(e.target.value), []);
  const handleShiftSelect = useCallback((e) => setShift(e.target.value), []);
  const handleApplicationNo = useCallback((e) => setAppNo(e.target.value), []);
  const handleRegistrationDate = useCallback(
    (e) => setRegDate(e.target.value),
    []
  );
  const handleRollNo = useCallback((e) => setRollNo(e.target.value), []);
  const handleRank = useCallback((e) => setRank(e.target.value), []);
  const handleRegistrationFormUpload = useCallback(
    (e) => setRegistrationForm(e.target.files[0]),
    []
  );
  const handleAdmitCardUpload = useCallback(
    (e) => setAdmitCard(e.target.files[0]),
    []
  );
  const handleRegistrationFormRemove = useCallback(
    () => setRegistrationForm(null),
    []
  );
  const handleAdmitCardRemove = useCallback(() => setAdmitCard(null), []);

  const programmeOptions = useMemo(
    () => [
      { value: "", label: "Select Programme" },
      { value: "B.Tech", label: "B.tech" },
      { value: "L.E B.Tech", label: "(L.E) B.tech" },
    ],
    []
  );

  const streamOptions = useMemo(
    () => [
      { value: "", label: "Select Stream" },
      { value: "CSE", label: "CSE" },
      { value: "IT", label: "IT" },
      { value: "ECE", label: "ECE" },
      { value: "EEE", label: "EEE" },
    ],
    []
  );

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      {/* Programme Name */}
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
          {programmeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
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
          onChange={handleStreamSelect}
          value={stream}
          required
        >
          {streamOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {/* Preferred Choice of shift */}
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
          value={appNo}
          onChange={handleApplicationNo}
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
          value={regDate}
          onChange={handleRegistrationDate}
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
          value={rollNo}
          onChange={handleRollNo}
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

const SubmittedForm = ({ applicationNumber }) => {
  return (
    <div className="w-1/2 h-full flex flex-col items-center justify-center my-10 border-2 border-indigo-900 rounded-lg px-12 py-12 gap-6">
      <h2 className="text-xl font-bold mb-4">
        Student registered successfully!
      </h2>
      <p className="text-lg mb-4">
        Your Application Number:{" "}
        <span className="font-bold">{applicationNumber}</span>
      </p>
      <Link
        className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 font-semibold rounded-md"
        href={"/"}
      >
        {"Go Home"}
      </Link>
    </div>
  );
};

export default function StudentRegisterPortal() {
  const [formData, setFormData] = useState({
    programmeDetails: {},
    candidateDetails: {},
    paymentDetails: {},
    documentDetails: {},
    declarationDetails: {},
  });

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
  const [isFormSubmitted, setFormSubmitted] = useState(false);

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

  const handlePassportPhotoUpload = (e) => {
    const file = e.target.files[0];
    setPassportPhoto(file);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted Successfully");
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
              id="programme_details"
              formData={formData.programmeDetails}
              setFormData={setFormData}
            />

            <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

            <CandidateDetails
              id="candidate_details"
              formData={formData.candidateDetails}
              // setFormData={setFormData}
            />

            <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

            <Documents
              id="documents"
              formData={formData.documentDetails}
              // setFormData={setFormData}
            />

            <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

            <Payment
              id="payment"
              formData={formData.paymentDetails}
              // setFormData={setFormData}
            />

            <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

            <Declaration
              id="declaration"
              formData={formData.declarationDetails}
              // setFormData={setFormData}
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
            <div className="hidden border-2 border-indigo-900 flex items-center justify-between gap-2 absolute left-8 top-16 px-4 py-2 rounded-lg">
              <p className="text-md">{"Application No. "}</p>
              <span className="text-md font-bold underline underline-offset-2">
                {/* {applicationNumber} */}
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
            Already have an existing application on the portal? Login from{" "}
            <Link
              href={"/student.login.portal"}
              className="font-semibold text-green-700 hover:text-green-600 active:text-green-800 cursor-pointer"
            >
              here
            </Link>
          </p>
        </>
      ) : (
        <SubmittedForm applicationNumber={1232} />
      )}
    </main>
  );
}
