import {ImageType} from "react-images-uploading/dist/typings";
import {Image} from "common/types/Flat";
import getApiUrl from "common/helpers/apiUrl";

export const convertToImageFromImageType = (image: ImageType): Image => {
    return {
        id: image.imageId ?? null
    }
}

export const convertToImageTypeFromImage = (image: Image): ImageType => {
    return {
        dataURL: `${getApiUrl()}${image.path}`,
        imageId: image.id
    };
}
