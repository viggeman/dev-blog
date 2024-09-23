import { FC, useState } from 'react';
import LinkComponent from '../Link/Link';
import styles from './UspBar.module.scss';

interface Props {
  blok: any;
}

const UspBar: FC<Props> = ({ blok }) => {
  const [isClosed, setIsClosed] = useState(false);

  const closeUspBar = () => {
    setIsClosed(true);
  };

  return (
    <div>
      <div className={[styles.container, isClosed ? styles.hidden : ''].join(' ')}>
        <div>
          {blok.map((item: any) => (
            <LinkComponent key={item._uid} href={item.link.cached_url} label={item.text} />
          ))}
          <button className={styles.closeButton} onClick={closeUspBar}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default UspBar;
