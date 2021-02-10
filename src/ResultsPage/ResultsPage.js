import React, { useState, useEffect } from 'react';
import classes from './ResultsPage.module.css';
import SearchBar from '../shared/SearchBar/SearchBar';
import PhotosList from './PhotosList';
import Modal from '@material-ui/core/Modal';
import Spinner from '../shared/Spinner/Spinner';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';
import { LocationOn } from '@material-ui/icons';
import { createApi } from 'unsplash-js';

const ResultsPage = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [photosList, setPhotosList] = useState([]);
  const [fetchPhotosListError, setFetchPhotosListError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState({
    alt_description: '',
    description: '',
    location: {
      title: '',
    },
    user: {
      name: '',
      username: '',
      profile_image: {
        medium: '',
      },
    },
    urls: {
      raw: '',
    },
  });
  const [fetchSinglePhotoError, setFetchSinglePhotoError] = useState(false);

  const unsplashApi = createApi({
    accessKey: 'mOqoQEk_MYTqWnAB8VNOq2ip-bDW8aV7Pd5wl4wefEM',
  });

  const userQuery = match.params.query;

  const getPhotosList = () => {
    unsplashApi.search
      .getPhotos({
        query: userQuery,
        perPage: '30',
        orderBy: 'relevant',
      })
      .then(({ response: { results } }) => {
        setPhotosList(results);
        setIsLoading(false);
      })
      .catch(() => {
        setFetchPhotosListError(true);
      });
  };

  const handlePhotoSelect = (photoId) => {
    unsplashApi.photos
      .get({
        photoId,
      })
      .then(({ response }) => {
        setSelectedPhoto(response);
        setModalOpen(true);
      })
      .catch(() => {
        setFetchSinglePhotoError(true);
      });
  };

  useEffect(getPhotosList, [userQuery]);

  if (fetchPhotosListError) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={classes.ResultsPage}>
      <div className={classes.SearchBarWraper}>
        <SearchBar color="#eaeaea" placeholder={userQuery} />
      </div>
      <h1 className={classes.SearchedResult}>{userQuery}</h1>
      <PhotosList photos={photosList} onPhotoSelect={handlePhotoSelect} />
      <Modal
        className={classes.Modal}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        {
          <div className={classes.ModalContent}>
            {fetchSinglePhotoError ? (
              <ErrorMessage />
            ) : (
              <>
                <div className={classes.Author}>
                  <div className={classes.AuthorPhoto}>
                    <img
                      className={classes.AuthorImg}
                      src={selectedPhoto.user.profile_image.medium}
                      alt="profile_image"
                    />
                  </div>
                  <div className={classes.AuthorInfo}>
                    <span className={classes.AuthorName}>
                      {selectedPhoto.user.name}
                    </span>
                    <span className={classes.AuthorUsername}>
                      {`@${selectedPhoto.user.username}`}
                    </span>
                  </div>
                </div>
                <div className={classes.ModalPhoto}>
                  <img
                    className={classes.ModalImg}
                    src={selectedPhoto.urls.raw}
                    alt={selectedPhoto.alt_description}
                  />
                </div>
                {selectedPhoto.location.title ? (
                  <div className={classes.Location}>
                    <div className={classes.LocationIconWraper}>
                      <LocationOn className={classes.LocationIcon} />
                    </div>
                    <span className={classes.LocationName}>
                      {selectedPhoto.location.title}
                    </span>
                  </div>
                ) : (
                  <span className={classes.LocationUndefinedLabel}>
                    {userQuery}
                  </span>
                )}
              </>
            )}
          </div>
        }
      </Modal>
    </div>
  );
};

export default ResultsPage;
