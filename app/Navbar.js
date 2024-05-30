"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-col py-8 w-full no-print">
      {/* Logo */}
      <Link className="flex items-center justify-center" href={"/"}>
        <Image
          src={"/msit.png"}
          width={90}
          height={90}
          alt="msit_logo"
          className="mr-12 cursor-pointer"
        />
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-[2rem] font-bold text-indigo-800">
            Maharaja Surajmal Institute of Technology
          </h1>
          <p className="text-center text-sm text-red-400">
            {
              "Affiliated to GGSIPU | NAAC Accredited 'A' Grade | NBA (CSE, IT,ECE,EEE) | Approved by AICTE | ISO 9001:2015 Certified"
            }
          </p>
        </div>
      </Link>
      {/* Marquee Info Bulletin*/}
      <div className="bg-slate-100 my-6 flex items-center justify-center">
        <marquee>
          <ul className="py-2 text-[0.96rem] font-light text-green-700 list-disc flex gap-36">
            <li>
              <a
                className="hover:text-green-900 active:text-green-950"
                href="https://www.linkedin.com/school/maharaja-surajmal-institute-of-technology-msitnewdelhi/"
                target="_blank"
              >
                {
                  "Follow us @msitnewdelhi on Facebook, LinkedIn and Twitter for updates."
                }
              </a>
            </li>
            <li>
              <a
                className="hover:text-green-900 active:text-green-950"
                href="https://forms.gle/P4ptdMMX8re4BQ1r6"
                target="_blank"
              >
                {
                  "Feedback form for Bugs, Issues and Feedbacks regarding the Portal."
                }
              </a>
            </li>
            <li>
              <a
                className="hover:text-green-900 active:text-green-950"
                href="https://github.com/NikhilCode12"
                target="_blank"
              >
                <span className="font-semibold"> {"Important Notice: "}</span>{" "}
                {
                  "Students registering on the portal must first upload their documents to Google Drive. Please ensure that the sharing settings are set to 'Anyone with the link' before adding the link to the registration form. Failure to do so may result in the cancellation of your registration."
                }
              </a>
            </li>
          </ul>
        </marquee>
      </div>
    </div>
  );
};

export default Navbar;
