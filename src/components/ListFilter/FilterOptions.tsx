import { FC } from 'react';
import styles from './FilterOptions.module.scss';

interface Props {
  filterOptions: string[];
}

const FilterOptions: FC<Props> = ({ filterOptions }) => {
  console.log('FilterOptions', filterOptions);
  return (
    <div className={styles.container}>
      {filterOptions.map((option, index) => (
        <div key={index} className={styles.option}>
          {option}
        </div>
      ))}
    </div>
  );
};

export default FilterOptions;
