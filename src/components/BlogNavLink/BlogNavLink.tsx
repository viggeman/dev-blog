import { FC } from 'react';
import styles from './BlogNavLink.module.scss';

interface Props {
  blok: any;
}

const BlogNavLink: FC<Props> = ({ blok }) => {
  const { title, link } = blok;

  return (
    <h2 id={link.anchor} className={styles.anchorTitle}>
      {title}
    </h2>
  );
};

export default BlogNavLink;
