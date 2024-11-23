import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationSection = ({
  currentPage,
  setCurrentPage,
  totalPossiblePage,
}: {
  currentPage: number;
  totalPossiblePage: number;
  setCurrentPage: (count: number) => void;
}) => {
  const nextPage = () => {
    if (totalPossiblePage > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full my-6 sm:my-8 lg:my-12 px-4">
      <Pagination>
        <PaginationContent className="flex justify-center items-center gap-2 sm:gap-4">
          <PaginationItem className="cursor-pointer  " onClick={previousPage}>
            <PaginationPrevious />
          </PaginationItem>

          <PaginationItem className="text-sm sm:text-base ">
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>

          <PaginationItem onClick={nextPage} className=" cursor-pointer ">
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationSection;
