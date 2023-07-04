export type EnvConfig = {
    account: string,  // デプロイ先のアカウントID
    region: string  // デプロイ先のリージョン
}

export function getEnvConfig(envName: string): EnvConfig {
    switch (envName) {
        case 'dev':
            return {
                account: '',
                region: 'ap-northeast-1'
            }
        case 'stg':
            return {
                account: '',
                region: 'ap-northeast-1'
            }
        case 'prd':
            return {
                account: '',
                region: 'ap-northeast-1'
            }
        case 'infraA':
            return {
                account: '',
                region: 'ap-northeast-1'
            }
        case 'infraB':
            return {
                account: '',
                region: 'ap-northeast-1'
            }
        default:
            throw new Error(
                `EnvConfig does not exist. envName:${envName}`
            )
    }
}