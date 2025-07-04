import { ChevronDown, Ellipsis, Eye, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IVideoCard {
  videoId: number;
  title: string;
  thumbnail?: string;
  createdAt?: string;
  userImg?: string;
  username?: string;
  views?: number;
  visibility?: string;
  duration?: number;
}
const VideoCard = ({
  videoId,
  title,
  thumbnail,
  createdAt,
  // userImg,
  username,
  views,
  visibility,
  duration,
}: IVideoCard) => {
  // const diff = Date.now() - createdAt.getTime();

  return (
    <div className=" w-full border-gray-300 border-1 font-light rounded-2xl ">
      <Link href={`video/${videoId}`} className="block w-full">
        <div className="relative w-full h-32 rounded-xl overflow-hidden">
          {/* <Image
            src={thumbnail}
            alt="thumbnail"
            width={300}
            height={40}
            className="w-full h-full object-cover rounded-xl "
          /> */}
          {/* <div className="absolute text-white bg-gray-900 rounded-3xl p-1.5 bottom-2 right-2">
            {Math.floor(duration / 60)} mins
          </div> */}
          <div className="bg-white/75 top-2 right-2 absolute rounded-xl px-2">
            <Link2 />
          </div>
          <div className="bg-white/75 top-10 right-2 absolute rounded-xl px-2">
            <Ellipsis />
          </div>
        </div>
        <div className="flex  ">
          <div className="px-1 pt-3 ">
            {/* {userImg ? (
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
            )} */}
          </div>

          <div className="flex pt-2 w-full justify-around  ">
            <div className="flex justify-start">
              <div>
                {/* <div className="font-semibold">{username}</div> */}
                <div className="flex text-gray-700 ">
                  {/* <div>{visibility}</div> */}
                  <ChevronDown className="" />
                </div>
              </div>
              {/* {createdAt.toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })} */}
            </div>
            <div className="ml-auto">
              <div className="flex text-gray-800">
                <Eye className="p-1" />
                {/* {views} */}
              </div>
            </div>
          </div>
        </div>
        <div className="text-xl font-medium flex items-center pl-2 pb-2 justify-between pt-2">
          {title}
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
