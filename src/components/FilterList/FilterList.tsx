import { FC, useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './FilterList.module.scss';

interface Props {
  filterOptions: string[];
  onFilterChange: (selectedFilter: string[]) => void;
}

const FilterList: FC<Props> = ({ filterOptions, onFilterChange }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleFilterChange = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  console.log('activeFilters', activeFilters);
  useEffect(() => {
    onFilterChange(activeFilters);
  }, [activeFilters]);

  return (
    <div className={styles.container}>
      <span>Filter by: </span>
      <Button onClick={handleFilter} label="Choose Tag" />
      {openFilter && (
        <div>
          <ul>
            {filterOptions.map((option: string) => (
              <li key={option}>
                <button
                  onClick={() => handleFilterChange(option)}
                  style={{ background: activeFilters.includes(option) ? 'red' : 'transparent' }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterList;
