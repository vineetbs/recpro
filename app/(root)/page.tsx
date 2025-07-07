import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import VideoList from "@/components/VideoList";

const page = async () => {
  // // const session = await auth();
  // // if (!session) {
  // //   redirect("/sign-in");
  // // }

  // return (
  //   <main className="py-8 sm:mx-16 mx-2 overflow-visible">
  //     <Header subheading="Public Library" heading="All Videos" />
  //     <VideoList />
  //   </main>
  // );
  redirect("/sign-in");
};

export default page;
