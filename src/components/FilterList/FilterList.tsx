import { FC, useEffect, useState } from 'react';
import Button from '../Button/Button';
import FilterOptions from '../ListFilter/FilterOptions';
import styles from './FilterList.module.scss';

interface Props {
  filterOptions: string[];
  onFilterChange: (filter: string) => void;
}

const FilterList: FC<Props> = ({ filterOptions, onFilterChange }) => {
  const [openFilter, setOpenFilter] = useState(false);
  // Pass selected filters to parent using some kind of magic function
  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    onFilterChange(activeFilters);
  }, [activeFilters]);

  return (
    // Remove filterOptions comp, add functionality here
    <div className={styles.container}>
      <span>Filter by: </span>
      <Button onClick={handleFilter} label="Choose Tag" />
      {openFilter && <FilterOptions filterOptions={filterOptions} />}
    </div>
  );
};

export default FilterList;
