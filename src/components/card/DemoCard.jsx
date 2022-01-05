import React from 'react';
import { Button } from '@mui/material';
import * as styles from './DemoCard.module.less';
import { Link } from 'gatsby-plugin-react-i18next';

const DemoCard = ({
  href,
  videoSrc,
  cover,
  name,
  desc,
  index
}) => {

  return (
    <div className={styles.demoCard} style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
      <div className={styles.coverWrapper}>
        <img src={cover} alt={name} />
      </div>

      <div className={styles.contentWrapper}>
        <h3>{name}</h3>
        <p>{desc}</p>
        <div className={styles.btnGroup}>
          <button className={styles.tryBtn}>Try Demo</button>

          <button className={styles.watchBtn}>Watch Demo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="m10 16.5 6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                fill="white"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default DemoCard;
