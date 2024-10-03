import { FC } from 'react';
import styles from './BackgroundGradient.module.scss';

interface Props {
  background: 'gradient' | 'grey';
}

const BackgroundGradient: FC<Props> = ({ background }) => {
  const classNames = [
    styles.container,
    background === 'gradient' ? styles.gradient : styles.grey,
  ].join(' ');

  return <div className={classNames} />;
};

export default BackgroundGradient;
