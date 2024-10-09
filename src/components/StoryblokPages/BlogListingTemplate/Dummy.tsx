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
  articles: any[];
  pagination: {
    totalPages: number;
    postsPerPage: number;
  };
}

const useBlogPosts = (initialArticles: any[], postsPerPage: number) => {
  const [articles, setArticles] = useState(initialArticles);
  const [filters, setFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('');
  const [filteredArticles, setFilteredArticles] = useState<any[]>(initialArticles);
  const [uniqueFilters, setUniqueFilters] = useState<string[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const newBlogPosts = await getBlogPosts(Number(searchParams.get('page')), postsPerPage);
        setArticles(newBlogPosts);
        setUniqueFilters(findUniqueFilters(newBlogPosts));
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchBlogPosts();
  }, [searchParams, pathname]);

  useEffect(() => {
    let filtered =
      filters.length > 0
        ? articles.filter((article) =>
            filters.some((filter) => article.content.category.includes(filter))
          )
        : articles;

    if (sortOrder) {
      filtered = sortArticles(filtered, sortOrder);
    }

    setFilteredArticles(filtered);
  }, [filters, sortOrder, articles]);

  const findUniqueFilters = (articles: any[]) => {
    return Array.from(new Set(articles.flatMap((article) => article.content.category || [])));
  };

  const sortArticles = (list: any[], order: string) => {
    return [...list].sort((a, b) => {
      const dateA = new Date(a.content.date).getTime();
      const dateB = new Date(b.content.date).getTime();
      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  return {
    articles,
    filteredArticles,
    uniqueFilters,
    setFilters,
    setSortOrder,
  };
};

const BlogListingPage: FC<Props> = ({ blok, articles, pagination }) => {
  const { image, title, highlight } = blok;
  const { totalPages, postsPerPage } = pagination;
  const {
    articles: listedArticles,
    filteredArticles,
    uniqueFilters,
    setFilters,
    setSortOrder,
  } = useBlogPosts(articles, postsPerPage);

  const createGridItems = (articles: any[]) => {
    return [
      ...highlight.map((item: any) => ({
        component: item.component,
        order: item.order,
        data: item,
      })),
      ...articles.map((article: any, index: number) => ({
        component: article.content.component,
        order: index + 1,
        data: article,
      })),
    ].sort((a, b) => a.order - b.order);
  };

  const gridItems = createGridItems(listedArticles);

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

      <FilterList filters={uniqueFilters} onFilterChange={setFilters} onSortChange={setSortOrder} />
      <Pagination totalPages={totalPages} />
      <div className={styles.grid}>
        {(uniqueFilters.length > 0 || sortOrder !== '' ? filteredArticles : gridItems).map(
          (item, index) => (
            <div className={styles.gridItem} key={`item-${index}`}>
              {item.component === 'component_featured_highlight' ? (
                <FeaturedHighlight highlight={item.data} />
              ) : item.component === 'blog_page' ? (
                <ArticleTeaser article={item.data} />
              ) : null}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BlogListingPage;
