import { auth } from "@/auth";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import VideoList from "@/components/VideoList";
import { dummyCards } from "@/constants";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const user = session?.user;
  return (
    <div className="py-8 md:mx-16">
      <Header
        heading={user?.name!}
        subheading={user?.email!}
        userImg={user?.image}
      />

      <VideoList url="/api/user" />
    </div>
  );
};

export default page;
