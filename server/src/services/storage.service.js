import { v2 as cloudinary } from 'cloudinary';
import crypto from "crypto";

const cloudUpload = async (buffer, mimetype, folder, userId) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const base64 = buffer.toString('base64');
    const data = `data:${mimetype};base64,${base64}`;

    const allowedOverwritefolder = ["avatar", "cover"];
    const flag = allowedOverwritefolder.includes(folder);

    const uploadResult = await cloudinary.uploader
        .upload(data, {
            folder: `code_station/${folder}_images`,
            public_id: flag ? `${folder}_${userId}` : `${folder}_${userId}_${crypto.randomUUID()}`,
            resource_type: 'auto',
            overwrite: flag,
            format: 'webp'
        })
        .catch((error) => {
            console.log(error);
        });

    return uploadResult;
};

export default cloudUpload;