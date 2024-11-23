import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ProductShare = ({
  socialMedia,
}: {
  socialMedia: Array<{ Icon: LucideIcon; link: string }>;
}) => {
  return (
    <div className="flex gap-3">
      {socialMedia.map((item, index) => (
        <Link key={index} to={item.link} target="_blank">
          <item.Icon />
        </Link>
      ))}
    </div>
  );
};

export default ProductShare;
