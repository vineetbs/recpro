import { auth } from "@/auth";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "@/constants";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: any) => {
  const { id } = await params;
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
      {id}

      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyCards.map((card) => (
          <VideoCard {...card} key={card.id} />
        ))}
      </div>
    </div>
  );
};

export default page;
