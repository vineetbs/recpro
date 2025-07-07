import Header from "@/components/Header";
import VideoList from "@/components/VideoList";

const page = async () => {
  return (
    <main className="py-8 sm:mx-16 mx-2 overflow-visible">
      <Header subheading="Public Library" heading="All Videos" />
      <VideoList url="/api/videos" />
    </main>
  );
};

export default page;
