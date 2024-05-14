"use client";
import React, { useState } from "react";

export default function CandidateDetails({
  setCandidateDetailsValid,
  handleCandidateData,
}) {
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
    }
    validateForm();
  };

  const handleRemoveFile = () => {
    setCategoryCertificate(null);
    validateForm();
  };

  const validateName = (name) => {
    return /^[A-Za-z]+$/.test(name);
  };

  const validateContact = (contact) => {
    return /^[0-9]{10}$/.test(contact);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateDOB = (dob) => {
    const currentDate = new Date();
    const inputDate = new Date(dob);
    return inputDate <= currentDate && inputDate.getFullYear() <= 2023;
  };

  const validateForm = () => {
    const requiredFieldsValid =
      validFields.first_name &&
      validFields.surname &&
      validFields.father_first_name &&
      validFields.mother_first_name &&
      validFields.legible_postal_address &&
      validFields.legible_contact &&
      validFields.legible_email &&
      validFields.dob;

    const optionalFieldsValid =
      !validFields.middle_name ||
      (validFields.middle_name &&
        validateName(validFields.middle_name) &&
        (!validFields.father_middle_name ||
          (validFields.father_middle_name &&
            validateName(validFields.father_middle_name))) &&
        (!validFields.mother_middle_name ||
          (validFields.mother_middle_name &&
            validateName(validFields.mother_middle_name))));

    const categoryValid = category !== "";
    const regionValid = region !== "";

    let categoryCertificateValid = true;
    if (category !== "General") {
      categoryCertificateValid = categoryCertificate !== null;
    }

    const valid =
      requiredFieldsValid &&
      optionalFieldsValid &&
      categoryValid &&
      regionValid &&
      categoryCertificateValid;

    setCandidateDetailsValid(valid);

    if (true) {
      console.log("Candidate Details Validated!");
      handleCandidateData({
        first_name: validFields.first_name,
        middle_name: validFields.middle_name,
        surname: validFields.surname,
        father_first_name: validFields.father_first_name,
        father_middle_name: validFields.father_middle_name,
        father_surname: validFields.father_surname,
        mother_first_name: validFields.mother_first_name,
        mother_middle_name: validFields.mother_middle_name,
        mother_surname: validFields.mother_surname,
        legible_postal_address: validFields.legible_postal_address,
        legible_contact: validFields.legible_contact,
        legible_email: validFields.legible_email,
        dob: validFields.dob,
        region: region,
        category: category,
        // categoryCertificate,
      });
    } else {
      console.log("Invalid!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;

    if (
      name === "first_name" ||
      name === "surname" ||
      name === "middle_name" ||
      name === "father_first_name" ||
      name === "father_middle_name" ||
      name === "father_surname" ||
      name === "mother_first_name" ||
      name === "mother_middle_name" ||
      name === "mother_surname"
    ) {
      isValid = validateName(value);
    } else if (name === "legible_postal_address") {
      isValid = value.trim() !== "";
    } else if (name === "legible_contact") {
      isValid = validateContact(value);
    } else if (name === "legible_email") {
      isValid = validateEmail(value);
    } else if (name === "dob") {
      isValid = validateDOB(value);
    }

    setValidFields({
      ...validFields,
      [name]: isValid ? value : null,
    });

    validateForm();
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
            checked={region === "OutsideDelhi"}
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
