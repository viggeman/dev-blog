import { FC, useEffect, useState } from 'react';
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
      <div className={styles.titleWrap}>
        <h2 className={styles.listTitle}>Follow up on the latest articles and more</h2>
      </div>
      <div className={styles.filterWrap}>
        <span className={styles.filterByText}>Filter by: </span>
        <button
          className={[styles.filterButton, openFilter ? styles.active : ''].join(' ')}
          onClick={handleFilter}
        >
          {activeFilters.length > 0
            ? `${activeFilters[0]}${activeFilters.length > 1 ? ` (+${activeFilters.length - 1})` : ''}`
            : 'Choose Tag +'}
        </button>
      </div>
      {/* Handle with hide class */}
      {openFilter && (
        <div className={styles.listFilter}>
          <div className={styles.innerContainer}>
            <ul>
              {filterOptions.map((option: string) => (
                <li key={option}>
                  <button
                    className={[
                      styles.filterListButton,
                      activeFilters.includes(option) ? styles.active : '',
                    ].join(' ')}
                    onClick={() => handleFilterChange(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterList;
