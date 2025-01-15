export default defineEventHandler(async (event) => {
    // リクエストボディから画像データを取得
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
        throw createError({
            statusCode: 400,
            message: '画像ファイルが見つかりません'
        });
    }

    // 最初のファイルのみを取得
    const file = formData[0];

    // 画像ファイルかチェック
    if (!file.type?.startsWith('image/')) {
        throw createError({
            statusCode: 400,
            message: '画像ファイルのみアップロード可能です'
        });
    }

    // R2にアップロード
    const r2 = event.context.cloudflare.env.R2;
    await r2.put('test', file.data, {
        httpMetadata: {
            contentType: file.type
        }
    });

    return {
        success: true,
    };
})