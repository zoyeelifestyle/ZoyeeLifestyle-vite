import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { removeExtra } from "@/utils/helper";

const SingleProductBanner = ({ productName }: { productName: string }) => {
  return (
    <div className="w-full bg-pink-50 px-4 sm:px-6 md:px-7 py-4 sm:py-5 md:py-6">
      <Breadcrumb>
        <BreadcrumbList className="flex flex-wrap items-center">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-sm sm:text-base md:text-lg font-semibold"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="mx-2 text-sm sm:text-base md:text-lg" />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/shop"
              className="text-sm font-semibold sm:text-base md:text-lg"
            >
              Shop
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="mx-2 text-sm sm:text-base md:text-lg" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-sm sm:text-base md:text-lg">
              {removeExtra(productName)}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default SingleProductBanner;
