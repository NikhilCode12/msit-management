"use client";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";

export default function StudentLoginPortal() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <main className="flex flex-col items-center w-full my-8 gap-6">
      {/* Login Form Student */}
      <h2 className="text-3xl font-bold text-indigo-900">Student Login</h2>
      <form className="py-12 px-4 rounded-xl w-1/2 bg-blue-100 flex flex-col items-center justify-center gap-6">
        <div className="w-full flex justify-center items-center">
          <label className="text-lg font-semibold w-1/4">Application No.</label>
          <input
            ref={inputRef}
            type="text"
            name="formId"
            autoComplete="off"
            maxLength={8}
            className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-lg "
            required
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <label className="text-lg w-1/4 font-semibold">Password</label>
          <input
            type="password"
            name="formId"
            maxLength={16}
            autoComplete="off"
            className="py-1 px-3 w-1/3 border-2 rounded-md border-gray-400 outline-none text-lg "
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-900 px-20 text-white font-medium py-3 rounded-lg my-2 hover:bg-indigo-800 active:bg-indigo-950"
        >
          Login
        </button>
        <p className="text-md font-medium ">
          Not applied before on the portal? Apply from{" "}
          <Link
            href={"/student.register.portal"}
            className="font-semibold text-green-700 hover:text-green-600 active:text-green-800 cursor-pointer"
          >
            here
          </Link>
        </p>
      </form>
    </main>
  );
}
