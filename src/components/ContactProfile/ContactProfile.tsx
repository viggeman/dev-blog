import Image from 'next/image';
import { FC } from 'react';
import styles from './ContactProfile.module.scss';

interface Props {
  contactInfo: any;
}

const ContactProfile: FC<Props> = ({ contactInfo }) => {
  const { name, workingTitle, phone, email, image } = contactInfo.content;

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <div className={styles.imageWrapper}>
          <Image src={image.filename} alt={image.alt} layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className={styles.info}>
        <div>
          <h3>{name}</h3>
          <p>{workingTitle}</p>
        </div>
        <div>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
      </div>
    </div>
  );
};

export default ContactProfile;
