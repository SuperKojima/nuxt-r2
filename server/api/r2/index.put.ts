export default defineEventHandler(async (event) => {
    // リクエストボディから画像データを取得
    const formData = await readMultipartFormData(event);
    if (!formData || formData.length === 0) {
        throw createError({
            statusCode: 400,
            message: '画像ファイルが見つかりません'
        });
    }

    // 全てのファイルをチェック
    for (const file of formData) {
        if (!file.type?.startsWith('image/')) {
            throw createError({
                statusCode: 400,
                message: '画像ファイルのみアップロード可能です'
            });
        }
    }

    // 複数ファイルの処理結果を格納する配列
    const results = [];

    // 全てのファイルを処理
    for (const file of formData) {
        // ファイル名を生成
        const timestamp = new Date().getTime();
        const filename = `${timestamp}-${file.filename}`;

        // R2にアップロード
        const r2 = event.context.cloudflare.env.R2;
        await r2.put(filename, file.data, {
            httpMetadata: {
                contentType: file.type
            }
        });

        results.push({
            filename,
            originalName: file.filename,
            type: file.type
        });
    }

    return {
        success: true,
        files: results
    };
})