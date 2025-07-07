import { auth } from "@/app/auth";
import LoginBar from "@/components/LoginBar";
import RotatingQuotes from "@/components/RotatingQuotes";
import { Video } from "lucide-react";
import { redirect } from "next/navigation";

const SigninPage = async () => {
  const session = await auth();
  if (session) {
    redirect("/videos");
  }
  return (
    <div>
      <header className="flex items-center text-2xl justify-center w-full m-6">
        <div className="flex">
          <Video className="text-red-500 m-2 ml-0" />
          <span className="m-2 font-extrabold text-gray-700">RecPro</span>
        </div>
      </header>
      <div className="min-h-screen flex flex-col md:flex-row  bg-gray-100 px-4 md:px-0">
        {/* Main Content */}
        <div className="flex w-full flex-col md:flex-row items-center justify-center space-y-12 md:space-y-0 md:space-x-16 pt-44 pb-48">
          {/* Rotating Quotes */}
          <div className="w-full h-full md:w-1/2  flex items-center justify-center">
            <RotatingQuotes />
          </div>

          {/* Login Bar */}
          <div className="w-full md:w-1/2 h-full  flex items-center justify-center">
            <LoginBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
