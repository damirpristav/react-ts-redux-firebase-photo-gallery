import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ImageModal from '../UI/ImageModal';
import Card from '../UI/Card';
import { getImages } from '../../store/actions/galleryActions';
import { RootState } from '../../store';
import { GalleryImage } from '../../store/types';

const Homepage: FC = () => {
    const { images, imagesLoaded } = useSelector((state: RootState) => state.gallery);
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (!imagesLoaded) {
            dispatch(getImages());
        }
        // eslint-disable-next-line
    }, []);

    return (
        <section className="section">
            <div className="container">
                <h1 className="title has-text-centered is-size-1 mb-6">Welcome</h1>
                <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam incidunt at animi eligendi facere reiciendis ad assumenda, omnis quasi id atque consequuntur obcaecati explicabo eius natus quae officiis itaque dolorem!</h2>
                {images.length > 0 &&
                    <div className="cards-wrapper is-flex mt-5">
                        {images.map((image: GalleryImage) => (
                            <Card
                                key={image.id}
                                imageUrl={image.imageUrl}
                                onImageClick={() => setImageUrl(image.imageUrl)}
                                onDelete={() => { }}
                                publicCard
                                uploader={image.uploaderUserName}
                            />
                        ))}
                    </div>
                }
            </div>
            {imageUrl && <ImageModal url={imageUrl} onClose={() => setImageUrl('')} />}
        </section>
    );
}

export default Homepage;