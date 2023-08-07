import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import styles from "./main.module.scss";

const Camera = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [img, setImg] = useState(null);

  const capture = () => {
    
    const imageSrc = webcamRef.current.getScreenshot();

    setImg(imageSrc);

    setCapturedImage(imageSrc);
    webcamRef.current.video.srcObject
      .getVideoTracks()
      .forEach((track) => track.stop());
    // Here, you can do something with the captured image source, such as saving it or displaying it in a preview.
  };

  const retake = () => {
    setCapturedImage(null);
    setImg(null)
  };

  const downloadImage = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = img;
    link.download = "snapshot.jpg";

    // Programmatically click the anchor element to trigger the download
    link.click();

    // Clean up the temporary anchor element
    URL.revokeObjectURL(img);
  };

  return (
    <div style={{ width: '50%' }}>
      {!capturedImage && (
        <>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" style={{ width: '100%' }} />
          <button onClick={capture}>Capture</button>
        </>
      )}

      {capturedImage && (
        <>
          <img src={capturedImage} alt="Captured" style={{ width: '100%' }} />
          <button onClick={downloadImage}>DOWNLOAD</button>
          <div>
         <button onClick={retake}>RE-TAKE </button>
         </div>
        </>
      )}
    </div>
  );
};

export default Camera;
