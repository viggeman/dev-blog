import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import styles from './Pagination.module.scss';

interface Props {
  totalPages: number;
}

const Pagination: FC<Props> = ({ totalPages }) => {
  const router = useRouter();
  const pageQuery = router.query.page ? Number(router.query.page) : 0;
  const [previousHref, setPreviousHref] = useState({});
  const [nextHref, setNextHref] = useState({});

  useEffect(() => {
    setPreviousHref({
      pathname: router.pathname,
      query: pageQuery > 1 ? { page: pageQuery - 1 } : undefined,
    });
    setNextHref({
      pathname: router.pathname,
      query: { page: pageQuery + 1 },
    });
  }, [pageQuery, router.pathname]);

  return (
    <div className={styles.container}>
      {pageQuery !== 0 && (
        <Link href={previousHref} passHref>
          Previous
        </Link>
      )}
      <span>{totalPages}</span>
      {pageQuery < totalPages - 1 && (
        <Link href={nextHref} passHref>
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
