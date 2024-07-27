'use client';

import { useState } from 'react';
import ImageUpload from './upload/page';
import ObjectDetection from './objectdetection/page';

const Home: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (image: File) => {
    setImage(image);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl mb-8">Object Detection App</h1>
      <ImageUpload onImageUpload={handleImageUpload} />
      {image && <ObjectDetection image={image} />}
    </div>
  );
};

export default Home;
