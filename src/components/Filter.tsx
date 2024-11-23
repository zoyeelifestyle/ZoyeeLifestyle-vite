import { FilterComboBox } from "../components/FilterComboBox";

const Filter = ({
  filter,
  setFilter,
  start,
  end,
  total,
}: {
  setProductPerPage: (value: number) => void;
  filter: string;
  setFilter: (value: string) => void;
  start: number;
  end: number;
  total: number;
}) => {
  return (
    <section className="w-full bg-pink-50 flex flex-row justify-between items-center px-4 md:px-10 py-4 md:py-7">
      <div className="w-full md:w-auto">
        <p className="text-sm md:text-base font-medium tracking-wide">
          Showing {start}-{end} of {total} results
        </p>
      </div>
      <div className="flex items-center gap-3 cursor-pointer w-full md:w-auto justify-end md:justify-start mt-3 md:mt-0">
        <FilterComboBox filter={filter} setFilter={setFilter} />
      </div>
    </section>
  );
};

export default Filter;
