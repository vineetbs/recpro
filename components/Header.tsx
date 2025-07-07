"use client";
import { SearchIcon, Upload, Video } from "lucide-react";
import FilterComponent from "./FilterComponent";
import { useRouter } from "next/navigation";

interface IHeader {
  heading: string;
  subheading: string;
  userImg?: any;
}

const Header = ({ heading, subheading, userImg }: IHeader) => {
  const router = useRouter();
  return (
    <>
      <div className="block sm:flex justify-around">
        <div className="flex">
          {userImg && (
            <div className=" h-20 w-20 mx-2 mb-2  rounded-full mr-4  ">
              <img
                src={userImg}
                alt="userImage"
                className="h-full w-full rounded-2xl"
              />
            </div>
          )}

          <div>
            <div className="text-xs text-gray-500 p-2">{subheading}</div>
            <div className="text-3xl">{heading}</div>
          </div>
        </div>

        <div className="ml-auto flex gap-2 mt-2">
          <figure>
            <button
              className="rounded-3xl p-3 flex border border-gray-300 cursor-pointer gap-1 bg-red-300"
              onClick={() => router.push("/upload")}
            >
              <Upload />
              <div>Upload a Video</div>
            </button>
          </figure>
          {/* <figure>
            <button className="rounded-3xl p-3 flex bg-red-300 cursor-pointer gap-1">
              <Video />
              <div>Record Video</div>
            </button>
          </figure> */}
        </div>
      </div>

      <div className=" justify-around mt-4 col-span-5 relative block sm:flex  overflow-visible">
        <div className="flex px-4 py-2 border border-gray-400 rounded-3xl grid-cols-3 w-60 md:w-120 h-10 ">
          <div className="text-gray-600 pr-2">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search for videos.."
            className="w-full h-full "
          />
        </div>
        <div className="ml-auto grid-cols-2">
          <div className="">
            <FilterComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
