import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler(async (event) => {
    const form = await readMultipartFormData(event)
    if (!form) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No form data found'
        })
    }

    let hasAnyFile = false;

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

    for (const part of form) {
        // 画像ファイルのみを処理
        const extension = getExtensionFromType(part?.type);
        if (!extension) continue;
        const key = `${uuidv4()}.${extension}`;
        const file = await r2.put(key, new Uint8Array(part.data.buffer));
        console.log({file});
    }

    return {
        message: 'Uploaded successfully'
    }
})