import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FC } from 'react';
import Button from '../Button/Button';
import ContactProfile from '../ContactProfile/ContactProfile';
import styles from './ContactGrid.module.scss';

interface Props {
  blok: any;
}

const ContactGrid: FC<Props> = ({ blok }) => {
  const { contact_profile, image, image_title, module_title, link } = blok;
  return (
    <div className={styles.container} {...storyblokEditable(blok)}>
      <div className={styles.headerWrapper}>
        <h2>{module_title}</h2>
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.infoContainer}>
          <div className={styles.imageWrapper}>
            <Image src={image.filename} alt={image.alt} layout="fill" objectFit="cover" />
          </div>
          <div className={styles.content}>
            <h3>{image_title}</h3>
            {link.map((item: any) => (
              <Button
                label={item.label}
                linktype={item.link.linktype}
                href={item.link.cached_url}
                className="button"
              />
            ))}
          </div>
        </div>
        <div className={styles.contactProfiles}>
          {contact_profile.map((profile: any) => (
            <ContactProfile key={profile.uuid} contactInfo={profile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactGrid;
