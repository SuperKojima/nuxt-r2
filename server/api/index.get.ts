export default defineEventHandler((event) => {
    const timestamp = new Date().toISOString();

    return {
        timestamp
    }
})