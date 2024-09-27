import BackgroundGradient from '@/components/BackgroundGradient/BackgroundGradient';
import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import styles from './BlogTemplate.module.scss';

interface Props {
  blok: any;
}
const BlogTemplate: FC<Props> = ({ blok }) => {
  const { image, title, subtitle, date, author, body } = blok;
  const formatDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const anchorLinks = body.filter((blok: any) => blok.component === 'component_blog_nav_link');

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, anchor: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(anchor);
    if (targetElement) {
      const offset = 140;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const observerRef = useRef<IntersectionObserver | null>(null);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      // rootMargin works for some reason with full negative values
      rootMargin: '-15% 0px -85% 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveAnchor(entry.target.id);
        }
      });
    }, options);

    const elements = anchorLinks.map((link: any) => document.getElementById(link.link.anchor));
    elements.forEach((element: any) => {
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const checkScroll = (e: any) => {
      const scrollY = window.scrollY;
      if (scrollY < 550) {
        setActiveAnchor(null);
      }
    };

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <div className={styles.container} {...storyblokEditable(blok)}>
      <BackgroundGradient />
      <h1 className={[styles.title, styles.hideDesktop].join(' ')}>{title}</h1>
      <div className={styles.featuredImage}>
        <Image src={image.filename} alt={image.alt} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.contentGrid}>
        <div className={styles.intro}>
          <h1 className={[styles.title, styles.hideMobile].join(' ')}>{title}</h1>
          <div className={styles.anchorLinks}>
            {anchorLinks.map((link: any) => (
              <ul>
                <li key={link._uid}>
                  <a
                    className={[
                      styles.blogNavLink,
                      activeAnchor === link.link.anchor ? styles.active : '',
                    ].join(' ')}
                    href={`#${link.link.anchor}`}
                    onClick={(e) => handleAnchorClick(e, link.link.anchor)}
                  >
                    {link.title}
                  </a>
                </li>
              </ul>
            ))}
          </div>
          <p className={styles.author}>
            <span>Written by: </span> <span>{author}</span>
          </p>
          <p className={styles.date}>
            <span>Published: </span>
            <span>{formatDate}</span>
          </p>
        </div>
        <div className={styles.content} id="content">
          <h2 className={styles.subtitle}>{subtitle}</h2>
          <div className={styles.body}>
            {body.map((nestedBlok: any) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTemplate;
