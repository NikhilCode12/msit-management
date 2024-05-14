"use client";
import React, { useEffect, useState } from "react";

const Payment = ({ setPaymentValid, handlePaymentData }) => {
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
    handlePaymentData({});
  }, [paymentReceipt, handlePaymentData]);

  useEffect(() => {
    if (paymentReceipt) {
      console.log("Payment is valid now!");
      console.log(paymentReceipt);
      setPaymentReceiptError("");
      setPaymentValid(true);
    } else {
      setPaymentReceiptError("Please upload Payment Receipt/Proof.");
      console.log("Payment is invalid now!");
      setPaymentValid(false);
    }
  }, [paymentReceipt, setPaymentValid]);

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

export default Payment;
