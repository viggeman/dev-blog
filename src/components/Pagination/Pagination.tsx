import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './Pagination.module.scss';

interface Props {
  totalPages: number;
}

const Pagination: FC<Props> = ({ totalPages }) => {
  const router = useRouter();
  const currentPage = router.query.page ? Number(router.query.page) : 0;

  const loadMoreHref = {
    pathname: router.pathname,
    query: { page: currentPage + 1 },
  };

  return (
    <div className={styles.container}>
      {currentPage != totalPages - 1 && (
        <Link href={loadMoreHref} passHref scroll={false}>
          Load More
        </Link>
      )}
    </div>
  );
};

export default Pagination;
