import ArticleTeaser from '@/components/ArticleTeaser/ArticleTeaser';
import BackgroundGradient from '@/components/BackgroundGradient/BackgroundGradient';
import FeaturedHighlight from '@/components/FeaturedHighlight/FeaturedHighlight';
import FilterList from '@/components/FilterList/FilterList';
import Pagination from '@/components/Pagination/Pagination';
import getBlogPosts from '@/utils/getBlogPosts';
import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
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
  const createGridItems = (next: any[]) => {
    const gridItems = [
      ...highlight.map((highlightItem: any) => ({
        component: highlightItem.component,
        order: highlightItem.order,
        data: highlightItem,
      })),
      ...next.map((article: any, index: number) => ({
        component: article.content.component,
        order: index + 1,
        data: article,
      })),
    ].sort((a, b) => a.order - b.order);
    return gridItems;
  };

  const initialArticles = createGridItems(articles);
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('');
  const [listedArticles, setListedArticles] = useState<any[]>(articles);
  const [gridItems, setGridItemsState] = useState<any[]>(initialArticles);
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
    if (!pageParam) {
      setListedArticles(articles);
      setGridItemsState(initialArticles);
    }
    if (pageParam) {
      console.log('This runs');
      const fetchBlogPosts = async () => {
        setSelectedFilter([]);
        setSortOrder('');
        try {
          const newBlogPosts = await getBlogPosts(Number(pageParam), postsPerPage);
          const nextBlogPosts = [...listedArticles, ...newBlogPosts];
          console.log('next', nextBlogPosts);
          setListedArticles(nextBlogPosts);
          const gridItems = createGridItems(nextBlogPosts);
          setGridItemsState(gridItems);
        } catch (error: any) {
          console.error(error.message);
        }
      };
      fetchBlogPosts();
    }
  }, [pageParam, searchParams]);

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
      <Pagination totalPages={totalPages} />
      <div className={styles.grid}>
        {listedArticles &&
          (selectedFilter.length > 0 || sortOrder !== ''
            ? filteredArticles.map((article, index) => (
                <div className={styles.gridItem} key={`article-${index}`}>
                  <ArticleTeaser article={article} />
                  <h1>{article.content.date}</h1>
                </div>
              ))
            : gridItems.map((item, index) => (
                <div className={styles.gridItem} key={`item-${index}`}>
                  {item.component === 'component_featured_highlight' ? (
                    <FeaturedHighlight highlight={item.data} />
                  ) : item.component === 'blog_page' ? (
                    <ArticleTeaser article={item.data} />
                  ) : null}
                  <h1>hej</h1>
                </div>
              )))}
      </div>
    </div>
  );
};

export default BlogListingPage;
