"use client";
import { Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import { toast, Toaster } from "sonner";

export interface IVideoCard {
  videoId: number;
  title: string;
  thumbUrl: string;
  createdAt: Date;
  userImg?: string;
  username: string;
  visibility: boolean;
  duration: number;
}
const VideoCard = ({
  videoId,
  title,
  thumbUrl,
  createdAt,
  userImg,
  username,
  visibility,
  duration,
}: IVideoCard) => {
  const timeAgo = formatDistanceToNowStrict(new Date(createdAt), {
    addSuffix: true,
  });

  const copyFn = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_URL}/video/${videoId}`
      );
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Error while copying the url");
    }
  };

  return (
    <div className=" w-full border-gray-300 border-1 font-light rounded-2xl">
      <Toaster richColors />

      <div className="relative w-full  rounded-xl overflow-hidden aspect-video">
        <Link href={`video/${videoId}`} className="block w-full">
          <Image
            src={thumbUrl}
            alt="thumbnail"
            fill
            className="w-full h-full object-cover rounded-xl "
          />
        </Link>
        {/* <div className="absolute text-white bg-gray-900 rounded-xl p-0.5 bottom-2 right-2">
            {Math.floor(duration / 60)} mins
          </div> */}
        <div className="bg-white/50 top-2 right-2 absolute rounded-2xl pt-1 px-2">
          <button onClick={() => copyFn()}>
            <Link2 />
          </button>
        </div>
      </div>
      <Link href={`video/${videoId}`}>
        <div className="text-2xl font-semibold text-center ">{title}</div>
        <div className="flex text-gray-800 ">
          <div className="p-2 pt-3 ">
            {userImg ? (
              <Image
                src={userImg}
                alt="user-img"
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <Image
                src="/assets/image.png"
                alt="user-img"
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
          </div>

          <div className="flex pt-2 w-full   ">
            <div className="flex justify-start px-2">
              <div>
                <div className="font-semibold">{username}</div>
                <div className="flex text-gray-700 ">
                  <div>{visibility ? "Public" : "Private"}</div>
                </div>
              </div>
            </div>
            <div className="text-sm p-4 ml-auto">{timeAgo}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
