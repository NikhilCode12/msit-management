import React from "react";
import Link from "next/link";

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

export default SubmittedForm;
