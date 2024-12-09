/* eslint-disable @typescript-eslint/no-explicit-any */
import { authStore } from "@/store/authStore";
// import ProductShare from "./ProductShare";
import { Separator } from "./ui/separator";
import { LucideIcon } from "lucide-react";
import SketetonWrapper from "./SkeletonWrapper";

interface Props {
  skuValue: string;
  tags: Array<any>;
  socialMedia: Array<{ Icon: LucideIcon; link: string }>;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AdditionalInfo = ({ skuValue, tags, socialMedia }: Props) => {
  const { isLoading } = authStore();
  return (
    <div>
      <Separator />
      <p className="capitalize mt-3 font-semibold">Additional Information</p>
      <div className="mt-1 flex flex-col gap-3">
        <p className="flex gap-2">
          <p>SKU: </p>
          <span>
            <SketetonWrapper isLoading={isLoading}>{skuValue}</SketetonWrapper>
          </span>
        </p>
        <p className="flex gap-1">
          Tags:{" "}
          <span>
            <SketetonWrapper isLoading={isLoading}>
              <div className="grid grid-cols-3 gap-1">
                {tags.map((item, index) => (
                  <span
                    className="px-2 py-1 flex justify-center items-center bg-pink-300 mx-1 rounded-full text-xs font-semibold tracking-wide text-white"
                    key={index}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </SketetonWrapper>
          </span>
        </p>
        {/* <div className="flex gap-1 mb-3 items-center">
          Share:{" "}
          <div>
            <ProductShare socialMedia={socialMedia} />
          </div>
        </div> */}
        <Separator />
      </div>
    </div>
  );
};

export default AdditionalInfo;
