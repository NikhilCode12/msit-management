import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full gap-6 h-full">
      {/* Login/Register Portals */}
      <h1 className="text-3xl font-bold text-indigo-800 w-full text-center my-4">
        Management Quota Admission Portal
      </h1>
      {/* Student Login/Register Portal */}
      <div className="flex justify-center items-center w-full gap-12">
        <Link
          href="/student.register.portal"
          className=" bg-blue-500 p-8 rounded-xl w-1/3 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-400 active:bg-blue-600"
        >
          <Image
            width={150}
            height={150}
            src={"/student.png"}
            alt="student_portal"
          />
          <h2 className="text-white text-xl font-medium mt-4">
            Student Registration Portal
          </h2>
        </Link>
        <h1 className="text-2xl font-bold text-indigo-800">OR</h1>
        {/* Faculty Login/Register Portal */}
        <Link
          href="/faculty.login.portal"
          className=" bg-red-500 p-8 rounded-xl w-1/3 flex flex-col items-center justify-center cursor-pointer hover:bg-red-400 active:bg-red-600"
        >
          <Image
            width={150}
            height={150}
            src={"/teacher.png"}
            alt="faculty_portal"
          />
          <h2 className="text-white text-xl font-medium mt-4">
            Faculty Portal
          </h2>
        </Link>
      </div>
    </main>
  );
}
