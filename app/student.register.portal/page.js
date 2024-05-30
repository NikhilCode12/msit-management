"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import axios from "axios";
import HomeButton from "../components/HomeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import mongoose from "mongoose";

export default function StudentRegisterPortal() {
  const [passportPhoto, setPassportPhoto] = useState("");
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

  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);

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

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(formData);
    if (!appNo) {
      alert("GGSIPU APPLICATION NUMBER IS REQUIRED!");
    } else {
      try {
        const formData = {
          programmeName,
          stream,
          shift,
          appNo,
          regDate,
          rollNo,
          rank,
          ...validFields,
          category,
          region,
          ...formValues,
          registrationForm,
          admitCard,
          categoryCertificate,
          marksheet_10: files["10th_marksheet"],
          marksheet_12: files["12th_marksheet"],
          diploma_certificate: files.diploma_certificate,
          paymentReceipt,
          candidateSignature,
          parentSignature,
          applicationNumber: appNo,
          createdAt: currentDate,
          choices: {
            btechChecked,
            leToBtechChecked,
          },
          passportPhoto,
        };

        const request = await axios.post("/api/submit-form", formData);

        if (request.status === 200) {
          setLoading(false);
          setFormSubmitted(true);
        }
      } catch (err) {
        console.log("Error in submitting data", err);
      }
    }
  };
  const [programmeName, setProgrammeName] = useState("");
  const [stream, setStream] = useState("");
  const [shift, setShift] = useState("");
  const [appNo, setAppNo] = useState("");
  const [regDate, setRegDate] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [rank, setRank] = useState("");
  const [registrationForm, setRegistrationForm] = useState("");
  const [admitCard, setAdmitCard] = useState("");
  const [registrationFormError, setRegistrationFormError] = useState("");
  const [admitCardError, setAdmitCardError] = useState("");
  const [categoryCertificate, setCategoryCertificate] = useState("");
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
  const [paymentReceipt, setPaymentReceipt] = useState("");
  const [paymentReceiptError, setPaymentReceiptError] = useState("");

  useEffect(() => {
    if (!registrationForm) {
      setRegistrationFormError(
        "Please upload GGSIPU Registration Form Google Drive Link (Anyone with the link)."
      );
    } else {
      setRegistrationFormError("");
    }

    if (!admitCard) {
      setAdmitCardError(
        "Please upload Admit Card Google Drive Link (Anyone with the link)."
      );
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
  const handleRegistrationForm = useCallback(
    (e) => setRegistrationForm(e.target.value),
    []
  );
  const handleAdmitCard = useCallback((e) => setAdmitCard(e.target.value), []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory !== "General") {
      setCategoryCertificateError(
        "Please upload Category Certificate Google Drive Link (Anyone with the link)"
      );
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
    const file = e.target.value;
    const selectedCategory = category;
    if (selectedCategory !== "General") {
      if (file == "") {
        setCategoryCertificate(file);
        setCategoryCertificateError(
          "Please upload Category Certificate Google Drive Link (Anyone with the link) for the selected category."
        );
      } else {
        setCategoryCertificate(file);
        setCategoryCertificateError("");
      }
    } else {
      setCategoryCertificate(file);
      setCategoryCertificateError("");
    }
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

  const handleReceipt = useCallback(
    (e) => setPaymentReceipt(e.target.value),
    []
  );

  useEffect(() => {
    if (paymentReceipt) {
      setPaymentReceiptError("");
    } else {
      setPaymentReceiptError(
        "Please upload Payment Receipt/Proof Google Drive Link (Anyone with the link)."
      );
    }
  }, [paymentReceipt]);

  const [currentDate, setCurrentDate] = useState("");
  const [candidateSignature, setCandidateSignature] = useState("");
  const [parentSignature, setParentSignature] = useState("");
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

      let hours = today.getHours();
      const minutes = String(today.getMinutes()).padStart(2, "0");
      const am_pm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const strTime = `${hours}:${minutes} ${am_pm}`;

      return `${dd}/${mm}/${yyyy} ${strTime}`;
    };

    setCurrentDate(getCurrentDate());
  }, []);

  // handling the errors
  useEffect(() => {
    const errors = {};

    if (!candidateSignature) {
      errors.candidate =
        "Please upload Candidate's signature Google Drive Link (Anyone with the link).";
    }

    if (!parentSignature) {
      errors.parent =
        "Please upload Parent's signature Google Drive Link (Anyone with the link).";
    }

    setSignatureErrors(errors);
  }, [candidateSignature, parentSignature]);

  const handleParentSignature = useCallback(
    (e) => setParentSignature(e.target.value),
    []
  );

  const handleCandidateSignature = useCallback(
    (e) => setCandidateSignature(e.target.value),
    []
  );

  const [files, setFiles] = useState({
    "10th_marksheet": "",
    "12th_marksheet": "",
    diploma_certificate: "",
  });

  const [marksheet_error_10, setMarksheetError_10] = useState("");
  const [marksheet_error_12, setMarksheetError_12] = useState("");
  const [diploma_certificate_error, setDiplomaCertificateError] = useState("");

  const handleFileUpload = (e, key) => {
    const value = e.target.value;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [key]: value,
    }));
  };

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
    t_m_total: "",
    m_o_total: "",
    p_total: "",
    pcm_marks: "",
    pcm_percentage: "",
  });

  useEffect(() => {
    if (!files["10th_marksheet"])
      setMarksheetError_10(
        "Please upload 10th Marksheet and Passing Certificate \n Google Drive Link (Anyone with the link)."
      );
    else setMarksheetError_10("");

    if (!files["12th_marksheet"])
      setMarksheetError_12(
        "Please upload 12th Marksheet and Passing Certificate \n Google Drive Link (Anyone with the link)."
      );
    else setMarksheetError_12("");

    if (!files["diploma_certificate"] && formValues.university !== "")
      setDiplomaCertificateError(
        "Please upload Diploma Marksheet and Passing Certificate \n Google Drive Link (Anyone with the link)."
      );
    else setDiplomaCertificateError("");
  }, [formValues, files]);

  const handleFileInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const lower = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  const handleDownloadPDF = async (e) => {
    const capture = document.querySelector(".register-form");
    setIsDownloadLoading(true);

    html2canvas(capture, { scale: 2 }).then((canvas) => {
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

      const filename = `${lower(validFields?.first_name)}_${lower(
        validFields?.surname
      )}_registration_form_management_quota.pdf`;
      pdf.save(filename);
    });

    setPdfDownloaded(true);
  };

  return (
    <main className=" flex flex-col justify-center items-center w-full my-8 gap-6 min-h-full relative">
      {!isFormSubmitted ? (
        <>
          {/* Home button */}
          <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600 absolute top-0 left-10 text-white px-4 py-2 font-semibold rounded-md flex items-center justify-center"
          >
            <HomeButton className="text-white" />
          </Link>
          {/* Notice */}
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-2/3 text-lg italic font-medium text-left mb-4 bg-white border-4 border-red-600 rounded-md mt-12 p-4">
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                size={"lg"}
                className="mr-2 text-red-600 drop-shadow"
              />
              <span className="font-bold text-lg">{"Important Notice:"}</span>{" "}
              {
                "Students registering on the portal must first upload their documents to Google Drive. Please ensure that the sharing settings are set to 'Anyone with the link' before adding the link to the registration form. Failure to do so may result in the cancellation of your registration."
              }
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full gap-6 register-form h-full relative">
            {/* Login Form Student */}
            <div className="absolute top-4 left-8 border-2 border-black rounded-md px-4 py-2 w-[260px] flex gap-2">
              <span className="text-gray-600 font-medium">
                {"Application No.: "}
              </span>
              <p className="text-black font-bold">
                {appNo ? appNo : "Generating..."}
              </p>
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mt-24">
              Management Quota Application Form{" (2024-2025)"}
            </h2>
            <div className="flex items-center justify-center text-center w-2/3 underline underline-offset-2 bg-purple-200 px-6 py-4 font-medium text-md border-2 border-indigo-900 rounded-lg mt-8">
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
                  <label
                    htmlFor="stream"
                    className="text-md w-1/3 font-semibold"
                  >
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
                    htmlFor="registration_date"
                    className="text-md w-1/3 font-semibold"
                  >
                    {"Registration Date *"}
                  </label>
                  <input
                    type="date"
                    name="registration_date"
                    id="registration_date"
                    autoComplete="off"
                    value={regDate}
                    onChange={handleRegistrationDate}
                    className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-md"
                    required
                  />
                </div>
                {/* Roll NO CET/JEE LE */}
                <div className="w-full flex justify-center items-center">
                  <label
                    htmlFor="jee_cet_rollno"
                    className="text-md w-1/3 font-semibold"
                  >
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
                  <label
                    htmlFor="jee_cet_rank"
                    className="text-md w-1/3 font-semibold"
                  >
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
                  <div className="w-[85%] flex flex-col gap-4 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                    <label
                      htmlFor="ggsipu_registration_form_upload"
                      className="w-2/3 text-left text-md font-medium"
                    >
                      {
                        "Please attach Duly Submitted Filled Up Online Registration Form of GGSIPU in the portal for relevant programmes. *"
                      }{" "}
                    </label>
                    <input
                      type="text"
                      name="ggsipu_registration_form_upload"
                      id="ggsipu_registration_form_upload"
                      value={registrationForm}
                      onChange={handleRegistrationForm}
                      autoComplete="off"
                      placeholder="Enter Google Drive Link (Please select: Anyone with the link - Shareable)"
                      className="py-1 px-3 w-[85%] border-2 rounded-md border-gray-400 outline-none text-md"
                      required
                    />
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
                  <div className="w-[85%] flex flex-col gap-4 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                    <label
                      htmlFor="admit_card_upload"
                      className="w-2/3 text-left text-md font-medium"
                    >
                      {"Please attach Admit Card and Rank Proof. *"}{" "}
                    </label>
                    <input
                      type="text"
                      name="admit_card_upload"
                      id="admit_card_upload"
                      onChange={handleAdmitCard}
                      value={admitCard}
                      autoComplete="off"
                      placeholder="Enter Google Drive Link (Please select: Anyone with the link - Shareable)"
                      className="py-1 px-3 w-[85%] border-2 rounded-md border-gray-400 outline-none text-md"
                      required
                    />
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
                  <label
                    htmlFor="legible_email"
                    className="text-md w-1/3 font-semibold"
                  >
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
                  <label
                    htmlFor="category"
                    className="text-md w-1/3 font-semibold"
                  >
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
                  <div className="w-[85%] flex flex-col gap-4 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                    <label
                      htmlFor="category_certificate_upload"
                      className="w-2/3 text-left text-md font-medium"
                    >
                      {
                        "Please attach the Category Certificate (SC/ST/PWD/Entitlement Card (Defence)) along with the relevant Appendix format as per the GGSIPU Admission Brochure 2024-25 for claiming reservation."
                      }{" "}
                    </label>
                    <input
                      type="text"
                      name="category_certificate_upload"
                      id="category_certificate_upload"
                      onChange={handleFileChange}
                      value={categoryCertificate}
                      autoComplete="off"
                      placeholder="Enter Google Drive Link (Please select: Anyone with the link - Shareable)"
                      className="py-1 px-3 w-[85%] border-2 rounded-md border-gray-400 outline-none text-md"
                      disabled={category === "General"}
                    />
                  </div>
                </div>
                {/* Delhi/Outside Delhi Region */}
                <div className="w-full flex justify-center items-center">
                  <label
                    htmlFor="region"
                    className="text-md w-1/3 font-semibold"
                  >
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

              <div className="w-[90%] border border-indigo-400 my-2 rounded-full border-dotted" />

              {/* Document Component */}
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
                      <label
                        htmlFor="board"
                        className="text-md w-1/3 font-semibold"
                      >
                        {"Board *"}
                      </label>
                      <input
                        type="text"
                        name="board"
                        id="board"
                        value={formValues.board}
                        onChange={handleFileInputChange}
                        autoComplete="off"
                        required
                        className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                      />
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
                        value={formValues.roll_no}
                        onChange={handleFileInputChange}
                        autoComplete="off"
                        required
                        className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                      />
                    </div>
                  </div>
                  {/* year */}
                  <div className="w-[73%] flex justify-left items-center">
                    <div className="w-1/3 flex justify-between items-center">
                      <label
                        htmlFor="year"
                        className="text-md w-1/3 font-semibold mr-10"
                      >
                        {"Year *"}
                      </label>
                      <input
                        type="number"
                        name="year"
                        id="year"
                        autoComplete="off"
                        maxLength={4}
                        value={formValues.year}
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                    <div className="w-[90%] flex flex-col gap-4 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                      <label
                        htmlFor="10th_marksheet_upload"
                        className="w-2/3 text-left text-md font-medium"
                      >
                        {
                          "Please attach 10th Marksheet & Passing Certificate Google Drive Link (Anyone with the link) *"
                        }{" "}
                      </label>
                      <input
                        type="text"
                        name="10th_marksheet_upload"
                        id="10th_marksheet_upload"
                        value={files["10th_marksheet"]}
                        onChange={(e) => handleFileUpload(e, "10th_marksheet")}
                        autoComplete="off"
                        placeholder="Enter Google Drive Link (Please select: Anyone with the link - Shareable)"
                        className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md"
                        required
                      />
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
                      <input
                        type="text"
                        name="board_12"
                        id="board_12"
                        autoComplete="off"
                        value={formValues.board_12}
                        onChange={handleFileInputChange}
                        required
                        className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                      />
                    </div>
                    <div className="w-1/3 flex justify-between items-center">
                      <label
                        htmlFor="roll_no_12"
                        className="text-md w-1/3 font-semibold"
                      >
                        {"Roll No. *"}
                      </label>
                      <input
                        type="number"
                        name="roll_no_12"
                        id="roll_no_12"
                        autoComplete="off"
                        value={formValues.roll_no_12}
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
                        required
                        className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                      />
                    </div>
                  </div>
                  {/* PCM: Total marks and Percentage*/}
                  <div className="w-full flex flex-col justify-center gap-4 items-center">
                    <div className="w-2/3 flex justify-between items-center">
                      <label
                        htmlFor="pcm_marks"
                        className="text-md w-2/3 font-semibold "
                      >
                        {"Total Marks in PCM *"}
                      </label>
                      <input
                        type="number"
                        name="pcm_marks"
                        id="pcm_marks"
                        autoComplete="off"
                        value={formValues.pcm_marks}
                        onChange={(e) => handleFileInputChange(e)}
                        required
                        className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                      />
                    </div>
                    <div className="w-2/3 flex justify-between items-center">
                      <label
                        htmlFor="pcm_percentage"
                        className="text-md w-2/3 font-semibold mr-2"
                      >
                        {"Percentage in PCM *"}
                      </label>
                      <input
                        type="number"
                        name="pcm_percentage"
                        id="pcm_percentage"
                        autoComplete="off"
                        value={formValues.pcm_percentage}
                        onChange={(e) => handleFileInputChange(e)}
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
                    <div className="w-[90%] flex flex-col gap-4 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                      <label
                        htmlFor="12th_marksheet_upload"
                        className="w-2/3 text-left text-md font-medium"
                      >
                        {"Please attach 12th Marksheet & Passing Certificate."}{" "}
                      </label>
                      <input
                        type="text"
                        name="12th_marksheet_upload"
                        id="12th_marksheet_upload"
                        value={files["12th_marksheet"]}
                        onChange={(e) => handleFileUpload(e, "12th_marksheet")}
                        autoComplete="off"
                        placeholder="Enter Google Drive Link (Please select: Anyone with the link - Shareable)"
                        className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md"
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Diploma Students Lateral Entry B.tech */}
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
                      <input
                        type="text"
                        name="university"
                        id="university"
                        autoComplete="off"
                        value={formValues.university}
                        onChange={handleFileInputChange}
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
                        onChange={handleFileInputChange}
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
                      onChange={handleFileInputChange}
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
                      onChange={handleFileInputChange}
                      className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                    />
                    <input
                      type="number"
                      name="m_o_1"
                      id="m_o_1"
                      autoComplete="off"
                      placeholder="Marks Obtained"
                      value={formValues.m_o_1}
                      onChange={handleFileInputChange}
                      className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                    />
                    <input
                      type="number"
                      name="p_1"
                      id="p_1"
                      autoComplete="off"
                      placeholder="Percentage (%)"
                      value={formValues.p_1}
                      onChange={handleFileInputChange}
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
                      onChange={handleFileInputChange}
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
                      onChange={handleFileInputChange}
                      className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                    />
                    <input
                      type="number"
                      name="m_o_2"
                      id="m_o_2"
                      autoComplete="off"
                      placeholder="Marks Obtained"
                      value={formValues.m_o_2}
                      onChange={handleFileInputChange}
                      className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                    />
                    <input
                      type="number"
                      name="p_2"
                      id="p_2"
                      autoComplete="off"
                      placeholder="Percentage (%)"
                      value={formValues.p_2}
                      onChange={handleFileInputChange}
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
                      onChange={handleFileInputChange}
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
                      onChange={handleFileInputChange}
                      className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                    />
                    <input
                      type="number"
                      name="m_o_3"
                      id="m_o_3"
                      autoComplete="off"
                      placeholder="Marks Obtained"
                      value={formValues.m_o_3}
                      onChange={handleFileInputChange}
                      className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                    />
                    <input
                      type="number"
                      name="p_3"
                      id="p_3"
                      autoComplete="off"
                      placeholder="Percentage (%)"
                      value={formValues.p_3}
                      onChange={handleFileInputChange}
                      className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                    />
                  </div>

                  {/* Aggregate */}
                  <h2 className="text-md font-medium my-2 underline underline-offset-2">
                    {"Aggregate"}
                  </h2>
                  <div className="w-[75%] flex justify-center gap-6 items-center">
                    {/* Total Marks, Marks Obtained and Percentage Aggregate */}
                    <input
                      type="number"
                      name="t_m_total"
                      id="t_m_total"
                      autoComplete="off"
                      placeholder="Total Marks"
                      value={formValues.t_m_total}
                      onChange={handleFileInputChange}
                      className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                    />
                    <input
                      type="number"
                      name="m_o_total"
                      id="m_o_total"
                      autoComplete="off"
                      placeholder="Marks Obtained"
                      value={formValues.m_o_total}
                      onChange={handleFileInputChange}
                      className="py-1 px-3 w-2/3 border-2 rounded-md border-gray-400 outline-none text-md"
                    />
                    <input
                      type="number"
                      name="p_total"
                      id="p_total"
                      autoComplete="off"
                      placeholder="Percentage (%)"
                      value={formValues.p_total}
                      onChange={handleFileInputChange}
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
                    <div className="w-[90%] flex flex-col gap-4 items-center justify-center bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                      <label
                        htmlFor="diploma_certificate"
                        className="w-2/3 text-left text-md font-medium"
                      >
                        {
                          "Please attach Diploma Marksheet of all semester examinations & Passing Certificate(for Lateral Entry).*"
                        }{" "}
                      </label>
                      <input
                        type="text"
                        name="diploma_certificate"
                        id="diploma_certificate"
                        value={files.diploma_certificate}
                        onChange={(e) =>
                          handleFileUpload(e, "diploma_certificate")
                        }
                        autoComplete="off"
                        placeholder="Enter Google Drive Link (Please select: Anyone with the link - Shareable)"
                        className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md"
                        disabled={formValues.university !== "" ? false : true}
                      />
                    </div>
                  </div>
                </div>
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
                      <span className="font-bold mr-2">
                        {"Name Of Institute:"}
                      </span>
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
                    {/* Payment Receipt Error */}
                    {paymentReceiptError && (
                      <p className="w-full flex justify-center items-center text-center border border-black font-medium text-red-600 bg-white py-1 rounded-lg">
                        {paymentReceiptError}
                      </p>
                    )}
                    <div className="w-full flex justify-center items-center mt-2">
                      <div className="w-full flex flex-col gap-4 items-center justify-between bg-purple-200 border-2 border-indigo-800 rounded-sm px-4 py-4">
                        <label
                          htmlFor="payment_receipt_upload"
                          className="w-full text-left text-md font-medium"
                        >
                          {"Please upload the Payment Receipt(Proof). *"}{" "}
                        </label>
                        <input
                          type="text"
                          name="payment_receipt_upload"
                          id="payment_receipt_upload"
                          onChange={handleReceipt}
                          autoComplete="off"
                          placeholder="Enter Google Drive Link (Please select: Anyone with the link - Shareable)"
                          className="py-1 px-3 w-full border-2 rounded-md border-gray-400 outline-none text-md"
                          required
                        />
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
                        <input
                          type="text"
                          name="candidate_sign"
                          id="candidate_sign"
                          autoComplete="off"
                          placeholder="Google Drive Link"
                          value={candidateSignature}
                          className="py-1 px-3 w-1/2 border-2 rounded-md border-gray-400 outline-none"
                          required
                          onChange={handleCandidateSignature}
                        />
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
                        <>
                          <input
                            type="text"
                            name="parent_sign"
                            id="parent_sign"
                            autoComplete="off"
                            value={parentSignature}
                            placeholder="Google Drive Link"
                            className="py-1 px-3 w-1/2 border-2 rounded-md border-gray-400 outline-none"
                            required
                            onChange={handleParentSignature}
                          />
                        </>
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

              {/* PDF Notice */}
              <p className="text-md font-medium">
                {
                  "* Generate pdf after filling all the details. The submit button will be enabled when the pdf is downloaded."
                }
                {/* <Link
                href={"https://www.msit.in"}
                target="_blank"
                className=" text-green-600 hover:text-green-700 active:text-green-600"
              >
                {"www.msit.in"}
              </Link>{" "} */}
                {/* {" or visit "}{" "} */}
                {/* <Link
                href={"https://www.ipu.ac.in"}
                target="_blank"
                className=" text-green-600 hover:text-green-700 active:text-green-600"
              >
                {"www.ipu.ac.in"}
              </Link> */}
              </p>

              {/* Download as PDF */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={(e) => handleDownloadPDF(e)}
                  className={` text-white py-2 px-6 rounded-lg font-medium text-md bg-indigo-900 hover:bg-indigo-700 active:bg-indigo-900 ${
                    isDownloadLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
              }`}
                >
                  {isDownloadLoading ? (
                    <div className="flex items-center">
                      {"Downloading"}
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
                    "Generate PDF for proof"
                  )}
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={` text-white py-2 px-6 rounded-lg font-medium text-md bg-indigo-900 hover:bg-indigo-700 active:bg-indigo-900 " ${
                    isLoading ? "opacity-50" : "cursor-pointer"
                  } ${
                    pdfDownloaded
                      ? "cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }
              }`}
                  disabled={!pdfDownloaded}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      {"Submitting"}
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
              </div>
              {/* Passport size photograph upload */}
              <div className="w-36 h-48 border outline-double border-indigo-900 flex flex-col justify-between items-center gap-4 absolute right-8 top-24 cursor-pointer">
                <input
                  type="text"
                  name="photo_upload"
                  id="photo_upload"
                  className="text-sm absolute bottom-2 py-1 px-3 w-[80%] border-2 rounded-md border-gray-400 outline-none"
                  autoComplete="off"
                  placeholder="Drive Link"
                  onChange={(e) => {
                    setPassportPhoto(e.target.value);
                  }}
                  value={passportPhoto}
                  required
                />
                <span className="text-sm text-left w-full px-3 py-4">
                  {
                    "Affix self-attested photograph Google Drive Link (Anyone with the link)"
                  }
                </span>
              </div>
            </form>
          </div>
        </>
      ) : (
        // Submitted Form Component
        <div className="w-1/2 h-full flex flex-col items-center justify-center my-10 border-2 border-indigo-900 rounded-lg px-12 py-12 gap-6">
          <h2 className="text-xl font-bold mb-4">
            Student registered successfully!
          </h2>
          <p className="text-lg mb-4">
            Your Application Number: <span className="font-bold">{appNo}</span>
          </p>
          <Link
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 font-semibold rounded-md"
            href={"/"}
          >
            {"Go Home"}
          </Link>
        </div>
      )}
    </main>
  );
}
