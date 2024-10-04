import ArticleTeaser from '@/components/ArticleTeaser/ArticleTeaser';
import BackgroundGradient from '@/components/BackgroundGradient/BackgroundGradient';
import FeaturedHighlight from '@/components/FeaturedHighlight/FeaturedHighlight';
import FilterList from '@/components/FilterList/FilterList';
import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import styles from './BlogListingPage.module.scss';

interface Props {
  blok: any;
  articles: any;
}

const BlogListingPage: FC<Props> = ({ blok, articles }) => {
  const { image, title, highlight } = blok;
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('');

  const articleWithFilters = articles.filter((article: any) => article.content.category);

  const availableFilters = articleWithFilters.flatMap((article: any) => article.content.category);

  const uniqueFilters: string[] = Array.from(new Set(availableFilters));

  const newDateTest = Date.now();
  console.log('newdate', newDateTest);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilter(filters);
  };

  const handleSortChange = (sort: string) => {
    setSortOrder(sort);
  };
  console.log('sortOrder', sortOrder);

  // TODO - Fix sorting filter bug
  useEffect(() => {
    if (sortOrder === '') {
      return;
    }
    if (sortOrder === 'newest') {
      console.log('is newest');
      const sortedArticles = [...articles].sort((a, b) => {
        return new Date(b.content.date).getTime() - new Date(a.content.date).getTime();
      });
      console.log('new sort', sortedArticles);
      setFilteredArticles(sortedArticles);
    } else if (sortOrder === 'oldest') {
      console.log('is oldest');
      const sortedArticles = [...articles].sort((a, b) => {
        return new Date(a.content.date).getTime() - new Date(b.content.date).getTime();
      });
      console.log('is oldest', sortedArticles);
      setFilteredArticles(sortedArticles);
    } else {
      setFilteredArticles(articles);
    }
  }, [sortOrder]);

  useEffect(() => {
    if (selectedFilter.length === 0) {
      return;
    }
    const nextArticleList = articleWithFilters.filter((article: any) => {
      return selectedFilter.some((filter) => article.content.category.includes(filter));
    });
    setFilteredArticles(nextArticleList);
  }, [selectedFilter]);

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
        filterOptions={uniqueFilters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <div className={styles.grid}>
        {/* TODO - Fix height on gridItems */}
        {gridItems &&
          (selectedFilter.length > 0 || sortOrder !== ''
            ? filteredArticles.map((article, index) => (
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
