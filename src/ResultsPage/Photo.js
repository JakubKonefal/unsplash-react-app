import React from 'react';
import classes from './Photo.module.css';

const Photo = ({
  photo: { id, urls, tags, alt_description },
  onPhotoSelect,
}) => (
  <div className={classes.Photo}>
    <img
      className={classes.PhotoImg}
      src={urls.small}
      alt={alt_description}
      onClick={() => onPhotoSelect(id)}
    />
    <div className={classes.PhotoTags}>
      {tags &&
        tags.map(({ title }) => (
          <div key={title} className={classes.PhotoTag}>
            <span className={classes.TagTitle}> {title} </span>
          </div>
        ))}
    </div>
  </div>
);

export default Photo;
