export default defineEventHandler(async (event) => {
    const r2 = event.context.cloudflare.env.R2;
    const list = await r2.list()

    return list
})