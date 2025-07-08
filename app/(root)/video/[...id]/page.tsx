import VideoList from "@/components/VideoList";
import VideoPlayer from "@/components/VideoPlayer";

const page = async ({ params }: any) => {
  const videoId = params.id[0];

  return (
    <main className=" py-8 sm:mx-16 mx-2 overflow-visible">
      {/* <VideoList url="/api/videos" /> */}
      <VideoPlayer id={videoId} />
    </main>
  );
};

export default page;
