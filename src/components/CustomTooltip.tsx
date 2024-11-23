import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

const CustomTooltip = ({
  Icon,
  text,
  p,
  color,
}: {
  Icon?: LucideIcon;
  text: string;
  p?: string;
  color?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {Icon && <Icon className="w-3 h-3 md:w-4 md:h-4 " />}
          {p && <p className="text-xs md:text-base">{p}</p>}
        </TooltipTrigger>
        <TooltipContent className={`${color ? color : "bg-pink-600"}  mb-2`}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
