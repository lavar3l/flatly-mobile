import { useState } from "react";
import ImageService from "../services/ImageService";

const useFlats = () => {
  const [imageLoading, setImageLoading] = useState(false);

  const uploadImage = (file: File) => {
    return new Promise((resolve, reject) => {
      setImageLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      return ImageService.store(formData)
        .then((res: any) => {
          resolve(res);
        })
        .catch((e: any) => reject(e))
        .finally(() => setImageLoading(false));
    });
  };

  return {
    uploadImage,
    imageLoading,
    setImageLoading,
  };
};

export default useFlats;
