import { FC } from 'react';
import LinkComponent from '../Link/Link';
import styles from './UspBar.module.scss';

interface Props {
  blok: any;
}

const UspBar: FC<Props> = ({ blok }) => {
  return (
    <div className={styles.container}>
      {blok.map((item: any) => (
        <LinkComponent key={item._uid} href={item.link.cached_url} label={item.text} />
      ))}
    </div>
  );
};

export default UspBar;
