import ArticleTeaser from '@/components/ArticleTeaser/ArticleTeaser';
import BackgroundGradient from '@/components/BackgroundGradient/BackgroundGradient';
import FeaturedHighlight from '@/components/FeaturedHighlight/FeaturedHighlight';
import FilterList from '@/components/FilterList/FilterList';
import Pagination from '@/components/Pagination/Pagination';
import getBlogPosts from '@/utils/getBlogPosts';
import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import styles from './BlogListingPage.module.scss';

interface Props {
  blok: any;
  articles: any;
  pagination: any;
}

const BlogListingPage: FC<Props> = ({ blok, articles, pagination }) => {
  const { image, title, highlight } = blok;
  const { totalPages, postsPerPage } = pagination;
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('');
  const [listedArticles, setListedArticles] = useState<any[]>(articles);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [uniqueFilters, setUniqueFilters] = useState<string[]>([]);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilter(filters);
  };

  const handleSortChange = (sort: string) => {
    setSortOrder(sort);
  };

  // TODO - add to a custom hook, good practice
  const sortArticles = (list: any[], order: string) => {
    return [...list].sort((a, b) => {
      const dateA = new Date(a.content.date).getTime();
      const dateB = new Date(b.content.date).getTime();

      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  useEffect(() => {
    const uniqueFilters: string[] = Array.from(
      new Set(
        listedArticles
          .filter((article: any) => article.content.category)
          .flatMap((article: any) => article.content.category)
      )
    );

    setUniqueFilters(uniqueFilters);
  }, [listedArticles]);

  useEffect(() => {
    const fetchBlogPosts = async (page: number) => {
      try {
        const newBlogPosts = await getBlogPosts(postsPerPage, page);
        setListedArticles((prevArticles) => [...prevArticles, ...newBlogPosts]);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    const pageQuery = Number(router.query.page) + 1;
    if (pageQuery && pageQuery <= totalPages) {
      fetchBlogPosts(pageQuery);
    } else {
      setListedArticles(articles);
    }
  }, [router.query.page, postsPerPage]);

  useEffect(() => {
    let filteredArticles =
      selectedFilter.length > 0
        ? listedArticles.filter((article: any) =>
            selectedFilter.some((filter) => article.content.category.includes(filter))
          )
        : listedArticles;

    if (sortOrder) {
      filteredArticles = sortArticles(filteredArticles, sortOrder);
    }

    setFilteredArticles(filteredArticles);
  }, [selectedFilter, sortOrder]);

  return (
    <div {...storyblokEditable(blok)}>
      <BackgroundGradient background="grey" />
      <div className={styles.heroContainer}>
        <div className={styles.textContainer}>
          <div className={styles.textWrapper}>
            <h1>{title}</h1>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <Image src={image.filename} alt={image.alt} layout="fill" objectFit="cover" />
        </div>
      </div>

      <FilterList
        filters={uniqueFilters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <div className={styles.grid}>
        {listedArticles &&
          (selectedFilter.length > 0 || sortOrder !== ''
            ? filteredArticles.map((article, index) => (
                <div className={styles.gridItem} key={index} style={{ order: index }}>
                  <ArticleTeaser article={article} />
                </div>
              ))
            : [
                ...highlight.map((item: any, index: any) => (
                  <div
                    className={`${styles.gridItem} ${styles.highlightItem}`}
                    key={`highlight-${index}`}
                    style={{ order: item.order }}
                  >
                    <FeaturedHighlight highlight={item} />
                  </div>
                )),
                ...listedArticles.map((article, index) => (
                  <div
                    className={styles.gridItem}
                    key={`article-${index}`}
                    style={{ order: index + 1 }}
                  >
                    <ArticleTeaser article={article} />
                  </div>
                )),
              ])}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default BlogListingPage;
