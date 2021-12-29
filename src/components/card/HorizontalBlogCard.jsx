import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as styles from "./HorizontalBlogCard.module.less";
import LocalizedLink from "../localizedLink/localizedLink";
import Skeleton from "@mui/material/Skeleton";
import clsx from "clsx";

export default function HorizontalBlogCard(props) {
  const { blogData = {} } = props;
  const [imgLoading, setImgLoading] = useState(true);
  const { title, desc, tags, cover, id: { name, ext } = {} } = blogData;
  const handleImgLoad = () => {
    setImgLoading(false);
  };
  return (
    <LocalizedLink to={name && ext && `/blog/${name}${ext}`}>
      <Card classes={{ root: styles.root }}>
        <CardMedia
          component="img"
          classes={{ img: styles.cardImg }}
          className={clsx({ [styles.loading]: imgLoading })}
          src={`https://${cover}`}
          alt="blog card cover"
          onLoad={handleImgLoad}
        />
        {imgLoading && (
          <Skeleton variant="rectangular" width={250} height={160} />
        )}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent classes={{ root: styles.cardContent }}>
            {tags?.length && (
              <Typography component="div" variant="h7" className={styles.tag}>
                {tags[0]}
              </Typography>
            )}
            <Typography variant="h4" component="div" className={styles.title}>
              {title}
            </Typography>
            <Typography component="div" variant="h7" className={styles.desc}>
              {desc}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </LocalizedLink>
  );
}
