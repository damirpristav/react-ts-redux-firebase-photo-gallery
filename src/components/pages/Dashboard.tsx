import React, { FC, useEffect, useState, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../UI/Message';
import Button from '../UI/Button';
import UploadImagesModal from '../sections/UploadImagesModal';
import ImageModal from '../UI/ImageModal';
import Card from '../UI/Card';
import Alert from '../UI/Alert';
import { setSuccess } from '../../store/actions/authActions';
import { getImages, deleteImage } from '../../store/actions/galleryActions';
import { RootState } from '../../store';
import { GalleryImage } from '../../store/types';

const Dashboard: FC = () => {
  const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
  const { images, imagesLoaded } = useSelector((state: RootState) => state.gallery);
  const dispatch = useDispatch();
  const [showUploadImagesModal, setShowUploadImagesModal] = useState(false);
  const [showDeleteImageAlert, setShowDeleteImageAlert] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [userImages, setUserImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    if(!imagesLoaded) {
      dispatch(getImages());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(images.length > 0) {
      const filtered = images.filter(i => i.uploaderId === user?.id);
      setUserImages(filtered);
    }else {
      setUserImages([]);
    }
    // eslint-disable-next-line
  }, [images]);

  useEffect(() => {
    if(success) {
      dispatch(setSuccess(''));
    }
  }, [success, dispatch]);

  const deleteHandler = (image: GalleryImage, e: MouseEvent) => {
    e.preventDefault();
    setShowDeleteImageAlert(true);
    setSelectedImage(image);
  }

  const deleteImageHandler = () => {
    if(selectedImage) {
      setDeleting(true);
      dispatch(deleteImage(selectedImage, () => {
        setDeleting(false);
        setShowDeleteImageAlert(false);
      }));
    }
  }

  return(
    <section className="section">
      <div className="container">
        {needVerification && <Message type="success" msg="Please verify your email address." />}
        <h1 className="is-size-1">Welcome {user?.firstName}</h1>
        <Button text="Upload images" className="mb-5" onClick={() => setShowUploadImagesModal(true)} />
        {!imagesLoaded
          ? <h2 className="is-size-3">Loading images...</h2>
          : userImages.length === 0
            ? <Message type="info" msg="No images, please upload some" />
            : <div className="cards-wrapper is-flex">
              {userImages.map((image: GalleryImage) => (
                <Card 
                  key={image.id}
                  onDelete={(e: MouseEvent) => deleteHandler(image, e)}
                  imageUrl={image.imageUrl}
                  onImageClick={() => setImageUrl(image.imageUrl)}
                />
              ))}
            </div>
        }
        {showUploadImagesModal && <UploadImagesModal onClose={() => setShowUploadImagesModal(false)} />}
        {showDeleteImageAlert && <Alert 
          title="Are you sure you want to delete this image ?"
          onClose={() => setShowDeleteImageAlert(false)}
          onSubmit={deleteImageHandler}
          deleting={deleting}
        />}
        {imageUrl && <ImageModal url={imageUrl} onClose={() => setImageUrl('')} />}
      </div>
    </section>
  );
}

export default Dashboard;