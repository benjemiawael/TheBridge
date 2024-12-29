import React from 'react';
import styles from '../styles/CourseCard.module.css';

function CourseCard({ title, description, price, imgsrc }) {
  return (
    
    <div className={styles.card}>
      <img src={imgsrc} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>{price.toString() + " DT/Month"}</p>
      </div>
    </div>
  );
}

export default CourseCard;