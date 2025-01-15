export default defineEventHandler(async (event) => {
    const r2 = event.context.cloudflare.env.R2;
    const key = getQuery(event).key as string;

    await r2.delete(key);

    return {
        message: 'deleted',
        key: key
    }
})
