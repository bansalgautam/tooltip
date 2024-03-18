import CustomTooltip from "@/components/tooltip";
import { IoIosInformationCircle } from "react-icons/io";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col gap-10 lg:flex-row md:gap-20 items-center justify-center bg-black">
      <CustomTooltip content="This is Top Tooltip">
        <div className="flex items-center gap-2 border bg-gray-200 px-4 cursor-pointer rounded">
          <div>Top</div>
          <IoIosInformationCircle className="cursor-pointer" />
        </div>
      </CustomTooltip>

      <CustomTooltip content="This is Bottom Tooltip" position="bottom">
        <div className="flex items-center gap-2 border bg-gray-200 px-4 cursor-pointer rounded">
          <div>Bottom</div>
          <IoIosInformationCircle className="cursor-pointer" />
        </div>
      </CustomTooltip>

      <CustomTooltip content="This is Right Tooltip" position="right">
        <div className="flex items-center gap-2 border bg-gray-200 px-4 cursor-pointer rounded">
          <div>Right</div>
          <IoIosInformationCircle className="cursor-pointer" />
        </div>
      </CustomTooltip>

      <CustomTooltip content="This is Left Tooltip" position="left">
        <div className="flex items-center gap-2 border bg-gray-200 px-4 cursor-pointer rounded">
          <div>Left</div>
          <IoIosInformationCircle className="cursor-pointer" />
        </div>
      </CustomTooltip>
    </div>
  );
}
