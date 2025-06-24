import { auth } from "@/app/auth";
import LoginBar from "@/components/LoginBar";
import RotatingQuotes from "@/components/RotatingQuotes";
import { Video } from "lucide-react";
import { redirect } from "next/navigation";

const SigninPage = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 px-4 md:px-0">
      {/* Logo Header */}
      {/* <header className="flex items-center text-2xl mb-8 md:mb-0 md:mr-12">
        <Video className="text-red-500" />
        <span className="px-2 font-extrabold text-gray-700">RecPro</span>
      </header> */}

      {/* Main Content */}
      <div className="flex  flex-col md:flex-row items-center justify-center space-y-12 md:space-y-0 md:space-x-16">
        {/* Rotating Quotes */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <RotatingQuotes />
        </div>

        {/* Login Bar */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <LoginBar />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
