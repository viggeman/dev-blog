import ArticleTeaser from '@/components/ArticleTeaser/ArticleTeaser';
import BackgroundGradient from '@/components/BackgroundGradient/BackgroundGradient';
import FeaturedHighlight from '@/components/FeaturedHighlight/FeaturedHighlight';
import FilterList from '@/components/FilterList/FilterList';
import Pagination from '@/components/Pagination/Pagination';
import getBlogPosts from '@/utils/getBlogPosts';
import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import styles from './BlogListingPage.module.scss';

interface Props {
  blok: any;
  articles: any;
  pagination: any;
}

const BlogListingPage: FC<Props> = ({ blok, articles, pagination }) => {
  const router = useRouter();
  const { image, title, highlight } = blok;
  const { query } = router;
  const { totalPosts, postsPerPage } = pagination;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('');
  const [listedArticles, setListedArticles] = useState<any[]>([]);
  const [uniqueFilters, setUniqueFilters] = useState<string[]>([]);

  useEffect(() => {
    const uniqueFilters: string[] = Array.from(
      new Set(
        articles
          .filter((article: any) => article.content.category)
          .flatMap((article: any) => article.content.category)
      )
    );
    setUniqueFilters(uniqueFilters);
  }, [searchParams, pathname]);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilter(filters);
  };

  const handleSortChange = (sort: string) => {
    setSortOrder(sort);
  };

  // TODO - add to a custom hook, good practice
  const sortArticles = (list: any[], order: string) => {
    const sortedArticles = [...list].sort((a, b) => {
      const dateA = new Date(a.content.date).getTime();
      const dateB = new Date(b.content.date).getTime();

      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return sortedArticles;
  };

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const newBlogPosts = await getBlogPosts(searchParams.get('page'));
        setListedArticles(newBlogPosts);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchBlogPosts();
  }, [searchParams, pathname]);

  useEffect(() => {
    let filteredArticles =
      selectedFilter.length > 0
        ? articles.filter((article: any) =>
            selectedFilter.some((filter) => article.content.category.includes(filter))
          )
        : articles;

    if (sortOrder) {
      filteredArticles = sortArticles(filteredArticles, sortOrder);
    }

    setListedArticles(filteredArticles);
  }, [selectedFilter, sortOrder]);

  const gridItems = [
    ...highlight.map((highlightItem: any) => ({
      component: highlightItem.component,
      order: highlightItem.order,
      data: highlightItem,
    })),
    ...articles.map((article: any, index: number) => ({
      component: article.content.component,
      order: index + 1,
      data: article,
    })),
  ].sort((a, b) => a.order - b.order);

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
        {gridItems &&
          (selectedFilter.length > 0 || sortOrder !== '' || query
            ? listedArticles.map((article, index) => (
                <div className={styles.gridItem} key={`article-${index}`}>
                  <ArticleTeaser article={article} />
                  <h1>{article.content.date}</h1>
                </div>
              ))
            : gridItems.map((item, index) => {
                if (item.component === 'component_featured_highlight') {
                  return (
                    <div className={styles.gridItem} key={`highlight-${index}`}>
                      <FeaturedHighlight highlight={item.data} />
                    </div>
                  );
                } else if (item.component === 'blog_page') {
                  return (
                    <div className={styles.gridItem} key={`article-${index}`}>
                      <ArticleTeaser article={item.data} />
                    </div>
                  );
                }
                return null;
              }))}
      </div>
    </div>
  );
};

export default BlogListingPage;
