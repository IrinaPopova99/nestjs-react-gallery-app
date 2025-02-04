import React, { useState } from 'react';
import { useAppDispatch } from '~/hooks/state';
import { uploadImage } from '~/state/gallerySlice';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const dispatch = useAppDispatch();

  const onUpload = (event) => {
    event.preventDefault();
    file && dispatch(uploadImage(file));
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={onUpload}>
        <input type="file" onChange={onFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
