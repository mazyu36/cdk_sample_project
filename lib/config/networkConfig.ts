export interface NetworkConfig {
  cidr: string, // VPCに割り当てるcidr
  maxAzs: number // VPCの最大AZ数
}

export function createNetworkConfig(envName: string): NetworkConfig {
  switch (envName) {
    case 'dev':
      return {
        cidr: '10.0.0.0/16',
        maxAzs: 2
      }
    case 'stg':
      return {
        cidr: '10.1.0.0/16',
        maxAzs: 2
      }
    case 'prod':
      return {
        cidr: '10.2.0.0/16',
        maxAzs: 2
      }
    case 'infraA':
      return {
        cidr: '172.16.0.0/16',
        maxAzs: 1
      }
    case 'infraB':
      return {
        cidr: '172.16.1.0/16',
        maxAzs: 1
      }
    default:
      throw new Error(
        `NetworkConfig does not exist. envName:${envName}`
      )
  }
}