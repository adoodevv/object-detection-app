'use client';

import { useState } from 'react';

interface ImageUploadProps {
   onImageUpload: (image: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
   const [selectedImage, setSelectedImage] = useState<File | null>(null);

   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         setSelectedImage(file);
         onImageUpload(file);
      }
   };

   return (
      <div className="p-4 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-md">
         <input type="file" accept="image/*" onChange={handleImageChange} />
         {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="mt-4 w-64 h-auto rounded-lg" />}
      </div>
   );
};

export default ImageUpload;
