import { v2 as cloudinary } from 'cloudinary';
import crypto from "crypto";

// convertion directly at cloudinary
const getFormat = (mimetype) => {

    if (mimetype.startsWith('image/')) {
        return 'webp';
    };
    if (mimetype.startsWith('audio/')) {
        return 'opus'
    };
    if (mimetype.startsWith('video/')) {
        return 'webm'
    };

    // anything else we will keep go as its native
    return undefined;
}


// upload file to cloud
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

    const fileFormat = getFormat(mimetype);

    const uploadResult = await cloudinary.uploader
        .upload(data, {
            folder: `code_station/${folder}_folder`,
            public_id: flag ? `${folder}_${userId}` : `${folder}_${userId}_${crypto.randomUUID()}`,
            resource_type: 'auto',
            overwrite: flag,
            format: fileFormat
        })
        .catch((error) => {
            console.log('failed uploading to cloud.\n');
            console.log(error.message);
        });

    return uploadResult;
};



// delete file from cloud
const cloudDelete = async (public_id, resource_type) => {
    const deleteResult = await cloudinary.uploader
        .destroy(public_id, {
            resource_type: resource_type,
            invalidate: true
        })
        .catch((error) => {
            console.log('failed deleting from cloud.\n');
            console.log(error.message);
        })

    console.log(deleteResult);
}

export { cloudUpload, cloudDelete };