
import RNFS from 'react-native-fs';

export const useCacheVideo = async (url) => {
    const filePath = `${RNFS.CachesDirectoryPath}/${url.split('/').pop()}`;
    const fileExists = await RNFS.exists(filePath);

    if (fileExists) {
        return filePath;
    } else {
        try {
            const result = await RNFS.downloadFile({
                fromUrl: url,
                toFile: filePath,
            }).promise;

            if (result.statusCode === 200) {
                return filePath;
            } else {
                throw new Error('Failed to download video');
            }
        } catch (error) {
            console.error('Error caching video:', error);
            return url;
        }
    }
};