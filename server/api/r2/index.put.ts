import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler(async (event) => {
    const form = await readMultipartFormData(event)
    if (!form) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No form data found'
        })
    }

    const getExtensionFromType = (type: string | undefined) => {
        switch (type) {
            case 'image/jpeg':
                return 'jpg';
            case 'image/png':
                return 'png';
            case 'image/gif':
                return 'gif';
            case 'image/webp':
                return 'webp';
            default:
                return undefined;
        }
    }

    const r2 = event.context.cloudflare.env.R2;

    let hasImage = false;

    for (const part of form) {
        const extension = getExtensionFromType(part?.type);
        if (!extension) continue;
        const key = `${uuidv4()}.${extension}`;
        await r2.put(key, new Uint8Array(part.data.buffer));
        hasImage = true;
    }

    if (!hasImage) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No image found'
        })
    }

    return {
        message: 'Uploaded successfully'
    }
})