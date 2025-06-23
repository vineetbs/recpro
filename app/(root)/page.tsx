import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "@/constants";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { auth } from "../auth";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <main className="py-8 sm:mx-16 mx-2 overflow-visible">
      <Header subheading="Public Library" heading="All Videos" />
      <div className="pt-4 flex flex-col-4">
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummyCards.map((card) => (
            <VideoCard {...card} key={card.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
