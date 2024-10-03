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

  const articleWithFilters = articles.filter((article: any) => article.content.category);

  const availableFilters = articleWithFilters.flatMap((article: any) => article.content.category);

  const uniqueFilters: string[] = Array.from(new Set(availableFilters));

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilter(filters);
  };

  console.log('selectedFilters', selectedFilter);
  console.log('filtered articles', filteredArticles);

  useEffect(() => {
    if (selectedFilter.length === 0) {
      console.log('no filter', true);
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

  console.log('gridItems', gridItems);

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

      <FilterList filterOptions={uniqueFilters} onFilterChange={handleFilterChange} />
      <div className={styles.grid}>
        {gridItems &&
          (selectedFilter.length > 0
            ? filteredArticles.map((article, index) => (
                <div className={styles.gridItem} key={`article-${index}`}>
                  <ArticleTeaser article={article} />
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
