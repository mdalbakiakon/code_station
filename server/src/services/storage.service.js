import { v2 as cloudinary } from 'cloudinary';

const cloudUpload = async (buffer, mimetype, folder, userId) => {
    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // conver buffer to base64 string
    const base64 = buffer.toString('base64');
    const data = `data:${mimetype};base64,${base64}`;

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(data, {
            folder: `code_station/${folder}_images`,
            public_id: `${folder}_${userId}`,
            resource_type: 'auto',
            overwrite: true,
            format: 'webp'
        })
        .catch((error) => {
            console.log(error);
        });

    return uploadResult;
};

export default cloudUpload;