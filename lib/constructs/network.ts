import { Construct } from "constructs";
import { aws_ec2 as ec2 } from "aws-cdk-lib";
import { createNetworkConfig, NetworkConfig } from "../config/networkConfig";
import { NagSuppressions } from "cdk-nag";

export interface NetworkProps {
  envName: string
}


export class Network extends Construct {
  public readonly vpc: ec2.Vpc

  constructor(scope: Construct, id: string, props: NetworkProps) {
    super(scope, id)

    // Constructの設定値を取得
    const networkConfig: NetworkConfig = createNetworkConfig(props.envName)

    const vpc = new ec2.Vpc(this, 'Vpc', {
      ipAddresses: ec2.IpAddresses.cidr(networkConfig.cidr), // 環境により切替
      maxAzs: networkConfig.maxAzs,  // 環境により切替
      natGateways: 0,
      vpcName: `${props.envName}-vpc`
    }
    )
    this.vpc = vpc

    // cdk-nagの抑止
    NagSuppressions.addResourceSuppressions(vpc,
      [
        { id: "AwsSolutions-VPC7", reason: "サンプルのためVPCフローログ出力は未設定" },
      ]
    )


  }
}