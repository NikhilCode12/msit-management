"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faTimes } from "@fortawesome/free-solid-svg-icons";

const StudentListModal = ({ onSelect, onClose }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/students", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      const result = await response.json();
      console.log("API Response:", result);
      if (response.ok) {
        setData(result);
      } else {
        setError(result.message || "Failed to fetch student data");
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
      setError("Internal Server Error");
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelect = (applicationNumber) => {
    onSelect(applicationNumber);
  };

  const handleClose = () => {
    onClose();
  };

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="w-3/4 bg-white rounded-lg shadow-lg relative">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">
              Registered Students List
            </h2>
            <button
              className="bg-gray-600 hover:bg-gray-700 active:bg-gray-600 text-white px-4 py-2 font-semibold rounded-md absolute top-5 right-16 text-xs"
              onClick={fetchData}
            >
              Refresh
              <FontAwesomeIcon icon={faRefresh} className="ml-2" />
            </button>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-800 focus:outline-none absolute top-6 right-6"
            >
              <FontAwesomeIcon icon={faTimes} size="xl" />
            </button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="dot-loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg font-semibold text-red-600 bg-slate-200 p-2">
                {error}
              </p>
            </div>
          ) : data && data.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">
                    Application Number
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">
                    Candidate Full Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">
                    Option
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((student) => (
                  <tr key={student.applicationNumber}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {student.applicationNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {capitalize(student.first_name)}{" "}
                      {capitalize(student.middle_name)}{" "}
                      {capitalize(student.surname)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <button
                        className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600 text-white px-4 py-2 font-semibold rounded-md"
                        onClick={() => handleSelect(student.applicationNumber)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg font-semibold">No student records found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentListModal;
