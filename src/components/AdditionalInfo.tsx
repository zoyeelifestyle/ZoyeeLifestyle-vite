import ProductShare from "./ProductShare";
import { Separator } from "./ui/separator";
import { LucideIcon } from "lucide-react";

interface Props {
  skuValue: string;
  tags: Array<string>;
  socialMedia: Array<{ Icon: LucideIcon; link: string }>;
}

const AdditionalInfo = ({ skuValue, tags, socialMedia }: Props) => {
  return (
    <div>
      <Separator />
      <p className="capitalize mt-3 font-semibold">Additional Information</p>
      <div className="mt-1 flex flex-col gap-3">
        <p className="">
          SKU: <span>{skuValue}</span>
        </p>
        <p className="">
          Tags:{" "}
          <span>
            {tags.map((item, index) => (
              <span
                className="px-2 py-1 bg-pink-300 mx-1 rounded-full text-xs font-semibold tracking-wide text-white"
                key={index}
              >
                {item}
              </span>
            ))}
          </span>
        </p>
        <div className="flex gap-1 mb-3 items-center">
          Share:{" "}
          <div>
            <ProductShare socialMedia={socialMedia} />
          </div>
        </div>
        <Separator />
      </div>
    </div>
  );
};

export default AdditionalInfo;
