import Image from 'next/image';
import { FC } from 'react';
import Button from '../Button/Button';
import ContactProfile from '../ContactProfile/ContactProfile';
import styles from './ContactGrid.module.scss';

interface Props {
  blok: any;
}

const ContactGrid: FC<Props> = ({ blok }) => {
  const { contact_profile, image, image_title, module_title, contact_email, button_text } = blok;
  return (
    <div className={styles.container}>
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
            <Button label={button_text} />
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
