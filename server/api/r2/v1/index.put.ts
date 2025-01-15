export default defineEventHandler(async (event) => {
    const form = await readFormData(event);
    const image = form.get('image') as File;
    const now = new Date().toISOString();

    const r2 = event.context.cloudflare.env.R2;
    return r2.put(`/test/${now}`, image, {
        httpMetadata: {
            contentType: image.type
        }
    });
})