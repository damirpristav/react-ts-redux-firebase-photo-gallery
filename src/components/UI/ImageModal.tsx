import React, { FC } from 'react';
import ReactDOM from 'react-dom';

interface ImageModalProps {
  onClose: () => void;
  url: string;
}

const ImageModal: FC<ImageModalProps> = ({ onClose, url }) => {
  const targetEl = document.getElementById('modal-root');

  const modal = (
    <div className="modal">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content modal-content--image">
        <img src={url} alt=""/>
      </div>
      <button className="modal-close is-large" onClick={onClose}></button>
    </div>
  );

  return targetEl ? ReactDOM.createPortal(modal, targetEl) : modal;
}

export default ImageModal;