import { requestGetImage } from "../client/apiRequest";

export const fetchImages = async (datas, setImageUrls) => {
    const urls = {};
    if (datas != null) {
        for (const data of datas) {
            if (data.imageUrl) {
                try {
                    const imageData = await requestGetImage(data.imageUrl);
                    const imageUrl = URL.createObjectURL(new Blob([imageData]));
                    urls[data.name] = imageUrl;
                } catch (error) {
                    console.error('Failed to fetch image:', error);
                }
            }
        }
        setImageUrls(urls);
    }
};