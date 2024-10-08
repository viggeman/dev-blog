import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import styles from './Pagination.module.scss';

interface Props {
  totalPages: number;
}

const Pagination: FC<Props> = ({ totalPages }) => {
  const router = useRouter();
  const pageQuery = Number(router.query.page) || 1;
  const [pageCount, setPageCount] = useState<number>(pageQuery);
  const [previousHref, setPreviousHref] = useState({});
  const [nextHref, setNextHref] = useState({});

  useEffect(() => {
    setPreviousHref({
      pathname: router.pathname,
      query: pageCount > 1 ? { page: pageCount - 1 } : undefined,
    });

    setNextHref({
      pathname: router.pathname,
      query: { page: pageCount + 1 },
    });
  }, [pageCount, router.pathname]);

  useEffect(() => {
    setPageCount(pageQuery);
  }, [pageQuery]);

  const handlePageChange = (value: number) => {
    const newPage = pageCount + value;
    setPageCount(newPage);
  };

  return (
    <div className={styles.container}>
      {pageCount !== 0 && (
        <Link href={previousHref} passHref>
          <button type="button" onClick={() => handlePageChange(-1)}>
            Previous
          </button>
        </Link>
      )}
      <span>{totalPages}</span>
      {pageCount < totalPages && (
        <Link href={nextHref} passHref>
          <button
            type="button"
            onClick={() => handlePageChange(1)}
            disabled={pageCount >= totalPages}
          >
            Next
          </button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
