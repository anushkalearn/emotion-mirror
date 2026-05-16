import * as faceapi from "face-api.js";
import { useEffect, useState } from "react";

export default function useFaceEmotion(videoRef) {
  const [emotions, setEmotions] = useState(null);

  useEffect(() => {
    async function loadModels() {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    }

    loadModels();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!videoRef.current) return;

      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (detections) {
        setEmotions(detections.expressions);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [videoRef]);

  return emotions;
}