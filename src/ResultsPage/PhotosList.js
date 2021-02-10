import React from 'react';
import classes from './PhotosList.module.css';
import Photo from './Photo';

const PhotosList = ({ photos, onPhotoSelect }) => {
  const photosColumn1 = photos.slice(0, 10);
  const photosColumn2 = photos.slice(10, 20);
  const photosColumn3 = photos.slice(20, 30);

  if (photos.length < 1) {
    return <h5>No photos found!</h5>;
  }

  return (
    <div className={classes.Photos}>
      <div>
        {photosColumn1.map((photo) => (
          <Photo key={photo.id} photo={photo} onPhotoSelect={onPhotoSelect} />
        ))}
      </div>
      <div>
        {photosColumn2.map((photo) => (
          <Photo key={photo.id} photo={photo} onPhotoSelect={onPhotoSelect} />
        ))}
      </div>
      <div>
        {photosColumn3.map((photo) => (
          <Photo key={photo.id} photo={photo} onPhotoSelect={onPhotoSelect} />
        ))}
      </div>
    </div>
  );
};

export default PhotosList;
