"use client";
import { CircleUserRound, LogOutIcon, Video } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const logout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await signOut();
      router.push("/");
    }
  };
  const userImg = session?.user?.image || "";
  return (
    <div className="flex py-8 md:mx-16 justify-around border-b-1 border-gray-300">
      <div className="flex">
        <div className="py-1 ">
          <Video className="text-red-500" />
        </div>
        <div className="px-2 font-extrabold text-2xl text-gray-700">RecPro</div>
      </div>
      <div className="ml-auto">
        {status === "authenticated" ? (
          <div>
            <div className=" cursor-pointer">
              <button onClick={() => router.push(`profile/1234`)}>
                {userImg ? (
                  <Image
                    src={userImg}
                    width={32}
                    height={32}
                    alt="userimg"
                    className="rounded-full"
                  />
                ) : (
                  <CircleUserRound />
                )}
              </button>
              <button
                className="px-2 cursor-pointer text-gray-700"
                onClick={logout}
              >
                <LogOutIcon />
              </button>
            </div>
          </div>
        ) : (
          <div className="border-1 border-gray-500 rounded-2xl p-2">
            <button onClick={() => router.push("/sign-in")}>SiginIn</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
