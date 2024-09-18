import { FC } from 'react';
import styles from './BackgroundGradient.module.scss';

interface Props {}

const BackgroundGradient: FC<Props> = () => {
  return <div className={styles.container}>BackgroundGradient</div>;
};

export default BackgroundGradient;
