export type EnvConfig = {
    account: string,  // デプロイ先のアカウントID
    region: string  // デプロイ先のリージョン
}

export function getEnvConfig(envType: string): EnvConfig {
    let account: string = '';
    let region: string = 'ap-northeast-1'; //東京リージョン固定にしているが、別のリージョンにもデプロイしたい場合はcontext値を元に振り分けを実施する。

    // 環境によりアカウントIDを分岐
    switch (envType) {
        case 'dev':
            account = "xxxxxxxxxxx";
            break
        case 'stg':
            account = "xxxxxxxxxxx";
            break
        case 'prd':
            account = "xxxxxxxxxxx";
            break;
        case 'infraA':
            account = "xxxxxxxxxxx";
            break
        case 'infraB':
            account = "xxxxxxxxxxx";
            break
        default:
            throw new Error(
                `The Env config in "${envType}" environment does not exist.`
            )
    }

    // アカウントIDが未設定の場合エラー
    if (account == undefined) {
        throw new Error(
            'Context value env is invalid (use "dev", "stg", "prd", "infraA")'
        )
    }

    // アカウントIDおよびリージョンを返却
    return {
        account,
        region
    }

}