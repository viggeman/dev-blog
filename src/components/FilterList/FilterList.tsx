import { FC, useEffect, useState } from 'react';
import styles from './FilterList.module.scss';

interface Props {
  filters: string[];
  onFilterChange: (selectedFilter: string[]) => void;
  onSortChange: (sort: string) => void;
}

const FilterList: FC<Props> = ({ filters, onFilterChange, onSortChange }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('');

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

  useEffect(() => {
    onFilterChange(activeFilters);
    onSortChange(sortOrder);
  }, [activeFilters, sortOrder]);

  return (
    <div className={styles.container}>
      <div className={styles.titleWrap}>
        <h2 className={styles.listTitle}>Follow up on the latest articles and more</h2>
      </div>
      <div className={styles.filterWrap}>
        <span className={styles.filterByText}>Filter by: </span>
        <button
          className={[styles.filterButton, activeFilters.length > 0 ? styles.active : ''].join(' ')}
          onClick={handleFilter}
        >
          {activeFilters.length > 0
            ? `${activeFilters[0]}${activeFilters.length > 1 ? ` (+${activeFilters.length - 1})` : ''}`
            : 'Choose Tag +'}
        </button>

        {activeFilters.length > 0 && (
          <button className={styles.resetButton} onClick={() => setActiveFilters([])}>
            Clear
          </button>
        )}
        <div className={styles.sortWrap}>
          <span className={styles.filterByText}>Sort by: </span>
          <select className={styles.sortSelect} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Select an option</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      {/* Handle with hide class */}
      {openFilter && (
        <div className={styles.listFilter}>
          <div className={styles.innerContainer}>
            <ul>
              {filters.map((option: string) => (
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
