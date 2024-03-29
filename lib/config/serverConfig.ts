import { aws_ec2 as ec2 } from "aws-cdk-lib";

export interface ServerConfig {
  instanceType: ec2.InstanceType
}

export function createServerConfig(envName: string): ServerConfig {
  switch (envName) {
    case 'dev':
      return {
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL)
      }
    case 'stg':
      return {
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.LARGE)
      }
    case 'prod':
      return {
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.LARGE)
      }
    case 'infraA':
      return {
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO)
      }
    case 'infraB':
      return {
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO)
      }
    default:
      throw new Error(
        `ServerConfig does not exist. envName:${envName}`
      )
  }
}