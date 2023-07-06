export interface EnvConfig {
    account: string,
    region: string
}

export function createEnvConfig(envName: string): EnvConfig {
    switch (envName) {
        case 'dev':
            return {
                account: '123456789012',
                region: 'ap-northeast-1'
            }
        case 'stg':
            return {
                account: '123456789012',
                region: 'ap-northeast-1'
            }
        case 'prod':
            return {
                account: '123456789012',
                region: 'ap-northeast-1'
            }
        // 中略
        case 'infraA':
            return {
                account: '123456789012',
                region: 'ap-northeast-1'
            }
        case 'infraB':
            return {
                account: '123456789012',
                region: 'ap-northeast-1'
            }
        default:
            throw new Error(
                `EnvConfig does not exist. envName:${envName}`
            )
    }
}