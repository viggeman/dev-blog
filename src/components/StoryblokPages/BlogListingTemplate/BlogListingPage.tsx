import ArticleTeaser from '@/components/ArticleTeaser/ArticleTeaser';
import FeaturedHighlight from '@/components/FeaturedHighlight/FeaturedHighlight';
import FilterList from '@/components/FilterList/FilterList';
import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FC } from 'react';
import styles from './BlogListingPage.module.scss';

interface Props {
  blok: any;
  articles: any;
}

const BlogListingPage: FC<Props> = ({ blok, articles }) => {
  const { image, title, highlight } = blok;
  console.log('articles', articles);

  /*
  #### This is the old way of getting the unique filters ####
  const articleWithFilters = articles.filter((article: any) => article.content.category);

  const availableFilters = articleWithFilters.map((article: any) => article.content.category);

  const uniqueFilters: string[] = [];

  availableFilters.forEach((filter: any) => {
    filter.forEach((subFilter: any) => {
      if (!uniqueFilters.includes(subFilter)) {
        uniqueFilters.push(subFilter);
      }
    });
  }); */

  // This is the AI way of getting the unique filters
  const articleWithFilters = articles.filter((article: any) => article.content.category);

  const availableFilters = articleWithFilters.flatMap((article: any) => article.content.category);

  const uniqueFilters: string[] = Array.from(new Set(availableFilters));

  console.log('articleWithFilters', articleWithFilters);
  console.log('availableFilters', availableFilters);
  console.log('uniqueFilters', uniqueFilters);

  // 2 new states, for the gridItems and the filteredArticles
  // const [gridItems, setGridItems] = useState<any[]>([]);
  // grid items state should update when filkters is chosen

  const onFilterChange = (filters: string) => {
    setFilters(filters);
  };

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
      <h2>Follow up on the latest articles and more</h2>
      <FilterList filterOptions={uniqueFilters} onFilterChange={handleFilterChange} />
      <div className={styles.grid}>
        {gridItems &&
          gridItems.map((item, index) => {
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
          })}
      </div>
    </div>
  );
};

export default BlogListingPage;
