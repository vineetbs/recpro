"use client";
import { Video } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const LoginBar = () => {
  const loginGoogle = async () => {
    await signIn("google", { redirectTo: "/" });
  };
  return (
    <div className="w-full max-w-sm border rounded-xl border-gray-300 shadow-xl bg-white">
      <div className="flex items-center justify-center py-4 text-2xl">
        <Video className="text-red-500" />
        <span className="px-2 font-extrabold text-gray-700">RecPro</span>
      </div>

      <div className="px-6 text-center text-2xl font-medium space-y-1">
        <div>Create and share your very first</div>
        <div>
          <span className="text-red-600">RecPro video</span>
          <span className="pl-1">in no time!</span>
        </div>
      </div>

      <div className="px-6 pt-4 pb-6">
        <button
          onClick={() => loginGoogle()}
          type="button"
          className="flex w-full items-center justify-center space-x-2 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-2xl shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Image
            src="/assets/google.svg"
            alt="Google logo"
            width={20}
            height={20}
          />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginBar;
