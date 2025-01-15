export default defineEventHandler(async (event) => {
    const { filename } = getRouterParams(event);

    if (!filename) {
        throw createError({ status: 400, statusMessage: "Bad Request!" });
    }		

    const r2 = event.context.cloudflare.env.R2;
    const file = await r2.get(filename);

    if (!file) {
        throw createError({
        status: 404,
        statusMessage: "File not found!",
        });
    }

    setHeaders(event, { etag: file.etag });

    return file.body;
});