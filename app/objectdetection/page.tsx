'use client';

import { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

interface ObjectDetectionProps {
   image: File | null;
}

const ObjectDetection: React.FC<ObjectDetectionProps> = ({ image }) => {
   const [loading, setLoading] = useState(false);
   const [predictions, setPredictions] = useState<any[]>([]);
   const imageRef = useRef<HTMLImageElement | null>(null);

   useEffect(() => {
      const detectObjects = async () => {
         if (image) {
            const img = imageRef.current;
            if (img) {
               setLoading(true);
               try {
                  await tf.ready();
                  if (!tf.getBackend()) {
                     await tf.setBackend('webgl');
                  }
                  const model = await cocoSsd.load();
                  const predictions = await model.detect(img);
                  setPredictions(predictions);
               } catch (error) {
                  console.error('Object detection failed:', error);
               } finally {
                  setLoading(false);
               }
            }
         }
      };

      detectObjects();
   }, [image]);

   return (
      <div>
         {loading && <p>Loading...</p>}
         <img ref={imageRef} src={image ? URL.createObjectURL(image) : ''} alt="Object to detect" />
         <ul>
            {predictions.map((prediction, index) => (
               <li key={index}>{prediction.class}</li>
            ))}
         </ul>
      </div>
   );
};

export default ObjectDetection;