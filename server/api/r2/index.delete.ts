export default defineEventHandler(async (event) => {
    const r2 = event.context.cloudflare.env.R2;
    const key = getQuery(event).key as string;

    await r2.delete(key);

    return {
        message: '削除しました',
        key: key
    }
})
